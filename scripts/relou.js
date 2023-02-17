// Fait bouger le bouton dès que la souris s'approche
const relou = document.getElementById('relou');
const width = 180;
const height = 30;

const marge = 40;

relou.style.width = `${width}px`;
relou.style.height = `${height}px`;

const move = (e) => {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    const x = e.clientX;
    const y = e.clientY;
    const rect = relou.getBoundingClientRect();
    const left = rect.left;
    const top = rect.top;

    // Détécter quand le souris s'approche du bouton, avec une marge de 'marge' pixels
    if (x > left - marge && x < left + width + marge && y > top - marge && y < top + height + marge) {
        const newX = Math.floor(Math.random() * (pageWidth - width));
        const newY = Math.floor(Math.random() * (pageHeight - height));
        relou.style.left = `${newX}px`;
        relou.style.top = `${newY}px`;
    }
}

document.addEventListener('mousemove', move);