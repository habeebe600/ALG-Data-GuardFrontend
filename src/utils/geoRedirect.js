export async function handleGeoRedirect() {
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') return;

  const isOnDotCom = hostname.includes('algdataguard.com');
  const isOnDotCa  = hostname.includes('algdataguard.ca');

  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    const isCanadian = data.country_code === 'CA';

    if (isCanadian && isOnDotCom) {
      window.location.replace(`https://algdataguard.ca${window.location.pathname}`);
    }
    if (!isCanadian && isOnDotCa) {
      window.location.replace(`https://algdataguard.com${window.location.pathname}`);
    }
  } catch (e) {
    console.error('Geo redirect failed:', e);
  }
}