export const metadata = {
  title: 'TicketIntel Pipeline',
  description: 'Intelligent middleware layer for ticket triage and alerting',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}