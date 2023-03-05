function checkUserLoggedIn() {
  const user = window.localStorage.getItem("user");
  if (!user || user === "undefined" || user === "null") {
    monter(
      popup("Erreur", "Vous devez être connecté pour effectuer cette action.", {
        buttonText: "Se connecter",
        action: () => {
          window.location.href = `${relativePath}connexion.html?redirect=${window.location.href}`;
        },
      })
    );
    return false;
  }
  return true;
}
