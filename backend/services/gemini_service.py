import os
import json
import re
import google.generativeai as genai

_api_key = os.environ.get('GEMINI_API_KEY', '')
if _api_key:
    genai.configure(api_key=_api_key)

PROMPT_TEMPLATE = """
You are an expert emotion analysis AI. Analyze the emotional content of the following text.
Return ONLY valid JSON with no additional text, markdown, or explanation.

The JSON must follow this exact schema:
{{
  "emotion": "<one of: happy|sad|angry|fear|surprise|neutral>",
  "confidence": <integer 0-100>,
  "emotion_probabilities": {{
    "happy":    <float 0.0-1.0>,
    "sad":      <float 0.0-1.0>,
    "angry":    <float 0.0-1.0>,
    "fear":     <float 0.0-1.0>,
    "surprise": <float 0.0-1.0>,
    "neutral":  <float 0.0-1.0>
  }},
  "explanation": "<2-3 sentence contextual explanation of the detected emotion>",
  "suggested_response": "<empathetic and helpful suggested response to the text>"
}}

Rules:
- emotion_probabilities values must sum to approximately 1.0
- confidence must match the probability of the dominant emotion × 100
- explanation must be contextual and insightful
- suggested_response must be empathetic, constructive, and appropriate

Text to analyze:
{text}
"""


def analyze_emotion(text: str) -> dict:
    """
    Send text to Gemini and return structured emotion analysis.
    Falls back to a rule-based mock if API key is not set (demo mode).
    """
    if not _api_key:
        return _mock_analyze(text)

    try:
        model = genai.GenerativeModel('gemini-2.0-flash-latest')
        response = model.generate_content(
            PROMPT_TEMPLATE.format(text=text),
            generation_config=genai.GenerationConfig(
                temperature=0.3,
                max_output_tokens=1024,
            )
        )
        raw = response.text.strip()
        # Strip markdown code fences if present
        raw = re.sub(r'^```(?:json)?\s*', '', raw)
        raw = re.sub(r'\s*```$', '', raw)
        result = json.loads(raw)
        return _validate_result(result)
    except Exception as e:
        raise RuntimeError(f"Gemini API error: {str(e)}")


def _validate_result(result: dict) -> dict:
    """Ensure the result has all required fields with correct types."""
    emotions = ['happy', 'sad', 'angry', 'fear', 'surprise', 'neutral']
    probs = result.get('emotion_probabilities', {})

    # Normalize probabilities
    total = sum(float(probs.get(e, 0)) for e in emotions)
    if total > 0:
        probs = {e: round(float(probs.get(e, 0)) / total, 4) for e in emotions}
    else:
        probs = {e: (1/6) for e in emotions}

    emotion = result.get('emotion', 'neutral').lower()
    if emotion not in emotions:
        emotion = max(probs, key=probs.get)

    confidence = result.get('confidence', round(probs[emotion] * 100))
    if not isinstance(confidence, (int, float)):
        confidence = round(probs[emotion] * 100)

    return {
        'emotion': emotion,
        'confidence': int(confidence),
        'emotion_probabilities': probs,
        'explanation': result.get('explanation', 'No explanation provided.'),
        'suggested_response': result.get('suggested_response', 'Thank you for sharing.'),
    }


def _mock_analyze(text: str) -> dict:
    """
    Rule-based fallback when no API key is configured.
    Useful for development / demo without quota usage.
    """
    text_lower = text.lower()

    happy_words   = ['happy', 'great', 'excited', 'love', 'wonderful', 'amazing', 'fantastic', 'joy', 'best', 'awesome', 'delighted', 'thrilled']
    sad_words     = ['sad', 'cry', 'depressed', 'lonely', 'miserable', 'unhappy', 'heartbroken', 'grief', 'empty', 'hopeless']
    angry_words   = ['angry', 'furious', 'hate', 'rage', 'frustrated', 'annoyed', 'mad', 'irritated', 'outraged']
    fear_words    = ['scared', 'afraid', 'fear', 'terrified', 'anxious', 'worried', 'nervous', 'panic', 'horror']
    surprise_words = ['surprised', 'shocked', 'wow', 'unbelievable', 'unexpected', 'astonished', 'speechless']

    scores = {
        'happy':    sum(1 for w in happy_words    if w in text_lower),
        'sad':      sum(1 for w in sad_words      if w in text_lower),
        'angry':    sum(1 for w in angry_words    if w in text_lower),
        'fear':     sum(1 for w in fear_words     if w in text_lower),
        'surprise': sum(1 for w in surprise_words if w in text_lower),
        'neutral':  0.5,  # base score
    }

    total = sum(scores.values()) or 1
    probs = {e: round(s / total, 4) for e, s in scores.items()}
    dominant = max(probs, key=probs.get)
    confidence = int(probs[dominant] * 100)

    explanations = {
        'happy':    'The text contains positive language and expressions of joy or excitement.',
        'sad':      'The text reflects feelings of sadness or emotional distress.',
        'angry':    'The text contains expressions of frustration, anger, or displeasure.',
        'fear':     'The text reflects anxiety, worry, or fearful sentiments.',
        'surprise': 'The text expresses surprise, shock, or astonishment.',
        'neutral':  'The text appears factual and does not strongly express a particular emotion.',
    }
    responses = {
        'happy':    "That's wonderful to hear! Keep embracing that positive energy.",
        'sad':      "I'm sorry you're feeling this way. It's okay to feel sad sometimes — things will get better.",
        'angry':    "I understand your frustration. Take a deep breath; we can work through this together.",
        'fear':     "It's natural to feel anxious. Remember that you're stronger than your fears.",
        'surprise': "What an unexpected turn! How are you feeling about it?",
        'neutral':  "Thank you for sharing. Is there anything specific you'd like to explore further?",
    }

    return {
        'emotion': dominant,
        'confidence': max(confidence, 55),
        'emotion_probabilities': probs,
        'explanation': explanations[dominant],
        'suggested_response': responses[dominant],
    }
