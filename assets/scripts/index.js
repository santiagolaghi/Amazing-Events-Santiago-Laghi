const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorChecks = document.getElementById("contenedorChecks");
const inputBusqueda = document.getElementById("inputBusqueda");

import { MostrarChecks, aplicarFiltroCruzado } from '../modules/functions.js';

let eventos = [];

fetch('https://mindhub-xj03.onrender.com/api/amazing')
  .then(response => response.json())
  .then(data => {
    eventos = data.events;
    mostrarTarjeta(eventos);
    MostrarChecks(eventos, contenedorChecks);
    contenedorChecks.addEventListener('change', (event) => {
        aplicarFiltroCruzado(eventos, inputBusqueda, mostrarTarjeta);
      });
      inputBusqueda.addEventListener('input', () => {
        aplicarFiltroCruzado(eventos, inputBusqueda, mostrarTarjeta);
      });
  })
  .catch(error => {
    console.log("Hubo un error", error);
  });

  function crearTarjeta(objeto) {
    return `<div class="card" style="width: 18rem;">         
                <img class="imagecard" src="${objeto.image}">
                <div class="card-body d-flex flex-column align-items-center text-center">
                    <h5 class="card-title">${objeto.name}</h5>
                    <p class="card-text">${objeto.description}</p>
                    <div class="divpya d-flex justify-content-around align-items-center pt-4">                       
                        <p class="cardtextp card-text">$${objeto.price}</p>
                        <a class="botona text-decoration-none border border-2 p-1" href=" assets/pages/Details.html?name=${objeto.name}" class="btn btn-primary">Details</a>
                    </div>                  
                </div>
            </div>`;
  }

function mostrarTarjeta(ListaDeEventos) {
  let card = "";
  for (let evento of ListaDeEventos) {
    card += crearTarjeta(evento);
  }
  contenedorTarjetas.innerHTML = card;
}

