const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const eventos = data.events;

function crearTarjeta(objeto) {
    return `<div class="card" style="width: 18rem;">         
                <img class="imagecard" src="${objeto.image}">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${objeto.name}</h5>
                    <p class="card-text">${objeto.description}</p>
                    <div class="divpya d-flex justify-content-around align-items-center pt-4">                       
                        <p class="cardtextp card-text">$${objeto.price}</p>
                        <a class="botona text-decoration-none border border-2 p-1" href="./assets/pages/Details.html?name=${objeto.name}" class="btn btn-primary">Details</a>
                    </div>                  
                </div>
            </div>`
}

function mostrarTarjeta(ListaDeEventos) {
    let card = ""
    for (let evento of ListaDeEventos) {
        card += crearTarjeta(evento)
    }
    contenedorTarjetas.innerHTML = card
}

mostrarTarjeta(eventos)

const contenedorChecks = document.getElementById("contenedorChecks")

function MostrarChecks(data) {
    const arrayCategory = (data.map(evento => evento.category))
    const categoriasSinRepetir = Array.from(new Set(arrayCategory))
    let checkboxs = ""
    for (let categoria of categoriasSinRepetir) {
        checkboxs += crearCheckboxs(categoria)
    }
    contenedorChecks.innerHTML = checkboxs
}
function crearCheckboxs(categoria) {
    return `<div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="checkbox-${categoria}" value="${categoria}">
    <label class="form-check-label" for="checkbox-${categoria}">${categoria}</label>
  </div>`
}
MostrarChecks(eventos)

contenedorChecks.addEventListener('change', (event) => {
    const checked = document.querySelectorAll('input[type=checkbox]:checked')
    const arrayChecked = Array.from(checked).map(checkbox => checkbox.value)

    if (arrayChecked.length === 0) {
        mostrarTarjeta(eventos);  
    } else {
        let eventosFiltrados = filtrarEventosPorCategoria(arrayChecked);
        mostrarTarjeta(eventosFiltrados);
    }
});


function filtrarEventosPorCategoria(categorias) {
    let eventosFiltrados = eventos.filter(evento => categorias.includes (evento.category))
    return eventosFiltrados
}

const inputBusqueda = document.getElementById("inputBusqueda");

inputBusqueda.addEventListener('input', () => {
    aplicarFiltroCruzado();
});

function aplicarFiltroCruzado() {
    const checked = document.querySelectorAll('input[type=checkbox]:checked');
    const arrayChecked = Array.from(checked).map(checkbox => checkbox.value);
    const textoBusqueda = inputBusqueda.value.toLowerCase().trim();

    let eventosFiltrados = eventos;

    if (arrayChecked.length > 0) {
        eventosFiltrados = filtrarEventosPorCategoria(arrayChecked);
    }

    if (textoBusqueda !== "") {
        eventosFiltrados = eventosFiltrados.filter(evento => evento.name.toLowerCase().includes(textoBusqueda));
    }

    mostrarTarjeta(eventosFiltrados);

    const mensajeNoResultados = document.getElementById("mensajeNoResultados");
    const imagenNoResultados = mensajeNoResultados.querySelector("img");
    if (eventosFiltrados.length === 0) {
        mensajeNoResultados.style.display = "block";
        imagenNoResultados.style.display = "block";
    } else {
        mensajeNoResultados.style.display = "none";
        imagenNoResultados.style.display = "none";
    }
}






