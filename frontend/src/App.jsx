import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'

import HomePage from './pages/HomePage'
import AnalyzePage from './pages/AnalyzePage'
import DashboardPage from './pages/DashboardPage'
import HistoryPage from './pages/HistoryPage'
import ResearchPage from './pages/ResearchPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/analyze" element={<AnalyzePage />} />
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
                <Route path="/research" element={<ResearchPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'rgba(15,15,25,0.95)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                backdropFilter: 'blur(12px)',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#8b5cf6', secondary: '#fff' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
