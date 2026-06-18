import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.badge}>
        <span>⚙️</span> Backend Automation System
      </div>
      <h1 className={styles.heroTitle}>
        The Intelligent Middleware Layer Between Your <span className={styles.highlightText}>Users</span> and Your <span className={styles.highlightText}>Engineers</span>
      </h1>
      <p className={styles.heroDescription}>
        This platform acts as an automated triage layer. When a user submits an issue, this system intercepts the payload, cleans the inputs, passes the content to a Groq-powered LLM for instant structural JSON classification, and instantly notifies your team via targeted channels.
      </p>
      <div className={styles.heroCtaGroup}>
        <button className={styles.primaryBtn}>Deploy Infrastructure</button>
        <button className={styles.secondaryBtn}>Read Integration Specs</button>
      </div>
    </section>
  )
}