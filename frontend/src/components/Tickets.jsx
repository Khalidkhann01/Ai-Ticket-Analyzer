// components/Tickets.jsx
'use client';
import React, { useState } from 'react';
import { 
  Ticket, 
  User, 
  Mail, 
  Phone, 
  MessageCircle, 
  Send,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Clock,
  ChevronRight,
  Brain,
  Lightbulb,
  ListChecks,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { ticketAPI } from '../app/lib/api';
import toast from 'react-hot-toast';
import styles from './Tickets.module.css';

const Tickets = () => {
  const [ticketData, setTicketData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketResponse, setTicketResponse] = useState(null);
  const [showResponse, setShowResponse] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await ticketAPI.submitTicket(ticketData);
      
      // Parse the AI response to extract suggestions
      let parsedResponse = response;
      
      // If response has output field (from AI Agent), parse it
      if (response.output) {
        try {
          let cleanedOutput = response.output;
          if (typeof cleanedOutput === 'string') {
            cleanedOutput = cleanedOutput.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            parsedResponse = JSON.parse(cleanedOutput);
          } else {
            parsedResponse = cleanedOutput;
          }
        } catch (e) {
          console.error('Failed to parse AI response:', e);
          parsedResponse = response;
        }
      }
      
      setTicketResponse(parsedResponse);
      setShowResponse(true);
      setSubmitted(true);
      toast.success('✅ Ticket submitted successfully!');
      
      // Auto-hide after 8 seconds
      setTimeout(() => {
        setShowResponse(false);
        setTicketData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          message: '',
        });
        setSubmitted(false);
        setIsSubmitting(false);
        setTicketResponse(null);
      }, 8000);
    } catch (error) {
      toast.error('❌ Failed to submit ticket. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (submitted && showResponse) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.bgGradient} />
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />
        <div className={styles.bgGlow3} />
        <div className={styles.gridPattern} />
        
        <div className={styles.successContainer}>
          <div className={styles.successCard}>
            <div className={styles.successIcon}>
              <CheckCircle size={48} />
            </div>
            <h2>Ticket Submitted! 🎉</h2>
            <p>Our AI has analyzed your request. Here are some steps you can try:</p>
            
            {ticketResponse && (
              <div className={styles.responsePreview}>
                {/* Customer Suggestions - Only show these to the user */}
                {ticketResponse.customerSuggestions && ticketResponse.customerSuggestions.length > 0 ? (
                  <div className={styles.suggestions}>
                    <p className={styles.suggestionsTitle}>
                      <Lightbulb size={16} /> Suggested Solutions:
                    </p>
                    <ul>
                      {ticketResponse.customerSuggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className={styles.suggestions}>
                    <p className={styles.suggestionsTitle}>
                      <Lightbulb size={16} /> Quick Troubleshooting Steps:
                    </p>
                    <ul>
                      <li>Please check your internet connection</li>
                      <li>Try clearing your browser cache and cookies</li>
                      <li>Restart the application and try again</li>
                      <li>Make sure you're using the latest version</li>
                      <li>If the issue persists, our team will contact you shortly</li>
                    </ul>
                  </div>
                )}

                {/* AI Reasoning - Helpful context for the user */}
                {ticketResponse.reason && (
                  <div className={styles.reasonBox}>
                    <AlertCircle size={14} />
                    <span>{ticketResponse.reason}</span>
                  </div>
                )}
              </div>
            )}
            
            <div className={styles.successActions}>
              <Link href="/" className={styles.primaryBtn}>
                <ArrowLeft size={18} /> Back to Home
              </Link>
              <button 
                onClick={() => {
                  setShowResponse(false);
                  setTicketData({
                    customer_name: '',
                    customer_email: '',
                    customer_phone: '',
                    message: '',
                  });
                  setSubmitted(false);
                  setIsSubmitting(false);
                  setTicketResponse(null);
                }}
                className={styles.secondaryBtn}
              >
                Submit Another
              </button>
            </div>
            
            <p className={styles.autoDismiss}>This will auto-dismiss in a few seconds</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {/* Animated Background */}
      <div className={styles.bgGradient} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgGlow3} />
      <div className={styles.gridPattern} />

      <div className={styles.container}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className={styles.ticketCard}>
          <div className={styles.cardHeader}>
            <div className={styles.headerIcon}>
              <Ticket size={28} />
            </div>
            <h1>Submit a Ticket</h1>
            <p>Our AI will analyze your issue and suggest solutions</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label><User size={14} /> Full Name <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={ticketData.customer_name}
                  onChange={(e) => setTicketData({...ticketData, customer_name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label><Mail size={14} /> Email <span className={styles.required}>*</span></label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={ticketData.customer_email}
                  onChange={(e) => setTicketData({...ticketData, customer_email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label><Phone size={14} /> Phone (optional)</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={ticketData.customer_phone}
                onChange={(e) => setTicketData({...ticketData, customer_phone: e.target.value})}
              />
            </div>

            <div className={styles.formGroup}>
              <label><MessageCircle size={14} /> Message <span className={styles.required}>*</span></label>
              <textarea
                placeholder="Describe your issue in detail..."
                rows="4"
                value={ticketData.message}
                onChange={(e) => setTicketData({...ticketData, message: e.target.value})}
                required
              />
            </div>

            <div className={styles.aiBadge}>
              <Brain size={16} />
              <span>AI will analyze your issue and suggest solutions</span>
            </div>

            <button 
              type="submit" 
              className={styles.primaryBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  <Send size={16} /> Submit Ticket <ChevronRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tickets;