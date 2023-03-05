const usernameElement = document.getElementById("username");
const avatarContainer = document.getElementById("avatarContainer");

usernameElement.innerText = userObject.username;
monterDans(avatar(), avatarContainer);

function updateProfile(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  formData.append("username", userObject.username);
  formData.append("password", userObject.password);

  // Envoyer les données du formulaire
  const requestOptions = {
    method: "POST",
    body: formData,
  };
  const screen = monter(loadingScreen());
  fetch(`${config.api}/private/updateProfile`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        monter(popup("Erreur", data.error));
      } else {
        const keys = Object.keys(data.user);
        for (let i = 0; i < keys.length; i++) {
          userObject[keys[i]] = data.user[keys[i]];
        }
        setCookie("user", JSON.stringify(userObject), 7);
        screen.remove();
        window.location.reload();
      }
    });
}
