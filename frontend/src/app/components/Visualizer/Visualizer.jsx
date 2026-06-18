
"use client"
import { useState } from 'react'
import styles from './Visualizer.module.css'

export default function Visualizer() {
  const [activeStep, setActiveStep] = useState(0)

  const pipelineSteps = [
    { 
      title: '1. Webhook Ingestion', 
      desc: 'Captures user submissions directly from application endpoints.', 
      emoji: '⚡',
      logs: [
        { text: '> [INBOUND] Webhook Trigger successfully resolved route "/ticket-ai"', class: styles.logSuccess },
        { text: '{', class: styles.logDim },
        { text: '  "httpMethod": "POST",', class: styles.logText },
        { text: '  "origin": "client-side-form",', class: styles.logText },
        { text: '  "ip": "masked_tunnel_ngrok"', class: styles.logText },
        { text: '}', class: styles.logDim }
      ]
    },
    { 
      title: '2. Payload Sanitation', 
      desc: 'FastAPI cleans parameters, handles null variations, and parses inputs safely.', 
      emoji: '🛠️',
      logs: [
        { text: '> [SANITARY] "Clean Input" Node initialized parsing sequence', class: styles.logInfo },
        { text: '> [POST] Forwarding sanitized payload to tunnel endpoints...', class: styles.logWarning },
        { text: 'Payload Status: Sanitized { customer_name: "John Doe", message: "Database cluster timed out" }', class: styles.logText }
      ]
    },
    { 
      title: '3. LLM Intent Mapping', 
      desc: 'Groq evaluates the ticket text against strict priority and category rules.', 
      emoji: '🧠',
      logs: [
        { text: '> [LLM ENGINE] Calling model: llama-3.1-8b-instant via Groq API', class: styles.logInfo },
        { text: '> [PROMPT CONTEXT] Evaluating against Category & Priority rules', class: styles.logWarning },
        { text: '> [RESPONSE RETURNED] Clean JSON object mapped successfully without markdown wrappers.', class: styles.logSuccess }
      ]
    },
    { 
      title: '4. Dynamic Routing', 
      desc: 'Determines administrative SLA timers and structural branching.', 
      emoji: '🔀',
      logs: [
        { text: '> [CONDITIONAL ROUTER] Executing routing logic parameter validations:', class: styles.logText },
        { text: '  IF {{$json.priority}} === "High" -> Evaluated: TRUE', class: styles.logDanger },
        { text: '  Applying targeted SLA window: "Within 1 hour response constraint"', class: styles.logDim }
      ]
    },
    { 
      title: '5. Omni-Channel Alerting', 
      desc: 'Triggers responsive internal HTML emails and real-time Telegram payloads.', 
      emoji: '🚨',
      logs: [
        { text: '> [DISPATCH COMPLETE] Outbound transaction dispatched to admin nodes', class: styles.logSuccess },
        { text: '> [TELEGRAM DISPATCH] Sent priority alert layout to target chatId: 7049204481', class: styles.logInfo },
        { text: 'STATUSCODE: 200 OK — Pipeline successfully completed.', class: `${styles.logSuccess} ${styles.fontWeightBold}` }
      ]
    }
  ]

  return (
    <section className={styles.visualizerSection}>
      <div className={styles.sectionHeader}>
        <h2>Under the Hood: The n8n Engine Blueprint</h2>
        <p>Select a node stage below to trace how a raw ticket is handled sequentially.</p>
      </div>
      
      <div className={styles.visualizerGrid}>
        {/* Step Selector Panel */}
        <div className={styles.stepsSelectorPane}>
          {pipelineSteps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`${styles.stepCard} ${activeStep === idx ? styles.active : ''}`}
            >
              <span className={styles.stepEmoji}>{step.emoji}</span>
              <div className={styles.stepTextWrap}>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Console Node Terminal Output */}
        <div className={styles.terminalPane}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <div className={`${styles.dot} ${styles.red}`} />
              <div className={`${styles.dot} ${styles.yellow}`} />
              <div className={`${styles.dot} ${styles.green}`} />
              <span className={styles.terminalTitle}>pipeline_node_execution.log</span>
            </div>
            <span className={styles.liveTag}>LIVE EXECUTION</span>
          </div>
          
          <div className={styles.terminalBody}>
            {pipelineSteps[activeStep].logs.map((log, lIdx) => (
              <p key={lIdx} className={log.class}>{log.text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}