// chat.js - Módulo de chat en tiempo real para Lotería Mexicana

// Inicializa el chat en tiempo real y renderiza mensajes en el contenedor
window.initRealtimeChat = function({ salaId, chatMessagesId, chatFormId, chatInputId, playerName, avatarId }) {
  const chatMessages = document.getElementById(chatMessagesId);
  const chatForm = document.getElementById(chatFormId);
  const chatInput = document.getElementById(chatInputId);
  const chatRef = firebase.database().ref(`salas/${salaId}/chat`);

  // Renderizar mensajes nuevos
  chatRef.off();
  chatRef.limitToLast(40).on('child_added', function(snapshot) {
    const msg = snapshot.val();
    if (!msg || !chatMessages) return;
    let avatar = window.getAvatarById(msg.avatarId || 1);
    let name = msg.name || 'Jugador';
    const div = document.createElement('div');
    div.innerHTML = `<span style="color:${avatar.color};font-weight:bold;"><i class="${avatar.icono}"></i> ${name}:</span> <span style="color:#fff;">${msg.text}</span>`;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  // Enviar mensajes
  if (chatForm && chatInput) {
    chatForm.onsubmit = function(e) {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      chatRef.push({
        name: playerName || 'Jugador',
        text: text,
        avatarId: avatarId || 1,
        timestamp: Date.now()
      });
      chatInput.value = '';
    };
  }
};
