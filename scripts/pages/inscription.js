function inscription(e) {
  e.preventDefault();
  const form = e.target;
  const username = form.formInscriptionUsername.value;
  const password = form.formInscriptionPassword.value;
  const password2 = form.formInscriptionPassword2.value;

  if (!username || !password || !password2) {
    monter(popup("Erreur", "Veuillez remplir tous les champs."));
    return;
  }

  if (username.length < 3) {
    monter(
      popup("Erreur", "Le nom d'utilisateur doit faire au moins 3 caractères.")
    );
    return;
  }

  if (password.length < 6) {
    monter(
      popup("Erreur", "Le mot de passe doit faire au moins 6 caractères.")
    );
    return;
  }

  if (password !== password2) {
    monter(popup("Erreur", "Les mots de passe ne correspondent pas."));
    return;
  }

  const screen = monter(loadingScreen());
  request(`${config.api}/private/signUp`, {
    method: "POST",
    body: { username, password },
  }).then((response) => {
    console.log(response);
    screen.remove();
    if (response.error) {
      monter(popup("Erreur", response.error));
      return;
    }
    monter(
      popup("Succès", "Votre compte a bien été créé.", {
        buttonText: "Se connecter",
        action: () => {
          window.location.href = "./profile.html";
        },
      })
    );
  });
}
