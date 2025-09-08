// presence.js - Módulo de presencia y usuarios conectados para Lotería Mexicana

// Inicializa y mantiene la presencia de un usuario en Firebase
window.setupPresence = function({ salaId, playerId, playerName, avatarId, onDisconnect }) {
  const connectedRef = firebase.database().ref('.info/connected');
  const playerRef = firebase.database().ref(`salas/${salaId}/players/${playerId}`);
  connectedRef.on('value', function(snap) {
    if (snap.val() === true) {
      playerRef.set({
        name: playerName,
        connected: true,
        timestamp: Date.now(),
        avatarId: avatarId || 1
      });
      playerRef.onDisconnect().remove();
      if (typeof onDisconnect === 'function') {
        window.addEventListener('beforeunload', onDisconnect);
      }
    }
  });
};

// Escucha y renderiza la lista de usuarios conectados en un contenedor
window.listenAndRenderUserList = function({ salaId, containerId, currentPlayerId }) {
  const userListContainer = document.getElementById(containerId);
  if (!userListContainer) return;
  firebase.database().ref(`salas/${salaId}/players`).on('value', function(snapshot) {
    const players = snapshot.val() || {};
    // Mostrar cantor primero, luego jugadores
    const cantor = players['cantor'] ? [{ id: 'cantor', ...players['cantor'] }] : [];
    const jugadores = Object.entries(players)
      .filter(([id, p]) => id !== 'cantor')
      .map(([id, p]) => ({ id, ...p }));
    const allPlayers = cantor.concat(jugadores);
    userListContainer.innerHTML =
      '<div style="display:flex;gap:18px;align-items:center;justify-content:center;padding:10px 0 10px 0;flex-wrap:wrap;background:rgba(0,0,0,0.25);border-radius:12px;">' +
      allPlayers.map(p => {
        let avatar = window.getAvatarById(p.avatarId || 1);
        let extraClass = '';
        if (p.id === currentPlayerId) extraClass = ' userlist-me';
        if (p.id === 'cantor') extraClass = ' userlist-cantor';
        let label = p.name || (p.id === 'cantor' ? 'Cantor' : 'Jugador');
        if (p.id === currentPlayerId) label += ' (Tú)';
        if (p.id === 'cantor') label += ' (Cantor)';
        let statusDot = `<span class="connection-dot ${p.connected ? 'dot-connected' : 'dot-disconnected'}" style="margin-right:4px;"></span>`;
        return `<div class="userlist-item${extraClass}" style="display:flex;flex-direction:column;align-items:center;min-width:60px;max-width:80px;">
          <div style="display:flex;align-items:center;gap:2px;">${statusDot}<div class="avatar-icon" style="color:${avatar.color};font-size:2.2rem;"><i class="${avatar.icono}"></i></div></div>
          <div class="avatar-name">${label}</div>
        </div>`;
      }).join('') + '</div>';
  });
};
