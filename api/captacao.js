export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' })

  const { gestao, lojistas, problema, notafiscal, querTestar, whatsapp } = req.body
  const SHEETS_URL = process.env.SHEETS_WEBHOOK_URL

  console.log('[CAPTACAO] SHEETS_URL definida:', !!SHEETS_URL)
  console.log('[CAPTACAO] Payload:', { gestao, lojistas, whatsapp })

  if (!SHEETS_URL) {
    console.error('[CAPTACAO] SHEETS_WEBHOOK_URL não definida!')
    return res.status(200).json({ ok: true, aviso: 'env não definida' })
  }

  try {
    const sheetsRes = await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gestao, lojistas, problema, notafiscal, querTestar, whatsapp,
        timestamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      })
    })
    const sheetsText = await sheetsRes.text()
    console.log('[CAPTACAO] Resposta do Sheets:', sheetsRes.status, sheetsText)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[CAPTACAO] Erro ao chamar Sheets:', err.message)
    return res.status(500).json({ erro: err.message })
  }
}
