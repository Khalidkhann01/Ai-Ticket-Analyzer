// components/Hero.jsx
'use client';
import React, { useRef } from 'react';
import { 
  Sparkles, 
  Zap, 
  MessageCircle, 
  Send, 
  GitBranch, 
  Shield,
  Code,
  Clock,
  CheckCircle,
  Cloud,
  Cpu,
  Brain,
  Mail,
  Bell,
  Database,
  Workflow,
  Users,
  Star,
  Award,
  Target,
  LayoutDashboard,
  ChevronRight,
  Globe,
  Infinity,
  Crown,
  Gem,
  Rocket,
  TrendingUp,
  Gauge,
  Webhook,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  const workflowRef = useRef(null);

  const scrollToWorkflow = () => {
    workflowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const features = [
    {
      icon: Brain,
      title: 'Groq LLM Analysis',
      desc: 'Powered by Llama-3.1-8B with 200ms response time for real-time ticket classification and priority detection.',
    },
    {
      icon: Zap,
      title: 'Priority Detection',
      desc: 'Intelligent priority scoring (High/Medium/Low) with 94% accuracy based on severity and impact.',
    },
    {
      icon: MessageCircle,
      title: 'Customer Suggestions',
      desc: 'Generates specific, actionable responses that support teams can copy and send directly to customers.',
    },
    {
      icon: Send,
      title: 'Multi-Channel Alerts',
      desc: 'Instant Gmail notifications and Telegram alerts for high-priority tickets requiring immediate attention.',
    },
    {
      icon: GitBranch,
      title: 'n8n Automation',
      desc: 'Fully automated workflow with webhook triggers, AI processing, and intelligent routing.',
    },
    {
      icon: Shield,
      title: 'Confidence Scoring',
      desc: 'Transparent AI decision-making with detailed reasoning and confidence metrics for every classification.',
    },
  ];

  const workflowSteps = [
    { icon: Webhook, label: 'Webhook', color: '#f97316', desc: 'Trigger' },
    { icon: Workflow, label: 'Clean Input', color: '#8b5cf6', desc: 'Process' },
    { icon: Cpu, label: 'AI Analysis', color: '#06b6d4', desc: 'Groq LLM' },
    { icon: GitBranch, label: 'Merge Results', color: '#10b981', desc: 'Combine' },
    { icon: Zap, label: 'Priority Check', color: '#f59e0b', desc: 'Evaluate' },
    { icon: Mail, label: 'Email Alert', color: '#ef4444', desc: 'Notify' },
    { icon: Bell, label: 'Telegram Alert', color: '#3b82f6', desc: 'Alert' },
    { icon: CheckCircle, label: 'Response', color: '#22c55e', desc: 'Complete' },
  ];

  const metrics = [
    { label: 'Response Time', value: '200ms', icon: Gauge },
    { label: 'Accuracy', value: '94%', icon: Target },
    { label: 'Processed', value: '500K+', icon: TrendingUp },
    { label: 'Uptime', value: '99.99%', icon: Shield },
  ];

  const techStack = [
    { icon: Brain, label: 'Groq Llama-3.1', desc: '70B parameters' },
    { icon: Workflow, label: 'n8n', desc: 'Workflow Engine' },
    { icon: Database, label: 'FastAPI', desc: 'Async API' },
    { icon: Mail, label: 'Gmail API', desc: 'Email Integration' },
    { icon: Bell, label: 'Telegram', desc: 'Real-time Alerts' },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Animated Background */}
      <div className={styles.bgGradient} />
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgGlow3} />
      <div className={styles.gridPattern} />

      <div className={styles.container}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <Sparkles size={14} />
            <span>n8n AI Agent · Enterprise Ready</span>
            <span className={styles.badgeDot}>•</span>
            <span className={styles.badgeLive}>Live</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine1}>AI Ticket</span>
            <span className={styles.titleLine2}>
              Intelligence Agent
            </span>
          </h1>

          <p className={styles.heroSub}>
            Automate support ticket triage with Groq LLM, 
            <span className={styles.highlight}> priority detection</span>, and 
            <span className={styles.highlight}> actionable suggestions</span> 
            — all inside your n8n workflow.
          </p>

          <div className={styles.heroActions}>
            <Link href="/ticket" className={styles.primaryBtn}>
              <span>Submit Ticket</span>
              <ChevronRight size={18} />
            </Link>
            <Link href="/dashboard" className={styles.secondaryBtn}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </Link>
            <button onClick={scrollToWorkflow} className={styles.glassBtn}>
              <Code size={18} />
              <span>View Workflow</span>
            </button>
          </div>

          {/* Metrics */}
          <div className={styles.metricsGrid}>
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div key={idx} className={styles.metricCard}>
                  <div className={styles.metricIcon}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className={styles.metricValue}>{metric.value}</div>
                    <div className={styles.metricLabel}>{metric.label}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Badges */}
          <div className={styles.trustSection}>
            <div className={styles.trustBadges}>
              <span className={styles.trustBadge}>
                <Crown size={14} /> Enterprise Grade
              </span>
              <span className={styles.trustBadge}>
                <Gem size={14} /> SOC 2 Compliant
              </span>
              <span className={styles.trustBadge}>
                <Globe size={14} /> Global Scale
              </span>
              <span className={styles.trustBadge}>
                <Infinity size={14} /> Unlimited Tickets
              </span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className={styles.features}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Features</span>
            <h2 className={styles.sectionTitle}>
              Built for <span className={styles.gradientText}>Enterprise Scale</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to deliver exceptional customer support at scale.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {features.map((f, idx) => {
              const Icon = f.icon;
              return (
                <div key={idx} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Icon size={24} />
                  </div>
                  <div className={styles.featureContent}>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Workflow Section - Beautiful Animated */}
        <section ref={workflowRef} className={styles.workflow}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Workflow</span>
            <h2 className={styles.sectionTitle}>
              Automation <span className={styles.gradientText}>Flow</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              End-to-end automation from ticket submission to resolution.
            </p>
          </div>

          <div className={styles.workflowContainer}>
            <div className={styles.workflowFlow}>
              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <React.Fragment key={idx}>
                    <div className={styles.workflowStep}>
                      <div className={styles.stepCircle} style={{ background: `${step.color}20`, borderColor: step.color }}>
                        <Icon size={18} style={{ color: step.color }} />
                      </div>
                      <div className={styles.stepContent}>
                        <span className={styles.stepLabel}>{step.label}</span>
                        <span className={styles.stepDesc}>{step.desc}</span>
                      </div>
                      {idx < workflowSteps.length - 1 && (
                        <div className={styles.stepConnector}>
                          <div className={styles.connectorLine} />
                          <div className={styles.connectorDot}>
                            <div className={styles.dotPulse} />
                          </div>
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Flow Progress Indicator */}
            <div className={styles.flowProgress}>
              {workflowSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={styles.progressDot} 
                  style={{ 
                    background: idx < 4 ? step.color : 'rgba(255,255,255,0.1)',
                    width: idx === 0 ? '24px' : '8px'
                  }} 
                />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howItWorks}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Process</span>
            <h2 className={styles.sectionTitle}>
              How It <span className={styles.gradientText}>Works</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Four simple steps to intelligent ticket processing.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>01</div>
              <div className={styles.stepIcon}>
                <Send size={24} />
              </div>
              <h3>Incoming Ticket</h3>
              <p>Customer submits a ticket via webhook with complete context and metadata.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>02</div>
              <div className={styles.stepIcon}>
                <Brain size={24} />
              </div>
              <h3>AI Analysis</h3>
              <p>Groq LLM processes the message, detecting category, priority, and intent.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>03</div>
              <div className={styles.stepIcon}>
                <GitBranch size={24} />
              </div>
              <h3>Smart Routing</h3>
              <p>Intelligent routing with instant alerts to the right team for immediate action.</p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepNumber}>04</div>
              <div className={styles.stepIcon}>
                <CheckCircle size={24} />
              </div>
              <h3>Actionable Output</h3>
              <p>AI-generated responses and action checklists for rapid resolution.</p>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className={styles.techStack}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Technology</span>
            <h2 className={styles.sectionTitle}>
              Powered by <span className={styles.gradientText}>Industry Leaders</span>
            </h2>
            <p className={styles.sectionSubtitle}>
              Built with the best tools for AI automation.
            </p>
          </div>

          <div className={styles.techGrid}>
            {techStack.map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div key={idx} className={styles.techItem}>
                  <div className={styles.techIcon}>
                    <Icon size={28} />
                  </div>
                  <span>{tech.label}</span>
                  <small>{tech.desc}</small>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className={styles.ctaContent}>
            <div className={styles.ctaBadge}>
              <Rocket size={16} />
              <span>Get Started</span>
            </div>
            <h2>Ready to Automate Your Support?</h2>
            <p>Try the AI Ticket Intelligence Agent in your n8n workflow today.</p>
            <div className={styles.ctaActions}>
              <Link href="/ticket" className={styles.primaryBtn}>
                <span>Submit a Ticket</span>
                <ChevronRight size={18} />
              </Link>
              <Link href="/dashboard" className={styles.secondaryBtn}>
                <LayoutDashboard size={18} />
                <span>View Dashboard</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerBrand}>
              <Sparkles size={20} className={styles.footerIcon} />
              <span>AI Ticket Intelligence</span>
            </div>
            <p>© 2026 · Built with ❤️ for n8n</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Hero;