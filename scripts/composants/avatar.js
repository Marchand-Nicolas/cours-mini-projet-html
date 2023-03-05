function avatar({ customAvatarURL, width } = {}) {
  const avatarURL = customAvatarURL
    ? customAvatarURL.startsWith("http")
      ? customAvatarURL
      : config.api + "/image/" + customAvatarURL
    : userObject.avatar
    ? config.api + "/image/" + userObject.avatar
    : undefined;

  const html = `
    <img style="width: ${width || 100}px" src="${
    customAvatarURL !== null && avatarURL
      ? avatarURL
      : relativePath + "images/avatar.png"
  }" class="avatar" alt="avatar" />
  `;

  return {
    html: html,
    style: true,
    nom: "avatar",
  };
}
