const listasItems = document.getElementById("card_personajes_comics"); // cómics y personajes
const btnAdelante = document.getElementById("adelante");
const btnAtras = document.getElementById("atras");
const btnAlPrincipio = document.getElementById("al_principio");
const btnAlFinal = document.getElementById("al_final");

const cambiarTitulo = document.querySelector(".titulo_busqueda");
const contenedor_resultados = document.getElementById("resultados");
const numeroResultado = document.getElementById("numero_resultado");
 

/* SECCION DETALLES */
const seccionDetalles = document.getElementById("seccion_detalles"); 

const publicKey = "ef12e30fbb2d51edb822c1a316b7f30b";
const ts = 1;
const hash = "f26390123ec9c2dd39fd71a48e2c1bb7";

const limit = 20;
let offset = 0;
let totalResults = 0;

function obtenerDatos(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (url.includes("comics")) {
          mostrarComics(data.data.results); // Llamo a la funcion  mostrarComics
          actualizarTotalResultados(data.data.total, "comics"); //actualizo el total de comics
      } else if (url.includes("characters")) {
          mostrarPersonajes(data.data.results); // Llamar a la funcion mostrarPersonajes
          actualizarTotalResultados(data.data.total, "characters"); //actualizo el total de personajes
      }
    })
    .catch((error) => console.error("Error:", error));
}


// Función para mostrar detalles de cómics
function mostrarInfoComics(comics) {
  
  seccionDetalles.innerHTML = ""; // Limpio la sección antes de agregar el contenido
  comics.forEach((comic) => {
   
    const divDetalle = document.createElement("div");
    divDetalle.className = "detalle_comics";

    const nuevaImagen = document.createElement("img");
    nuevaImagen.className = "comics_imagen";
    const imageUrl = comic.thumbnail.path + "." + comic.thumbnail.extension;
    nuevaImagen.src = imageUrl;

    const titulo = document.createElement("h2");
    titulo.className = "titulo_comics";
    titulo.textContent = comic.title;

    // Encontrar la fecha de publicación (onsaleDate)
    const onsaleDateObj = comic.dates.find(
      (dateObj) => dateObj.type === "onsaleDate"
    );
    const onsaleDate = onsaleDateObj ? new Date(onsaleDateObj.date) : null;

    // Si existe onsaleDate, la formateo a dd/mm/aaaa
    let fechaFormateada = "Fecha no disponible";
    if (onsaleDate) {
      const dia = String(onsaleDate.getDate()).padStart(2, "0");
      const mes = String(onsaleDate.getMonth() + 1).padStart(2, "0");
      const anio = onsaleDate.getFullYear();
      fechaFormateada = `${dia}/${mes}/${anio}`;
    }

    const publicado = document.createElement("h3");
    publicado.className = "publicado_comics";
    publicado.textContent = `Publicado: `;

    const parrafoPublicado = document.createElement("p");
    parrafoPublicado.className = "comics_publicado_fecha";
    parrafoPublicado.textContent = `${fechaFormateada}`;

    // Obtengo los nombres de los escritores (writers)
    const guionistas = document.createElement("h3");
    guionistas.className = "comics_escritores";
    guionistas.textContent = "Escritores: ";

    const listaGuionistas = document.createElement("ul");
    listaGuionistas.className = "lista_escritores";

    comic.creators.items
      .filter((creator) => creator.role.toLowerCase() === "writer")
      .forEach((writer) => {
        const li = document.createElement("li");
        li.className = "li_escritores";
        li.textContent = writer.name;
        listaGuionistas.appendChild(li);
      });

    const descripcion = document.createElement("h3");
    descripcion.className = "comics_titulo_descripcion";
    descripcion.textContent = "Descripción: ";

    const parrafoDescripcion = document.createElement("p");
    parrafoDescripcion.className = "comics_descripcion";
    parrafoDescripcion.textContent = comic.description
      ? comic.description
      : "Descripción no disponible";

    // Añado los elementos al divDetalle
    divDetalle.appendChild(nuevaImagen);
    divDetalle.appendChild(titulo);
    divDetalle.appendChild(publicado);
    publicado.appendChild(parrafoPublicado);
    divDetalle.appendChild(guionistas);
    divDetalle.appendChild(listaGuionistas);
    divDetalle.appendChild(descripcion);
    descripcion.appendChild(parrafoDescripcion);

    // Añado el divDetalle a la sección de detalles
    seccionDetalles.appendChild(divDetalle);
  });
}

 // Función para mostrar cómics en la lista
function mostrarComics(comics) {
 
  listasItems.innerHTML = ""; // Limpia el contenido anterior
    comics.forEach((comic) => {
      const imageUrl = comic.thumbnail.path + "." + comic.thumbnail.extension;

      if (imageUrl && !imageUrl.includes("image_not_available")) {
        const nuevoComic = document.createElement("div");
        nuevoComic.className = "card";
        nuevoComic.style.border = "1px solid grey";

        const nuevaImagen = document.createElement("img");
        nuevaImagen.className = "card-body";

        nuevaImagen.src = imageUrl;

        const descripcion = document.createElement("p");
        descripcion.className = "card-footer";
        descripcion.textContent = comic.title;
        descripcion.style.marginTop = "3px";

        nuevoComic.appendChild(nuevaImagen);
        nuevoComic.appendChild(descripcion);

        listasItems.appendChild(nuevoComic);

        nuevoComic.addEventListener("click", function () {
          alert(comic.title);

          listasItems.style.display = "none";

          mostrarInfoComics([comic]);
        });
      }
    });
}


 // Función para mostrar personajes en la lista
function mostrarPersonajes(personajes) {
 
  listasItems.innerHTML = ""; // Limpia el contenido anterior
    personajes.forEach((personaje) => {
      const imageUrl = personaje.thumbnail.path + "." + personaje.thumbnail.extension;
      if (imageUrl && !imageUrl.includes("image_not_available")) {
        const nuevoPersonaje = document.createElement("div");
        nuevoPersonaje.className = "card";
        nuevoPersonaje.style.border = "1px solid grey";

        const nuevaImagen = document.createElement("img");
        nuevaImagen.className = "card-body";

        nuevaImagen.src = imageUrl;

        const descripcion = document.createElement("p");
        descripcion.className = "card-footer";
        descripcion.textContent = personaje.name;
        descripcion.style.marginTop = "3px";

        nuevoPersonaje.appendChild(nuevaImagen);
        nuevoPersonaje.appendChild(descripcion);

        listasItems.appendChild(nuevoPersonaje);

        nuevoPersonaje.addEventListener("click", function () {
          alert(personaje.name);

          listasItems.style.display = "none";

          mostrarInfoPersonajes([personaje]);
        });
      }
    });
    

}

function mostrarInfoPersonajes(personajes) {

    seccionDetalles.innerHTML = ""; // Limpio la sección antes de agregarle contenido
    personajes.forEach((personaje) => {
      const divDetalle = document.createElement("div");
      divDetalle.className = "detalle_comics";

      const nuevaImagen = document.createElement("img");
      nuevaImagen.className = "comics_imagen";
      const imageUrl = personaje.thumbnail.path + "." + personaje.thumbnail.extension;
      nuevaImagen.src = imageUrl;

      const titulo = document.createElement("h2");
      titulo.className = "titulo_comics";
      titulo.textContent = personaje.name;

      

      const descripcion = document.createElement("h3");
      descripcion.className = "comics_titulo_descripcion";
      descripcion.textContent = "Descripción: ";

      const parrafoDescripcion = document.createElement("p");
      parrafoDescripcion.className = "comics_descripcion";
      parrafoDescripcion.textContent = personaje.description
        ? personaje.description
        : "Descripción no disponible";

      // Añado los elementos al divDetalle
      divDetalle.appendChild(nuevaImagen);
      divDetalle.appendChild(titulo);
      
      divDetalle.appendChild(descripcion);
      descripcion.appendChild(parrafoDescripcion);

      // Añado el divDetalle a la sección de detalles
      seccionDetalles.appendChild(divDetalle);
    });

}

function limpiarResultados() {
  
  contenedor_resultados.innerHTML = "";
}

function actualizarTotalResultados(total, tipo) {
 
  if (tipo === "comics") {
    numeroResultado.textContent = `${total} cómics encontrados`;
  } else if (tipo === "characters") {
    numeroResultado.textContent = `${total} personajes encontrados`;
  }
}

btnAdelante.addEventListener("click", function () {
  offset += limit;
  realizarBusqueda();
});

btnAtras.addEventListener("click", function () {
  if (offset >= limit) {
    offset -= limit;
    realizarBusqueda();
  }
});

btnAlPrincipio.addEventListener("click", function () {
  offset = 0;
  realizarBusqueda();
});

btnAlFinal.addEventListener("click", function () {
  if (totalResults > limit) {
    offset = Math.max(0, totalResults - limit);
    realizarBusqueda();
  }
});

const buscarBoton = document.getElementById("buscar");
const tipo = document.getElementById("tipo");
const input_busqueda = document.getElementById("input_busqueda");
const order = document.getElementById("order");

// Función que ajusta las opciones de orden según el tipo seleccionado
function ajustarOpcionesOrden() {
  // Limpia las opciones actuales de "orden"
  order.innerHTML = "";

  // Si es "comics", agrego todas las opciones
  if (tipo.value === "comics") {
    const optionAz = new Option("A-Z", "az");
    const optionZa = new Option("Z-A", "za");
    const optionNew = new Option("Más nuevos", "new");
    const optionOld = new Option("Más viejos", "old");
    
    order.add(optionAz);
    order.add(optionZa);
    order.add(optionNew);
    order.add(optionOld);

  // Si es "characters", solo muestro las opciones A-Z y Z-A
  } else if (tipo.value === "characters") {
    const optionAz = new Option("A-Z", "az");
    const optionZa = new Option("Z-A", "za");

    order.add(optionAz);
    order.add(optionZa);
  }
}

// Escucho el cambio en el select "tipo" para ajustar las opciones de "orden"
tipo.addEventListener("change", ajustarOpcionesOrden);

// Llamo a la función al inicio para asegurarme de que esté correcta al cargar la página
ajustarOpcionesOrden();

function realizarBusqueda() {
  const queryParam =
    tipo.value === "comics" ? "titleStartsWith" : "nameStartsWith";
  const endpoint = tipo.value === "comics" ? "comics" : "characters";
  const queryValue = input_busqueda.value.trim(); // Valor de búsqueda ingresado

  let orderBy = "";

  if (tipo.value === "comics") {
    if (order.value === "az") orderBy = "title";
    else if (order.value === "za") orderBy = "-title";
    else if (order.value === "new") orderBy = "modified";
    else if (order.value === "old") orderBy = "-modified";
  } else if (tipo.value === "characters") {
    if (order.value === "az") orderBy = "name";
    else if (order.value === "za") orderBy = "-name";
    else if (order.value === "new") orderBy = "modified";
    else if (order.value === "old") orderBy = "-modified";
  }

  let url = `http://gateway.marvel.com/v1/public/${endpoint}?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;

  if (queryValue) {
    url += `&${queryParam}=${queryValue}`;
  }

  if (orderBy) {
    url += `&orderBy=${orderBy}`;
  }

  console.log("Parámetros de búsqueda:");
  console.log("Endpoint:", endpoint);
  console.log("Query Value:", queryValue);
  console.log("Order By:", orderBy);
  console.log("URL final:", url);

  obtenerDatos(url);
}

buscarBoton.addEventListener("click", (event) => {
  event.preventDefault();
  offset = 0; // Reinicio para hacer una nueva búsqueda
  realizarBusqueda();
});

// Llamo inicialmente para cargar los cómics al cargar la página
function inicializar() {

    order.value = "za";

  const url = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=${limit}&offset=${offset}`;
  obtenerDatos(url);
}

inicializar();