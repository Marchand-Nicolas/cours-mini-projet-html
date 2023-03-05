async function getUser(userId) {
  const cachedUser = getCachedData(`user-${userId}`);
  if (cachedUser) return JSON.parse(cachedUser);
  const user = await request(`${config.api}/getUser?userId=${userId}`, {
    method: "GET",
  });
  cacheData(`user-${userId}`, JSON.stringify(user), 1);
  return user;
}
