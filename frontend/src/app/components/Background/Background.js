import styles from './Background.module.css'

export default function Background() {
  return (
    <>
      <div className={styles.gridMask} />
      <div className={styles.glowOrange} />
      <div className={styles.glowBlue} />
    </>
  )
}