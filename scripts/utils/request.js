async function request(url, { method, body }) {
  try {
    const requestOptions = {
      method: method,
      body: typeof body === "object" ? JSON.stringify(body) : body,
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await fetch(url, requestOptions);
    try {
      const data = await res.json();
      return data;
    } catch (e) {
      return {
        empty: true,
      };
    }
  } catch (e) {
    monter(
      popup(
        "Erreur",
        `Une erreur est survenue lors du chargement de données depuis l'API:
<br>
<br>
${e.toString()}`
      )
    );
  }
}
