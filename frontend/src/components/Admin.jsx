// components/Admin.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard,
  Ticket,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  Zap,
  Shield,
  Sparkles,
  Search,
  Filter,
  RefreshCw,
  LogOut,
  Settings,
  ChevronRight,
  ArrowLeft,
  PlusCircle,
  BarChart3,
  TrendingUp,
  Target,
  Gauge,
  X,
  Mail,
  Phone,
  User,
  MessageCircle,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { ticketAPI } from '../app/lib/api';
import { formatDistanceToNow, format } from 'date-fns';
import toast from 'react-hot-toast';
import styles from './Admin.module.css';

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusMap = {
    'New': { label: 'New', class: styles.statusNew },
    'In Progress': { label: 'In Progress', class: styles.statusProgress },
    'Resolved': { label: 'Resolved', class: styles.statusResolved },
    'Closed': { label: 'Closed', class: styles.statusClosed },
  };
  const s = statusMap[status] || statusMap['New'];
  return <span className={`${styles.badge} ${s.class}`}>{s.label}</span>;
};

// Priority Badge Component
const PriorityBadge = ({ priority }) => {
  const priorityMap = {
    'High': { label: 'High', class: styles.priorityHigh },
    'Medium': { label: 'Medium', class: styles.priorityMedium },
    'Low': { label: 'Low', class: styles.priorityLow },
  };
  const p = priorityMap[priority] || priorityMap['Low'];
  return <span className={`${styles.badge} ${p.class}`}>{p.label}</span>;
};

// Admin Login Component
const AdminLogin = ({ onLogin, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      onLogin(true);
      toast.success('✅ Welcome Admin!');
    } else {
      setError('Invalid username or password');
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.bgGradient} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.gridPattern} />
      
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          {onClose && (
            <button onClick={onClose} className={styles.loginCloseBtn}>
              <X size={20} />
            </button>
          )}
          
          <div className={styles.loginHeader}>
            <div className={styles.loginIcon}>
              <Shield size={32} />
            </div>
            <h1>Admin Login</h1>
            <p>Enter your credentials to access the dashboard</p>
          </div>
          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label><Users size={16} /> Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label><Shield size={16} /> Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            <button type="submit" className={styles.primaryBtn}>
              <LogOut size={18} /> Login
            </button>
          </form>
          <div className={styles.loginFooter}>
            <p>Default: username: admin | password: 1234</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Settings Modal
const SettingsModal = ({ isOpen, onClose, onUpdateSettings }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (newUsername && newPassword) {
      onUpdateSettings(newUsername, newPassword);
      toast.success('✅ Settings updated successfully!');
      onClose();
    } else {
      toast.error('Please fill in all fields');
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <div className={styles.modalHeader}>
          <h2><Settings size={20} /> Settings</h2>
          <button onClick={onClose} className={styles.modalClose}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label>New Username</label>
            <input
              type="text"
              placeholder="Enter new username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.primaryBtn}>
            Update Settings
          </button>
        </form>
      </div>
    </div>
  );
};

const Admin = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('new'); // Changed: Default to 'new'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [adminCredentials, setAdminCredentials] = useState({ username: 'admin', password: '1234' });

  useEffect(() => {
    if (isLoggedIn) {
      fetchTickets();
    }
  }, [isLoggedIn]);

  const fetchTickets = async () => {
    try {
      const data = await ticketAPI.getTickets();
      const ticketsWithStatus = data.map(t => ({
        ...t,
        status: t.status || 'New'
      }));
      setTickets(ticketsWithStatus);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load tickets');
      setLoading(false);
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      // Update local state
      const updatedTickets = tickets.map(t => 
        t.id === ticketId ? { ...t, status: newStatus } : t
      );
      setTickets(updatedTickets);
      
      // Show success message
      const statusEmojis = {
        'New': '🆕',
        'In Progress': '⏳',
        'Resolved': '✅',
        'Closed': '📦'
      };
      toast.success(`${statusEmojis[newStatus] || '📌'} Ticket moved to ${newStatus}`);
      
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleSettingsUpdate = (newUsername, newPassword) => {
    setAdminCredentials({ username: newUsername, password: newPassword });
    localStorage.setItem('admin_username', newUsername);
    localStorage.setItem('admin_password', newPassword);
  };

  useEffect(() => {
    const savedUsername = localStorage.getItem('admin_username');
    const savedPassword = localStorage.getItem('admin_password');
    if (savedUsername && savedPassword) {
      setAdminCredentials({ username: savedUsername, password: savedPassword });
    }
  }, []);

  // Filter tickets based on active tab
  const getFilteredTickets = () => {
    if (activeTab === 'all') return tickets;
    if (activeTab === 'new') return tickets.filter(t => t.status === 'New');
    if (activeTab === 'in-progress') return tickets.filter(t => t.status === 'In Progress');
    if (activeTab === 'resolved') return tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed');
    return tickets;
  };

  const filteredTickets = getFilteredTickets();

  const stats = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'New').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length,
  };

  const handleCloseLogin = () => {
    window.location.href = '/';
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} onClose={handleCloseLogin} />;
  }

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loadingSpinner} />
        <p>Loading tickets...</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.bgGradient} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgGlow3} />
      <div className={styles.gridPattern} />

      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)}
        onUpdateSettings={handleSettingsUpdate}
      />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link href="/" className={styles.backBtn}>
              <ArrowLeft size={18} /> Back
            </Link>
            <div>
              <h1><LayoutDashboard size={24} /> Admin Dashboard</h1>
              <p>Manage and track all support tickets</p>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button onClick={() => setShowSettings(true)} className={styles.glassBtn}>
              <Settings size={18} />
            </button>
            <button onClick={fetchTickets} className={styles.glassBtn}>
              <RefreshCw size={18} />
            </button>
            <button onClick={() => {
              setIsLoggedIn(false);
              toast.success('Logged out');
            }} className={styles.logoutBtn}>
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}><Ticket size={24} /></div>
            <div>
              <h3>{stats.total}</h3>
              <p>Total Tickets</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.statBlue}`}>
            <div className={styles.statIcon}><Clock size={24} /></div>
            <div>
              <h3>{stats.new}</h3>
              <p>New</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.statYellow}`}>
            <div className={styles.statIcon}><AlertTriangle size={24} /></div>
            <div>
              <h3>{stats.inProgress}</h3>
              <p>In Progress</p>
            </div>
          </div>
          <div className={`${styles.statCard} ${styles.statGreen}`}>
            <div className={styles.statIcon}><CheckCircle size={24} /></div>
            <div>
              <h3>{stats.resolved}</h3>
              <p>Resolved</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button
            onClick={() => setActiveTab('all')}
            className={`${styles.tab} ${activeTab === 'all' ? styles.tabActive : ''}`}
          >
            All ({stats.total})
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`${styles.tab} ${activeTab === 'new' ? styles.tabActive : ''}`}
          >
            New ({stats.new})
          </button>
          <button
            onClick={() => setActiveTab('in-progress')}
            className={`${styles.tab} ${activeTab === 'in-progress' ? styles.tabActive : ''}`}
          >
            In Progress ({stats.inProgress})
          </button>
          <button
            onClick={() => setActiveTab('resolved')}
            className={`${styles.tab} ${activeTab === 'resolved' ? styles.tabActive : ''}`}
          >
            Resolved ({stats.resolved})
          </button>
        </div>

        {/* Tickets List */}
        <div className={styles.ticketsList}>
          {filteredTickets.length === 0 ? (
            <div className={styles.emptyState}>
              <Ticket size={48} />
              <h3>No tickets found</h3>
              <p>All caught up! No tickets in this section.</p>
            </div>
          ) : (
            filteredTickets.map((ticket) => (
              <div key={ticket.id} className={styles.ticketCard}>
                <div className={styles.ticketHeader}>
                  <div className={styles.ticketBadges}>
                    <PriorityBadge priority={ticket.priority} />
                    <span className={styles.categoryBadge}>{ticket.category || 'General'}</span>
                    <StatusBadge status={ticket.status || 'New'} />
                  </div>
                  <span className={styles.ticketTime}>
                    <Calendar size={12} />
                    {ticket.created_at ? formatDistanceToNow(new Date(ticket.created_at), { addSuffix: true }) : 'Just now'}
                  </span>
                </div>

                {/* Customer Info */}
                <div className={styles.ticketCustomer}>
                  <div className={styles.customerAvatar}>
                    <User size={20} />
                  </div>
                  <div className={styles.customerInfo}>
                    <h3 className={styles.customerName}>{ticket.customer_name || 'Anonymous User'}</h3>
                    <p className={styles.customerMessage}>{ticket.message}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className={styles.ticketContact}>
                  <div className={styles.contactItem}>
                    <Mail size={14} />
                    <span>{ticket.customer_email || 'No email provided'}</span>
                  </div>
                  <div className={styles.contactItem}>
                    <Phone size={14} />
                    <span>{ticket.customer_phone || 'No phone provided'}</span>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className={styles.ticketResponse}>
                  <span className={styles.responseLabel}>🤖 AI Suggestion</span>
                  <p>{ticket.response || 'No AI suggestion available'}</p>
                </div>

                {/* Actions */}
                <div className={styles.ticketActions}>
                  <span className={styles.actionLabel}>Move to:</span>
                  {ticket.status !== 'New' && (
                    <button onClick={() => updateTicketStatus(ticket.id, 'New')} className={styles.actionBtnNew}>
                      New
                    </button>
                  )}
                  {ticket.status !== 'In Progress' && (
                    <button onClick={() => updateTicketStatus(ticket.id, 'In Progress')} className={styles.actionBtnProgress}>
                      In Progress
                    </button>
                  )}
                  {ticket.status !== 'Resolved' && (
                    <button onClick={() => updateTicketStatus(ticket.id, 'Resolved')} className={styles.actionBtnResolved}>
                      Resolved
                    </button>
                  )}
                  {ticket.status !== 'Closed' && (
                    <button onClick={() => updateTicketStatus(ticket.id, 'Closed')} className={styles.actionBtnClosed}>
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
  );
};

export default Admin;