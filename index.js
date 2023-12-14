/* Variables */
const input = document.querySelector("[data-input]");
const section = document.querySelector("[data-section]");
const option = document.querySelector("[data-option]");

/* Funcion asincrona para obtener informacion de la api */
async function traerinfo(character, statement) {
  let baseURL = "https://rickandmortyapi.com/api/character/";
  /* si character o statement son true, se agregara un signo ? al final de la url */
  if (character || statement) {
    baseURL += "?";
    /* Si es character true, se agrega lo siguiente */
    if (character) {
      baseURL += `name=${character}&`;
    }
    /* Si es statement true, se agrega lo siguiente */
    if (statement) {
      baseURL += `status=${statement}`;
    }
  }

  const respuesta = await fetch(baseURL);
  const data = await respuesta.json();
  /* Este section se limpia para que se elimine a los del pricipio cada vez 
  que se llame la funcion, asi no se mantienen los mismos personajes al inici */
  section.innerHTML = "";
  /* modifica el DOM */
  DOM(data.results);
}
/* Funcion para al cargar la pagina, cargue las informacion de los personajes */
window.addEventListener("load", () => {
  traerinfo();
});

/* Funcion para modificar el DOM */
function DOM(element) {
  /* Por cada elemento del array de objetos que se le pase, creara una tarjeta */
  element.forEach((element) => {
    const card = document.createElement("div");
    card.classList.add("p-2.5", "bg-white");
    const img = document.createElement("img");
    img.src = element.image;
    card.appendChild(img);
    const title = document.createElement("h2");
    title.classList.add("text-xl", "font-semibold");
    title.innerHTML = element.name;
    card.appendChild(title);
    const status = document.createElement("p");
    const especie = document.createElement("p");
    status.innerHTML = "Estatus: " + element.status;
    especie.innerHTML = "Especie " + element.species;
    card.appendChild(status);
    card.appendChild(especie);
    section.appendChild(card);
  });
}

/* Con esto se detecta el cambio de valor del input, se llama a la funcion traerinfo
y se le agrega el valor del option/seleccion */
input.addEventListener("input", () => {
  traerinfo(input.value, option.value);
});
/* Con eso cada vez que seleccionamos algo en el option llama a la funcion de traerinfo
y se le agrega el valor del input */
option.addEventListener("change", (e) => {
  traerinfo(input.value, e.target.value);
});
