// Inicializamos un relay usando la variable 'relay'
const relay = window.NostrTools.relayInit('wss://relay.nostr.band');

// Mostramos un mensaje por consola cuando el relay se ha conectado o ha fallado la conexión
relay.on('connect', () => {
  console.log(`Conectado a ${relay.url}`);
});

relay.on('error', (error) => {
  console.error(`Error al conectar a ${relay.url}:`, error);
});

// Conectamos al relay de manera asincrona y creamos una subscripicion, despues cuando recibamos un evento lo mostramos por consola, y cuando termine el stream de eventos (EOSE) lo mostramos por consola tambien.
(async () => {
  // Estructura try catch para manejar los errores
  try {
    // Conectamos al relay
    await relay.connect();

    // Creamos una subscripicion usando un filtro donde especificamos autor, tipo de evento (kind) y limite de eventos
    let sub = relay.sub([
      {
        authors: ['40b9c85fffeafc1cadf8c30a4e5c88660ff6e4971a0dc723d5ab674b5e61b451'],
        kinds: [0],
      },
      {
        authors: ['40b9c85fffeafc1cadf8c30a4e5c88660ff6e4971a0dc723d5ab674b5e61b451'],
        kinds: [1],
        limit: 10,
      }
    ]);
    // Mostramos un mensaje por consola cuando recibamos un evento
    sub.on('event', (event) => {
      console.log('Hemos recibido el evento que queríamos:', event);
      if (event.kind === 1) {
        tarjetaEventos(event);
      } else {
        tarjetaPerfil(event);
      }
    });
    // Mostramos un mensaje por consola cuando termine el stream de eventos (EOSE)
    sub.on('eose', () => {
      console.log('Se alcanzó el final del stream de eventos (EOSE).');
      sub.unsub();
    });
  } catch (error) {
    console.error('Hubo un error:', error);
  }
})();

function tarjetaEventos(event) {
  // Creamos un nuevo div en el DOM para la tarjeta
  const card = document.createElement('div');
  // Añadimos una clase para darle estilos
  card.classList.add('event-card');
  // Creamos un nuevo elemento para el contenido
  const content = document.createElement('p');
  content.textContent = event.content;

  // Añadimos el contenido a la tarjeta
  card.appendChild(content);

  // Agrega la tarjeta al cuerpo del documento
  document.body.appendChild(card);
}

function tarjetaPerfil(event) {
  const objetoEvent = JSON.parse(event.content); 
  // Creamos un nuevo div en el DOM para la tarjeta
  const card = document.createElement('div');
  // Añadimos una clase para darle estilos
  card.classList.add('profile-card');
  // Creamos un nuevo elemento para el contenido
  const img = document.createElement('img');
  img.src = objetoEvent.picture;
  const title = document.createElement('h2');
  title.textContent = objetoEvent.name;
  const content = document.createElement('p');
  content.textContent = objetoEvent.about;

  // Añadimos el contenido a la tarjeta
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(content);

  // Agrega la tarjeta al cuerpo del documento
  document.body.appendChild(card);
}
