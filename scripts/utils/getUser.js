async function getUser(userId) {
  if (userId === userObject.id) return userObject;
  const cachedUser = getCachedData(`user-${userId}`);
  if (cachedUser) return cachedUser;
  const user = await request(`${config.api}/getUser?userId=${userId}`, {
    method: "GET",
  });
  cacheData(`user-${userId}`, JSON.stringify(user), 1);
  return user;
}
