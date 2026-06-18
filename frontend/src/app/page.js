'use client'

import { useState } from 'react'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Visualizer from './components/Visualizer/Visualizer'
import Features from './components/Features/Features'
import Background from './components/Background/Background'

export default function Home() {
  const [activeStep, setActiveStep] = useState(0)

  const pipelineSteps = [
    { title: '1. Webhook Ingestion', desc: 'Captures user submissions directly from application endpoints.', emoji: '⚡' },
    { title: '2. Payload Sanitation', desc: 'FastAPI cleans parameters, handles null variations, and parses inputs safely.', emoji: '🛠️' },
    { title: '3. LLM Intent Mapping', desc: 'Groq evaluates the ticket text against strict priority and category rules.', emoji: '🧠' },
    { title: '4. Dynamic Routing', desc: 'Determines administrative SLA timers and structural branching.', emoji: '🔀' },
    { title: '5. Omni-Channel Alerting', desc: 'Triggers responsive internal HTML emails and real-time Telegram payloads.', emoji: '🚨' }
  ]

  return (
    <div className="landing-container">
      <Background />
      <div className="landing-content">
        <Header />
        <Hero />
        <Visualizer 
          steps={pipelineSteps} 
          activeStep={activeStep} 
          setActiveStep={setActiveStep} 
        />
        <Features />
      </div>
    </div>
  )
}