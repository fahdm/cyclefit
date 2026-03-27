const EDGE_CONFIG_ID = process.env.EDGE_CONFIG_ID;
const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const TEAM_ID = process.env.TEAM_ID;
const READ_TOKEN = process.env.EDGE_CONFIG
  ? new URL(process.env.EDGE_CONFIG).searchParams.get('token')
  : '';

async function getItem(key) {
  const res = await fetch(
    `https://edge-config.vercel.com/${EDGE_CONFIG_ID}/item/${key}?token=${READ_TOKEN}`
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Edge Config read error: ${res.status}`);
  return res.json();
}

async function setItem(key, value) {
  const res = await fetch(
    `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items?teamId=${TEAM_ID}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: [{ operation: 'upsert', key, value }] }),
    }
  );
  if (!res.ok) throw new Error(`Edge Config write error: ${res.status}`);
  return res.json();
}

module.exports = { getItem, setItem };
