const SHEETS_URL = 'https://script.google.com/macros/s/AKfycbxJWn3WBAZkn--_AVD5gVH6tRjkT4dkfA0IzsOFroQHBRuMkvMXhfYfv60wj4dfaRSOyA/exec';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    const res = await fetch(SHEETS_URL, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const text = await res.text();
    console.log('Sheets response:', res.status, text);

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
