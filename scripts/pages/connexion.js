function connexion(e) {
  e.preventDefault();
  const form = e.target;
  const username = form.formConnexionUsername.value;
  const password = form.formConnexionPassword.value;
  if (!username || !password) {
    monter(popup("Erreur", "Veuillez remplir tous les champs."));
    return;
  }

  const screen = monter(loadingScreen());
  request(`${config.api}/private/login`, {
    method: "POST",
    body: { username, password },
  }).then((response) => {
    if (response.empty) {
      screen.remove();
      monter(popup("Erreur", "Identifiants invalides."));
      return;
    }
    screen.remove();
    // Mettre les données de l'utilisateur en cache
    cacheData("user", response, 7);
    const redirect = new URLSearchParams(window.location.search).get(
      "redirect"
    );
    window.location.href = redirect ? redirect : "./index.html";
  });
}
