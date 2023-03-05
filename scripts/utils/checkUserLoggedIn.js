function checkUserLoggedIn(autoRedirect) {
  function redirect() {
    window.location.href = `${relativePath}connexion.html?redirect=${window.location.href}`;
  }

  if (!userObject.username) {
    if (autoRedirect) redirect();
    else
      monter(
        popup(
          "Erreur",
          "Vous devez être connecté pour effectuer cette action.",
          {
            buttonText: "Se connecter",
            action: redirect,
          }
        )
      );
    return false;
  }
  return true;
}
