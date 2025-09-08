// rondas.js - Módulo de lógica de rondas y ganador para Lotería Mexicana

// Escucha y actualiza el estado de la ronda en la UI en tiempo real
definirRondaListener = function({ rondaStatusId }) {
  const rondaStatus = document.getElementById(rondaStatusId);
  firebase.database().ref('game/ronda').on('value', function(snapshot) {
    if (rondaStatus) {
      rondaStatus.textContent = (snapshot.val() === 'segunda') ? 'Segunda' : 'Primera';
    }
  });
};

// Escucha y muestra el mensaje de ganador con avatar y nombre
definirGanadorListener = function({ winnerTextId, winnerAnnouncementId }) {
  const winnerText = document.getElementById(winnerTextId);
  const winnerAnnouncement = document.getElementById(winnerAnnouncementId);
  firebase.database().ref('game/winner').on('value', function(snapshot) {
    if (snapshot.exists()) {
      const winnerData = snapshot.val();
      let mensajeGanador = "";
      let avatarHtml = "";
      let avatar = window.getAvatarById(winnerData.avatarId || winnerData.avatar || 1);
      if (winnerData.player === 'cantor') {
        mensajeGanador = "¡Felicidades! ¡Has ganado!";
        avatarHtml = `<span style='color:${avatar.color};font-size:2.2rem;vertical-align:middle;'><i class='${avatar.icono}'></i></span> `;
      } else {
        const winnerName = winnerData.name || winnerData.player;
        avatarHtml = `<span style='color:${avatar.color};font-size:2.2rem;vertical-align:middle;'><i class='${avatar.icono}'></i></span> `;
        mensajeGanador = `¡${avatarHtml}${winnerName} ha ganado!`;
      }
      // Añadir detalles del patrón si están disponibles
      if (winnerData.patron) {
        if (winnerData.patron.includes('horizontal')) {
          const fila = parseInt(winnerData.patron.split('-')[1]) + 1;
          mensajeGanador += ` con línea horizontal ${fila}`;
        } else if (winnerData.patron.includes('vertical')) {
          const columna = parseInt(winnerData.patron.split('-')[1]) + 1;
          mensajeGanador += ` con línea vertical ${columna}`;
        } else if (winnerData.patron === 'diagonal-principal') {
          mensajeGanador += " con diagonal principal";
        } else if (winnerData.patron === 'diagonal-secundaria') {
          mensajeGanador += " con diagonal secundaria";
        } else if (winnerData.patron === 'cuatro-esquinas') {
          mensajeGanador += " con cuatro esquinas";
        } else if (winnerData.patron.includes('cuadrado')) {
          const partes = winnerData.patron.split('-');
          const fila = parseInt(partes[1]) + 1;
          const columna = parseInt(partes[2]) + 1;
          mensajeGanador += ` con cuadrado (fila ${fila}, columna ${columna})`;
        } else if (winnerData.patron === 'carton-lleno') {
          mensajeGanador += " con cartón lleno";
        }
      }
      if (winnerText) winnerText.innerHTML = mensajeGanador;
      if (winnerAnnouncement) winnerAnnouncement.style.display = 'block';
    } else {
      if (winnerAnnouncement) winnerAnnouncement.style.display = 'none';
    }
  });
};
