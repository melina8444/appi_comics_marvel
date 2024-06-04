const peliculasListas = document.getElementById('peliculas');

const publicKey ='ef12e30fbb2d51edb822c1a316b7f30b'
const privateKey = '1a05e032372596f669864e19763340129c7b1c78'
const ts = 1
const hash = 'f26390123ec9c2dd39fd71a48e2c1bb7'

const url =`http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`


function mostrarPelis(pelis) {
    pelis.forEach(personaje => {
        const nuevoPersonaje = document.createElement('div');
        nuevoPersonaje.className = 'card'
        const nuevaImagen = document.createElement('img');
        nuevaImagen.className = 'card-body';
        const descripcion = document.createElement('p');
        descripcion.className ='card-footer'
        nuevaImagen.src = personaje.url;
        nuevoPersonaje.textContent = personaje.name;
        descripcion.textContent = personaje.title;

        nuevoPersonaje.appendChild(nuevaImagen);
        nuevoPersonaje.appendChild(descripcion);

        peliculasListas.appendChild(nuevoPersonaje);
        
        nuevoPersonaje.addEventListener('click', function(){
            alert(personaje.name)
        })
    });
}

function obtenerPeliculas() {
    fetch('http://gateway.marvel.com/v1/public/comics?ts=1&apikey=ef12e30fbb2d51edb822c1a316b7f30b&hash=f26390123ec9c2dd39fd71a48e2c1bb7')
        .then(response => response.json())
        .then(data => console.log(data.results))
        .catch(error => console.error('Error:', error));
}

obtenerPeliculas();