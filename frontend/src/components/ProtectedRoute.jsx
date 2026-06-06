import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex gap-2">
        <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
        <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
        <div className="loading-dot w-3 h-3 rounded-full bg-purple-500" />
      </div>
    </div>
  )

  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  if (adminOnly && !user.is_admin) return <Navigate to="/" replace />

  return children
}
