import { crearTarjeta, MostrarChecks, aplicarFiltroCruzado, filtrarEventosPorCategoria, filtrarEventosPorNombre } from '../modules/functions.js';

const contenedorTarjetas = document.getElementById('contenedorTarjetas');
const contenedorChecks = document.getElementById("contenedorChecks");
const inputBusqueda = document.getElementById("inputBusqueda");
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

function mostrarTarjeta(listaDeEventos) {
  let card = "";
  let eventosFiltrados = filtrarEventosFechasMenorA(listaDeEventos, 2022);
  for (let evento of eventosFiltrados) {
    card += crearTarjeta(evento);
  }
  contenedorTarjetas.innerHTML = card;
}

function filtrarEventosFechasMenorA(eventos, fechaParaFiltrar) {
  let eventosFiltrados = [];
  for (let evento of eventos) {
    let anio = parseInt(evento.date.split('-')[0]);
    if (anio > fechaParaFiltrar) {
      eventosFiltrados.push(evento);
    }
  }
  return eventosFiltrados;
}