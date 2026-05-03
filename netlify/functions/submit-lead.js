const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzfPSTYyqHtKEI3LKh5RrJM2rUrt6Cb_aXh5G0cgKhUFJVoie0W_3aeNvGRELzWM9M6TQ/exec';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);
    const params = new URLSearchParams({
      gestao:     data.gestao     || '',
      lojistas:   data.lojistas   || '',
      problema:   data.problema   || '',
      notafiscal: data.notafiscal || '',
      querTestar: data.querTestar || '',
      whatsapp:   data.whatsapp   || ''
    });

    // Server-side call — sem CORS, funciona de qualquer device
    await fetch(SHEETS_URL + '?' + params.toString());

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true })
    };
  } catch (err) {
    console.error('submit-lead error:', err);
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
