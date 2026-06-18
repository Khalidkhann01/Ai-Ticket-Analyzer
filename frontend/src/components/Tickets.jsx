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
  ListChecks
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await ticketAPI.submitTicket(ticketData);
      setTicketResponse(response);
      setSubmitted(true);
      toast.success('✅ Ticket submitted successfully! AI is analyzing your request.');
      setTimeout(() => {
        setTicketData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          message: '',
        });
        setSubmitted(false);
        setIsSubmitting(false);
      }, 5000);
    } catch (error) {
      toast.error('❌ Failed to submit ticket. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (submitted) {
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
            <p>Our AI is analyzing your request. You'll receive a response shortly.</p>
            
            {ticketResponse && (
              <div className={styles.responsePreview}>
                <div className={styles.responseHeader}>
                  <Lightbulb size={18} />
                  <span>AI Analysis</span>
                </div>
                <div className={styles.responseBadges}>
                  <span className={styles.categoryBadge}>
                    Category: {ticketResponse.category || 'Processing...'}
                  </span>
                  <span className={`${styles.priorityBadge} ${
                    ticketResponse.priority === 'High' ? styles.priorityHigh : 
                    ticketResponse.priority === 'Medium' ? styles.priorityMedium : 
                    styles.priorityLow
                  }`}>
                    Priority: {ticketResponse.priority || 'Detecting...'}
                  </span>
                </div>
                {ticketResponse.customerSuggestions && (
                  <div className={styles.suggestions}>
                    <p className={styles.suggestionsTitle}>
                      <ListChecks size={16} /> Possible Solutions:
                    </p>
                    <ul>
                      {ticketResponse.customerSuggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            <Link href="/" className={styles.primaryBtn}>
              <ArrowLeft size={18} /> Back to Home
            </Link>
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
            <p>Our AI will analyze and route your request automatically</p>
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
              <span>AI will automatically detect priority and suggest solutions</span>
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