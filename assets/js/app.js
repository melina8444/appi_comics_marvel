const peliculasListas = document.getElementById('peliculas');
const btnAdelante = document.getElementById('adelante');
const btnAtras = document.getElementById('atras');
const btnAlPrincipio = document.getElementById('al_principio');
const btnAlFinal = document.getElementById('al_final');

const cambiarTitulo = document.querySelector('.titulo_busqueda');


const capturar=()=>{
    cambiarTitulo.textContent = 'Nueva Busqueda';
    
}

capturar();



const publicKey = 'ef12e30fbb2d51edb822c1a316b7f30b';
const ts = 1;
const hash = 'f26390123ec9c2dd39fd71a48e2c1bb7';

const limit = 20;
let offset = 0;
let totalResults = 0;

function mostrarPelis(pelis) {
    peliculasListas.innerHTML = ''; // Limpiar el contenido anterior
    pelis.forEach(personaje => {
        const nuevoPersonaje = document.createElement('div');
        nuevoPersonaje.className = 'card';
        nuevoPersonaje.style.border = '1px solid grey'

        const nuevaImagen = document.createElement('img');
        nuevaImagen.className = 'card-body';
        const imageUrl = personaje.thumbnail.path + '.' + personaje.thumbnail.extension;
        nuevaImagen.src = imageUrl;

        const descripcion = document.createElement('p');
        descripcion.className = 'card-footer';
        descripcion.textContent = personaje.title;
        descripcion.style.marginTop = '3px'; // Margen superior para separar la imagen del texto

        nuevoPersonaje.appendChild(nuevaImagen);
        nuevoPersonaje.appendChild(descripcion);

        peliculasListas.appendChild(nuevoPersonaje);

        nuevoPersonaje.addEventListener('click', function() {
            alert(personaje.title);
        });
    });
}

function obtenerPeliculas(url) {
    if (!url) {
        url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
    }
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarPelis(data.data.results))
        .catch(error => console.error('Error:', error));
}

function limpiarResultados() {
    const contenedor_resultados = document.getElementById('resultados');
    contenedor_resultados.innerHTML = '';
  }

  function ActualizarResultadosContados(count) {
    const numeroResultado= document.getElementById('numero_resultado');
    numeroResultado.innerHTML = count;
  }

btnAdelante.addEventListener('click', function() {
    offset += limit;
    obtenerPeliculas();
});

btnAtras.addEventListener('click', function() {
    if (offset >= limit) {
        offset -= limit;
        obtenerPeliculas();
    }
});

btnAlPrincipio.addEventListener('click', function() {
    offset = 0; // Reinicia el offset a 0
    obtenerPeliculas();
});

btnAlFinal.addEventListener('click', function() {
    if (totalResults > limit) {
        offset = Math.max(0, totalResults - (totalResults % limit));
        obtenerPeliculas();
    }
});

obtenerPeliculas();


const buscarBoton = document.getElementById('buscar')
const tipo = document.getElementById('tipo')
const input_busqueda = document.getElementById('input_busqueda')
const order = document.getElementById('order')

// buscarBoton.addEventListener('click', (event)=>{
//     event.preventDefault()
//     console.log(tipo.value)
//     if (tipo.value === 'comics'){
//         let url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&titleStartsWith=${input_busqueda.value}`
//         obtenerPeliculas(url);
//     }else if (tipo.value === 'characters'){
//         let url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${input_busqueda.value}`
//         obtenerPeliculas(url);
//     }

//     const queryParam = tipo.value === 'comics' ? 'titleStartsWith' : 'nameStartsWith';
//         const url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&${queryParam}=${input_busqueda.value}`
//         offset = 0 // Reinicio para hacer una nueva búsqueda
//         obtenerPeliculas(url)
// })

function realizarBusqueda() {
    const queryParam = tipo.value === 'comics' ? 'titleStartsWith' : 'nameStartsWith';
    const endpoint = tipo.value === 'comics' ? 'comics' : 'characters';
    const queryValue = input_busqueda.value.trim();

    let orderBy = '';

    if (order.value === 'az') orderBy = 'title';
    else if (order.value === 'za') orderBy = '-title';
    else if (order.value === 'new') orderBy = 'modified';
    else if (order.value === 'old') orderBy = '-modified';

    if (queryValue) {
        const url = `http://gateway.marvel.com/v1/public/${endpoint}?ts=${ts}&apikey=${publicKey}&hash=${hash}&${queryParam}=${queryValue}&limit=${limit}&offset=${offset}&orderBy=${orderBy}`;
        obtenerPeliculas(url);
    } else {
        console.error('No hay busqueda 😒.');
    }
}

buscarBoton.addEventListener('click', (event) => {
    event.preventDefault();
    offset = 0; // Reinicio para hacer una nueva búsqueda
    realizarBusqueda();
});

realizarBusqueda();