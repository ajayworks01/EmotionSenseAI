import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

export const generatePDFReport = (result, inputText) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.width
  
  // Header gradient effect (simulated with rectangles)
  doc.setFillColor(124, 58, 237)
  doc.rect(0, 0, pageWidth, 40, 'F')
  doc.setFillColor(37, 99, 235)
  doc.rect(pageWidth * 0.6, 0, pageWidth * 0.4, 40, 'F')

  // Title
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text('EmotionSense AI', 14, 18)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Emotion Analysis Report', 14, 28)

  // Date on right
  doc.setFontSize(9)
  doc.text(new Date().toLocaleString(), pageWidth - 14, 18, { align: 'right' })

  // Reset color
  doc.setTextColor(30, 30, 30)

  // Input Text Section
  doc.setFillColor(245, 245, 255)
  doc.rect(14, 50, pageWidth - 28, 30, 'F')
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(100, 100, 120)
  doc.text('ANALYZED TEXT', 18, 58)
  doc.setTextColor(30, 30, 30)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  const splitText = doc.splitTextToSize(`"${inputText}"`, pageWidth - 36)
  doc.text(splitText.slice(0, 2), 18, 67)

  // Emotion Result
  const emotionColors = {
    happy: [34, 197, 94],
    sad: [59, 130, 246],
    angry: [239, 68, 68],
    fear: [168, 85, 247],
    surprise: [251, 191, 36],
    neutral: [107, 114, 128],
  }
  const emotion = result.emotion?.toLowerCase() || 'neutral'
  const [r, g, b] = emotionColors[emotion] || [107, 114, 128]

  doc.setFillColor(r, g, b)
  doc.roundedRect(14, 88, 80, 40, 4, 4, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text('DETECTED EMOTION', 18, 98)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  const emotionEmojis = { happy: '😊', sad: '😢', angry: '😠', fear: '😨', surprise: '😲', neutral: '😐' }
  doc.text(`${result.emotion?.toUpperCase()} ${emotionEmojis[emotion] || ''}`, 18, 116)

  // Confidence
  doc.setFillColor(240, 240, 255)
  doc.roundedRect(100, 88, 80, 40, 4, 4, 'F')
  doc.setTextColor(100, 100, 120)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  doc.text('CONFIDENCE SCORE', 104, 98)
  doc.setTextColor(r, g, b)
  doc.setFontSize(22)
  doc.setFont('helvetica', 'bold')
  doc.text(`${result.confidence}%`, 104, 118)

  // Emotion Probabilities Table
  doc.setTextColor(30, 30, 30)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Emotion Probability Distribution', 14, 145)

  const probs = result.emotion_probabilities || {}
  const tableData = Object.entries(probs).map(([emotion, prob]) => [
    emotion.charAt(0).toUpperCase() + emotion.slice(1),
    `${(prob * 100).toFixed(1)}%`,
    '█'.repeat(Math.round(prob * 20)) + '░'.repeat(20 - Math.round(prob * 20))
  ])

  doc.autoTable({
    startY: 150,
    head: [['Emotion', 'Probability', 'Distribution']],
    body: tableData,
    styles: { fontSize: 10, cellPadding: 6 },
    headStyles: { fillColor: [124, 58, 237], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 248, 255] },
    margin: { left: 14, right: 14 },
  })

  const finalY = doc.lastAutoTable.finalY + 15

  // AI Explanation
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('AI Analysis & Explanation', 14, finalY)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(60, 60, 80)
  const explanationLines = doc.splitTextToSize(result.explanation || '', pageWidth - 28)
  doc.text(explanationLines, 14, finalY + 8)

  const explY = finalY + 8 + (explanationLines.length * 6) + 12

  // Suggested Response
  doc.setTextColor(30, 30, 30)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('Suggested Response', 14, explY)
  doc.setFillColor(240, 255, 244)
  const respLines = doc.splitTextToSize(result.suggested_response || '', pageWidth - 36)
  doc.rect(14, explY + 4, pageWidth - 28, (respLines.length * 6) + 12, 'F')
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.setTextColor(60, 80, 60)
  doc.text(respLines, 18, explY + 12)

  // Footer
  doc.setFillColor(124, 58, 237)
  doc.rect(0, 280, pageWidth, 17, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('EmotionSense AI – Context-Aware Emotion Detection Using NLP & Generative AI', pageWidth / 2, 290, { align: 'center' })
  doc.text('Powered by Google Gemini API', pageWidth / 2, 296, { align: 'center' })

  doc.save(`EmotionSense_Report_${Date.now()}.pdf`)
}
