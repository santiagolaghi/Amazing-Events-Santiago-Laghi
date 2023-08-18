const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const eventos = data.events;

    const eventoMayorAsistencia = eventos.reduce(function (maxEvento, evento) {
      const proporcionActual = (evento.assistance / evento.capacity) * 100;
      const proporcionMayor = (maxEvento.assistance / maxEvento.capacity) * 100;
      if (proporcionActual > proporcionMayor) {
        return evento;
      }
      return maxEvento;
    }, eventos[0]);

    const eventoMenorAsistencia = eventos.reduce(function (minEvento, evento) {
      const proporcionActual = (evento.assistance / evento.capacity) * 100;
      const proporcionMenor = (minEvento.assistance / minEvento.capacity) * 100;
      if (proporcionActual < proporcionMenor) {
        return evento;
      }
      return minEvento;
    }, eventos[0]);

    const eventoMayorCapacidad = eventos.reduce(function (maxEvento, evento) {
      if (evento.capacity > maxEvento.capacity) {
        return evento;
      }
      return maxEvento;
    }, eventos[0]);

    // Llenar datos en los TD correspondientes para la primera tabla
    document.getElementById('eventoMayorAsistencia').textContent = `${eventoMayorAsistencia.name} (${(eventoMayorAsistencia.assistance / eventoMayorAsistencia.capacity * 100).toFixed(2)}%)`;
    document.getElementById('eventoMenorAsistencia').textContent = `${eventoMenorAsistencia.name} (${(eventoMenorAsistencia.assistance / eventoMenorAsistencia.capacity * 100).toFixed(2)}%)`;
    document.getElementById('eventoMayorCapacidad').textContent = `${eventoMayorCapacidad.name} (${eventoMayorCapacidad.capacity})`;

    // Filtrar eventos pasados (antes de 2023)
    const eventosPasados = eventos.filter(evento => evento.date < '2023-01-01');

    const recaudacionPorCategoriaPasados = eventosPasados.reduce((recaudacion, evento) => {
      const recaudacionEvento = evento.assistance * evento.price;
      const categoria = evento.category;

      if (!recaudacion[categoria]) {
        recaudacion[categoria] = 0;
      }
      recaudacion[categoria] += recaudacionEvento;
      return recaudacion;
    }, {});

    const asistenciaPorCategoriaPasados = eventosPasados.reduce((asistencia, evento) => {
      const porcentajeAsistencia = (evento.assistance / evento.capacity) * 100;
      const categoria = evento.category;

      if (!asistencia[categoria]) {
        asistencia[categoria] = {
          totalAsistencia: 0,
          cantidadEventos: 0,
        };
      }
      asistencia[categoria].totalAsistencia += porcentajeAsistencia;
      asistencia[categoria].cantidadEventos += 1;
      return asistencia;
    }, {});

    // Calcular el promedio de asistencia por categoría
    for (const categoria in asistenciaPorCategoriaPasados) {
      const promedioAsistencia = asistenciaPorCategoriaPasados[categoria].totalAsistencia / asistenciaPorCategoriaPasados[categoria].cantidadEventos;
      asistenciaPorCategoriaPasados[categoria] = `${promedioAsistencia.toFixed(2)}%`;
    }

    // Llenar la tabla de eventos pasados
    const pastEventTable = document.getElementById('pastEventTable');
    for (const categoria in recaudacionPorCategoriaPasados) {
      const row = document.createElement('tr');

      const cellCategoria = document.createElement('td');
      cellCategoria.textContent = categoria;
      row.appendChild(cellCategoria);

      const cellRecaudacion = document.createElement('td');
      const formattedRecaudacion = parseFloat(recaudacionPorCategoriaPasados[categoria]).toLocaleString(undefined, { minimumFractionDigits: 2 });
      cellRecaudacion.textContent = `$${formattedRecaudacion}`;
      row.appendChild(cellRecaudacion);

      const cellAsistencia = document.createElement('td');
      cellAsistencia.textContent = asistenciaPorCategoriaPasados[categoria];
      row.appendChild(cellAsistencia);

      pastEventTable.appendChild(row);
    }

    // Llenar la tabla de eventos futuros
    const upcomingEventTable = document.getElementById('UpCommingTable');
    const eventosMayoresIgual2023 = eventos.filter(evento => evento.date >= '2023-01-01');

    const estimacionRecaudacionPorCategoria = eventosMayoresIgual2023.reduce((recaudacion, evento) => {
      const estimacionRecaudacionEvento = evento.estimate * evento.price;
      const categoria = evento.category;

      if (!recaudacion[categoria]) {
        recaudacion[categoria] = 0;
      }
      recaudacion[categoria] += estimacionRecaudacionEvento;
      return recaudacion;
    }, {});

    const estimacionAsistenciaPorCategoria = eventosMayoresIgual2023.reduce((asistencia, evento) => {
      const estimacionPorcentajeAsistencia = (evento.estimate / evento.capacity) * 100; // Cambio en el cálculo
      const categoria = evento.category;

      if (!asistencia[categoria]) {
        asistencia[categoria] = {
          totalAsistencia: 0,
          cantidadEventos: 0,
        };
      }
      asistencia[categoria].totalAsistencia += estimacionPorcentajeAsistencia;
      asistencia[categoria].cantidadEventos += 1;
      return asistencia;
    }, {});

    // Calcular el promedio de asistencia por categoría
    for (const categoria in estimacionAsistenciaPorCategoria) {
      const promedioAsistencia = estimacionAsistenciaPorCategoria[categoria].totalAsistencia / estimacionAsistenciaPorCategoria[categoria].cantidadEventos;
      estimacionAsistenciaPorCategoria[categoria] = `${promedioAsistencia.toFixed(2)}%`;
    }

    for (const categoria in estimacionRecaudacionPorCategoria) {
      const row = document.createElement('tr');

      const cellCategoria = document.createElement('td');
      cellCategoria.textContent = categoria;
      row.appendChild(cellCategoria);

      const cellRecaudacion = document.createElement('td');
      const formattedRecaudacion = parseFloat(estimacionRecaudacionPorCategoria[categoria]).toLocaleString(undefined, { minimumFractionDigits: 2 });
      cellRecaudacion.textContent = `$${formattedRecaudacion}`;
      row.appendChild(cellRecaudacion);

      const cellAsistencia = document.createElement('td');
      cellAsistencia.textContent = estimacionAsistenciaPorCategoria[categoria];
      row.appendChild(cellAsistencia);

      upcomingEventTable.appendChild(row);
    }

  })
  .catch(function (error) {
    console.error("Error al obtener los datos:", error);
  });



