function loadingScreen() {
  const id = `random-id-${Math.random()}-loadingScreen`;
  const html = ``

  return {
    html: html,
    style: true,
    nom: 'loadingScreen',
    script: (container) => {
      monterDans(loading(), container);
    }
  };
}