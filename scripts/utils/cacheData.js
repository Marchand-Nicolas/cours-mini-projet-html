function cacheData(key, data, expirationDays = 0.01) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  localStorage.setItem(key, JSON.stringify({ data, expirationDate }));
}
