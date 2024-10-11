function obtenerOraciones(texto) {
    return texto.match(/[^\.!\?]+[\.!\?]+/g);
}

function seleccionarOracionesAleatorias(oraciones, min, max) {
    const cantidad = Math.floor(Math.random() * (max - min + 1)) + min;
    return oraciones.sort(() => 0.5 - Math.random()).slice(0, cantidad);
}

function mostrarOraciones(oraciones) {
    document.getElementById('texto').innerHTML = oraciones.join('<br>');
}

function seleccionarPalabrasAleatorias() {
    const palabras = document.getElementById('texto').innerText.split(/\s+/);
    return palabras.filter(() => Math.random() < 0.2);
}

function cambiarColorPalabras() {
    const palabrasSeleccionadas = seleccionarPalabrasAleatorias();
    const texto = document.getElementById('texto');
    texto.innerHTML = texto.innerHTML.replace(/\S+/g, palabra => 
        palabrasSeleccionadas.includes(palabra) ? `<span class="highlight">${palabra}</span>` : palabra
    );
}

function obtenerParametroURL(nombre) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nombre);
}

function leerArchivo() {
    const nombreArchivo = obtenerParametroURL('archivo') || 'libroastro.txt';
    const errorMessage = document.getElementById('errorMessage');

    fetch(nombreArchivo, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 'no-cache'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(texto => {
        errorMessage.textContent = '';
        const oraciones = obtenerOraciones(texto);
        const oracionesSeleccionadas = seleccionarOracionesAleatorias(oraciones, 4, 9);
        mostrarOraciones(oracionesSeleccionadas);
    })
    .catch(error => {
        console.error('Error al leer el archivo:', error);
        errorMessage.textContent = `Error al leer el archivo: ${error.message}`;
    });
}

window.onload = leerArchivo;

document.getElementById('cambiarColor').addEventListener('click', cambiarColorPalabras);
