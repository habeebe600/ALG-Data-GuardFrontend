export const isCanadianSite = () =>
  window.location.hostname.includes('.ca');

export const siteCurrency = () =>
  isCanadianSite() ? 'CAD' : 'USD';

export const siteRegion = () =>
  isCanadianSite() ? 'CA' : 'US';