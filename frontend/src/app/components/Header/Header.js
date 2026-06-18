import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoGroup}>
        <span className={styles.logoText}>Ticket Analyzer</span>
        <span className={styles.versionTag}>v3.1 Core</span>
      </div>
      <button className={styles.secondaryBtn}>System Dashboard</button>
    </header>
  )
}