export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' })

  const { gestao, lojistas, problema, notafiscal, querTestar, whatsapp } = req.body
  try {
    const SHEETS_URL = process.env.SHEETS_WEBHOOK_URL
    if (SHEETS_URL) {
      await fetch(SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gestao, lojistas, problema, notafiscal, querTestar, whatsapp,
          timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
        })
      })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[CAPTACAO] Erro:', err.message)
    return res.status(500).json({ erro: 'Erro ao salvar' })
  }
}
