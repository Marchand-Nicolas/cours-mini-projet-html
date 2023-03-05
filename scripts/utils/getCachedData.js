function getCachedData(key) {
  const object = localStorage.getItem(key);
  if (object) {
    const { data, expirationDate } = JSON.parse(object);
    if (new Date() > new Date(expirationDate)) {
      localStorage.removeItem(key);
      return null;
    }
    return JSON.parse(data);
  }
  return null;
}
