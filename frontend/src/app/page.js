'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { ticketAPI } from './lib/api'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    message: '',
  })
  const [aiResponse, setAiResponse] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.message.trim()) {
      toast.error('Please describe your issue')
      return
    }

    setLoading(true)
    setAiResponse(null)
    
    try {
      // This sends to FastAPI which forwards to n8n
      const result = await ticketAPI.submitTicket(formData)
      setAiResponse(result)
      toast.success('✅ Ticket submitted successfully!')
      
      setFormData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        message: '',
      })
      
    } catch (error) {
      toast.error(error.message || 'Failed to submit ticket')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-4">
            <span>🤖</span> AI-Powered Support
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Submit a Ticket
          </h1>
          <p className="text-gray-600 text-lg">
            Our AI will analyze your issue and provide instant suggestions
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="customer_email"
                  value={formData.customer_email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="customer_phone"
                value={formData.customer_phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe Your Issue
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Please describe your issue in detail for better AI analysis..."
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all resize-none"
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                ⏱️ Be as detailed as possible for better AI suggestions
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span>🚀 Submit Ticket</span>
              )}
            </button>
          </form>

          {/* AI Response */}
          {aiResponse && (
            <div className="mt-6 p-6 bg-green-50 border-2 border-green-200 rounded-xl animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🤖</span>
                <h4 className="font-bold text-green-800">AI Analysis Complete</h4>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  📂 {aiResponse.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  aiResponse.priority === 'High' 
                    ? 'bg-red-100 text-red-700' 
                    : aiResponse.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {aiResponse.priority} Priority
                </span>
                {aiResponse.n8n_forwarded && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    ✅ Sent to n8n
                  </span>
                )}
              </div>
              <p className="text-gray-700 leading-relaxed">{aiResponse.response}</p>
            </div>
          )}

          {/* Features */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-2xl">🤖</span>
              <span className="text-sm text-gray-600">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-2xl">⚡</span>
              <span className="text-sm text-gray-600">Instant Response</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-2xl">📊</span>
              <span className="text-sm text-gray-600">Smart Categorization</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}