// header.js
document.addEventListener('DOMContentLoaded', function () {
    // Crea un nuevo link elemento para cargar styles.css
    const stylesElement = document.createElement('link');
    stylesElement.rel = 'stylesheet';
    stylesElement.href = 'styles.css';

    // Agrega el enlace de estilos al head
    document.head.appendChild(stylesElement);
    // Busca el elemento con el id 'header'
    const headerContainer = document.getElementById('header');

    // Asigna el código del encabezado al elemento existente
    headerContainer.innerHTML = `
            <nav>
                <h1>Proto nostr</h1>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="articulos.html">Articulos</a></li>
                    <li><a href="eventos.html">Eventos</a></li>
                    <li><a href="nip07.html">Nip07</a></li>
                </ul>
            </nav>
    `;
});
