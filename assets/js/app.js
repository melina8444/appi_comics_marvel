const peliculasListas = document.getElementById('peliculas');

const publicKey ='ef12e30fbb2d51edb822c1a316b7f30b'
const privateKey = '1a05e032372596f669864e19763340129c7b1c78'
const ts = 1
const hash = 'f26390123ec9c2dd39fd71a48e2c1bb7'

const url =`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`


function mostrarPelis(pelis) {
    pelis.forEach(personaje => {
        const nuevoPersonaje = document.createElement('div');
        nuevoPersonaje.className = 'card';

        const nuevaImagen = document.createElement('img');
        nuevaImagen.className = 'card-body';
        const imageUrl = personaje.thumbnail.path + '.' + personaje.thumbnail.extension;
        nuevaImagen.src = imageUrl;

        const descripcion = document.createElement('p');
        descripcion.className ='card-footer'
        descripcion.textContent = personaje.title;
        descripcion.style.marginTop = '10px'; // Margen superior para separar la imagen del texto

        nuevoPersonaje.appendChild(nuevaImagen);
        nuevoPersonaje.appendChild(descripcion);

        peliculasListas.appendChild(nuevoPersonaje);
        
        nuevoPersonaje.addEventListener('click', function(){
            alert(personaje.title)
        })
    });
}

function obtenerPeliculas() {
    fetch(url)
        .then(response => response.json())
        .then(data => mostrarPelis(data.data.results))
        .catch(error => console.error('Error:', error));
}

obtenerPeliculas();