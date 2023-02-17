function loading() {
  const html = `
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  `

  return {
    html: html,
    style: true,
    nom: 'loading',
  };
}