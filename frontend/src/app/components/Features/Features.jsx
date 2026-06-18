import styles from './Features.module.css'

export default function Features() {
  const features = [
    {
      icon: '📊',
      title: 'Structured AI Data',
      desc: 'Guarantees that unformatted human text is transformed strictly into a valid, actionable JSON schema containing categories, priorities, and step lists.'
    },
    {
      icon: '🚨',
      title: 'Intelligent Alerts',
      desc: 'High-priority crashes pass instantly to Telegram pushes, while low-priority tickets route into standard queues to keep your core engineers focused on real fires.'
    },
    {
      icon: '🛠️',
      title: 'Seamless Fail-Safes',
      desc: 'The code blocks built inside the n8n platform protect against parsing failures or API timeouts, ensuring alternative routes are used if Groq encounters a hiccup.'
    }
  ]

  return (
    <section className={styles.features}>
      {features.map((feature, idx) => (
        <div key={idx} className={styles.card}>
          <div className={`${styles.icon} ${styles.orangeBg}`}>{feature.icon}</div>
          <h3>{feature.title}</h3>
          <p>{feature.desc}</p>
        </div>
      ))}
    </section>
  )
}