function getCachedData(key) {
  const object = localStorage.getItem(key);
  if (object) {
    try {
      const { data, expirationDate } = JSON.parse(object);
      if (new Date() > new Date(expirationDate)) {
        localStorage.removeItem(key);
        return null;
      }
      try {
        return JSON.parse(data);
      } catch (e) {
        return data;
      }
    } catch (e) {
      return null;
    }
  }
  return null;
}
