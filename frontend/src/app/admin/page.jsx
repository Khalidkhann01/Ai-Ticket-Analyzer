'use client'

import { useState, useEffect } from 'react'
import { ticketAPI } from '../lib/api'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'

// Admin Login Component
function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === 'admin' && password === '1234') {
      onLogin(true)
      toast.success('✅ Welcome Admin!')
    } else {
      setError('Invalid username or password')
      toast.error('Invalid credentials')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm border border-gray-100">
        <div className="text-center mb-6">
          <div className="text-3xl mb-2">🔐</div>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-600 text-xs">Enter your credentials to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button
            type="submit"
            className="w-full py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
          >
            Login
          </button>
        </form>
        <div className="mt-3 text-center text-[10px] text-gray-500">
          <p>Default: username: admin | password: 1234</p>
        </div>
      </div>
    </div>
  )
}

// Settings Modal Component
function SettingsModal({ isOpen, onClose, onUpdateSettings }) {
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }
    if (newUsername && newPassword) {
      onUpdateSettings(newUsername, newPassword)
      toast.success('✅ Settings updated successfully!')
      onClose()
    } else {
      toast.error('Please fill in all fields')
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-900">⚙️ Settings</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-sm">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">New Username</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
          >
            Update Settings
          </button>
        </form>
      </div>
    </div>
  )
}

// Status Badge Component
function StatusBadge({ status }) {
  const statusMap = {
    'New': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Resolved': 'bg-green-100 text-green-700',
    'Closed': 'bg-gray-100 text-gray-700',
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusMap[status] || statusMap['New']}`}>
      {status}
    </span>
  )
}

// Priority Badge Component
function PriorityBadge({ priority }) {
  const priorityMap = {
    'High': 'bg-red-100 text-red-700',
    'Medium': 'bg-yellow-100 text-yellow-700',
    'Low': 'bg-green-100 text-green-700',
  }
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${priorityMap[priority] || 'bg-gray-100 text-gray-700'}`}>
      {priority}
    </span>
  )
}

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ username: 'admin', password: '1234' })

  useEffect(() => {
    if (isLoggedIn) {
      fetchTickets()
    }
  }, [isLoggedIn])

  const fetchTickets = async () => {
    try {
      const data = await ticketAPI.getTickets()
      const ticketsWithStatus = data.map(t => ({
        ...t,
        status: t.status || 'New'
      }))
      setTickets(ticketsWithStatus)
      setLoading(false)
    } catch (error) {
      toast.error('Failed to load tickets')
      setLoading(false)
    }
  }

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      setTickets(tickets.map(t => 
        t.id === ticketId ? { ...t, status: newStatus } : t
      ))
      
      // If we're in a specific tab and the ticket moved out, refresh the view
      const updatedTicket = tickets.find(t => t.id === ticketId)
      if (updatedTicket && updatedTicket.status !== newStatus) {
        // The ticket will automatically disappear from current tab
        toast.success(`✅ Ticket moved to ${newStatus}`)
      }
    } catch (error) {
      toast.error('Failed to update status')
    }
  }

  const handleSettingsUpdate = (newUsername, newPassword) => {
    setAdminCredentials({ username: newUsername, password: newPassword })
    localStorage.setItem('admin_username', newUsername)
    localStorage.setItem('admin_password', newPassword)
  }

  useEffect(() => {
    const savedUsername = localStorage.getItem('admin_username')
    const savedPassword = localStorage.getItem('admin_password')
    if (savedUsername && savedPassword) {
      setAdminCredentials({ username: savedUsername, password: savedPassword })
    }
  }, [])

  // Filter tickets based on active tab
  const getFilteredTickets = () => {
    if (activeTab === 'all') return tickets
    if (activeTab === 'new') return tickets.filter(t => t.status === 'New')
    if (activeTab === 'in-progress') return tickets.filter(t => t.status === 'In Progress')
    if (activeTab === 'resolved') return tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed')
    return tickets
  }

  const filteredTickets = getFilteredTickets()

  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'New').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length,
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-3 border-blue-500 border-t-transparent mx-auto mb-3"></div>
          <p className="text-gray-500 text-sm">Loading tickets...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-4 px-3 bg-gray-50">
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        onUpdateSettings={handleSettingsUpdate}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">📊 Admin Dashboard</h1>
            <p className="text-gray-500 text-xs">Manage and track all support tickets</p>
          </div>
          <div className="flex gap-1.5">
            <button 
              onClick={() => setShowSettings(true)}
              className="px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all text-xs"
            >
              ⚙️ Settings
            </button>
            <button 
              onClick={() => {
                setIsLoggedIn(false)
                toast.success('Logged out')
              }}
              className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-xs"
            >
              🚪 Logout
            </button>
            <button 
              onClick={fetchTickets}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-xs"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards - Smaller */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-3 border-blue-500">
            <p className="text-[10px] text-gray-600">📋 Total</p>
            <p className="text-xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg shadow-sm border-l-3 border-blue-500">
            <p className="text-[10px] text-blue-600">🆕 New</p>
            <p className="text-xl font-bold text-blue-700">{stats.new}</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg shadow-sm border-l-3 border-yellow-500">
            <p className="text-[10px] text-yellow-600">⏳ In Progress</p>
            <p className="text-xl font-bold text-yellow-700">{stats.inProgress}</p>
          </div>
          <div className="bg-green-50 p-3 rounded-lg shadow-sm border-l-3 border-green-500">
            <p className="text-[10px] text-green-600">✅ Resolved</p>
            <p className="text-xl font-bold text-green-700">{stats.resolved}</p>
          </div>
        </div>

        {/* Simple Tabs - Smaller */}
        <div className="flex gap-1 mb-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-medium transition-all border-b-2 ${
              activeTab === 'all'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            📋 All ({stats.total})
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`px-4 py-2 text-xs font-medium transition-all border-b-2 ${
              activeTab === 'new'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            🆕 New ({stats.new})
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`px-4 py-2 text-xs font-medium transition-all border-b-2 ${
              activeTab === 'in-progress'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ⏳ In Progress ({stats.inProgress})
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`px-4 py-2 text-xs font-medium transition-all border-b-2 ${
              activeTab === 'resolved'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            ✅ Resolved ({stats.resolved})
          </button>
        </div>

        {/* Tickets List - Smaller */}
        <div className="space-y-2">
          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center shadow-sm">
              <p className="text-gray-500 text-sm">No tickets in this section</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                  <div className="flex flex-wrap gap-1.5">
                    <PriorityBadge priority={ticket.priority} />
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-[10px] font-medium">
                      {ticket.category}
                    </span>
                    <StatusBadge status={ticket.status || 'New'} />
                  </div>
                  <span className="text-[10px] text-gray-500">
                    {ticket.created_at ? formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true }) : 'Just now'}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-0.5">
                  {ticket.customer_name || 'Anonymous User'}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ticket.message}</p>

                <div className="flex flex-wrap gap-3 text-[10px] text-gray-500 mb-2">
                  <span>📧 {ticket.customer_email || 'No email'}</span>
                  <span>📱 {ticket.customer_phone || 'No phone'}</span>
                </div>

                <div className="p-2 bg-green-50 rounded-lg border border-green-200 mb-2">
                  <p className="text-[10px] text-gray-700">
                    <span className="font-semibold text-green-700">💡 AI:</span> {ticket.response}
                  </p>
                </div>

                {/* Status Update Buttons - Smaller */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                  <span className="text-[10px] font-medium text-gray-600 mr-1">Move to:</span>
                  {ticket.status !== 'New' && (
                    <button
                      onClick={() => updateTicketStatus(ticket.id, 'New')}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all"
                    >
                      New
                    </button>
                  )}
                  {ticket.status !== 'In Progress' && (
                    <button
                      onClick={() => updateTicketStatus(ticket.id, 'In Progress')}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-all"
                    >
                      In Progress
                    </button>
                  )}
                  {ticket.status !== 'Resolved' && (
                    <button
                      onClick={() => updateTicketStatus(ticket.id, 'Resolved')}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-all"
                    >
                      Resolved
                    </button>
                  )}
                  {ticket.status !== 'Closed' && (
                    <button
                      onClick={() => updateTicketStatus(ticket.id, 'Closed')}
                      className="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                    >
                      Closed
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}