function cacheData(key, data, expirationDays = 1) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + expirationDays);
  localStorage.setItem("data", JSON.stringify({ data, expirationDate }));
}
