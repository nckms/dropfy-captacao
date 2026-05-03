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

    const url = SHEETS_URL + '?' + params.toString();
    console.log('Calling:', url);

    const res = await fetch(url, { redirect: 'follow' });
    const text = await res.text();

    console.log('Response status:', res.status);
    console.log('Response body:', text);

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: true, status: res.status, response: text })
    };
  } catch (err) {
    console.error('submit-lead error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ ok: false, error: err.message })
    };
  }
};
