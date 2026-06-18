// components/Tickets.jsx
'use client';
import React, { useState } from 'react';
import { 
  Ticket, 
  User, 
  Mail, 
  Phone, 
  MessageCircle, 
  AlertTriangle,
  Send,
  CheckCircle,
  ArrowLeft,
  Sparkles,
  Zap,
  Shield,
  Clock,
  ChevronRight
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
    priority: 'Medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await ticketAPI.submitTicket(ticketData);
      setSubmitted(true);
      toast.success('✅ Ticket submitted successfully! AI is analyzing your request.');
      setTimeout(() => {
        setTicketData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          message: '',
          priority: 'Medium'
        });
        setSubmitted(false);
        setIsSubmitting(false);
      }, 3000);
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
          <ArrowLeft size={18} /> Back to Home
        </Link>

        <div className={styles.ticketCard}>
          <div className={styles.cardHeader}>
            <div className={styles.headerIcon}>
              <Ticket size={32} />
            </div>
            <h1>Submit a Ticket</h1>
            <p>Our AI will analyze and route your request automatically</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label><User size={16} /> Full Name <span className={styles.required}>*</span></label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={ticketData.customer_name}
                  onChange={(e) => setTicketData({...ticketData, customer_name: e.target.value})}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label><Mail size={16} /> Email <span className={styles.required}>*</span></label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={ticketData.customer_email}
                  onChange={(e) => setTicketData({...ticketData, customer_email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label><Phone size={16} /> Phone (optional)</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={ticketData.customer_phone}
                  onChange={(e) => setTicketData({...ticketData, customer_phone: e.target.value})}
                />
              </div>

              <div className={styles.formGroup}>
                <label><AlertTriangle size={16} /> Priority</label>
                <select
                  value={ticketData.priority}
                  onChange={(e) => setTicketData({...ticketData, priority: e.target.value})}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label><MessageCircle size={16} /> Message <span className={styles.required}>*</span></label>
              <textarea
                placeholder="Describe your issue in detail..."
                rows="5"
                value={ticketData.message}
                onChange={(e) => setTicketData({...ticketData, message: e.target.value})}
                required
              />
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
                  <Send size={18} /> Submit Ticket <ChevronRight size={18} />
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