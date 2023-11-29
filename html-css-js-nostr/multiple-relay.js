// Creamos una nueva instancia de Pool de relays
const pool = new window.NostrTools.SimplePool();
// Guardamos una lista de relays en una variable
let relays = ['wss://nos.lol', 'wss://relay.nostr.band']
// Meodo get para obtener el ultimo evento publicado, del tipo perfil
let lastEvent = await pool.get(relays, {
  authors: ['7fa56f5d6962ab1e3cd424e758c3002b8665f7b0d8dcee9fe9e288d7751ac194'],
  kinds: [0],
})
tarjetaPerfil(lastEvent)

// Subscribimos a los eventos de la lista de relays
 let sub = pool.sub(
   relays,
   [
     {
       authors: ['7fa56f5d6962ab1e3cd424e758c3002b8665f7b0d8dcee9fe9e288d7751ac194'],
       kinds: [30023],
       limit: 10,
     },
   ],
 )

 sub.on('event', (event) => {
  // console.log(event)
   tarjetaEventos(event)
 })
 sub.on('eose', (eose) => {
   console.log(eose)
 })
function tarjetaEventos(event) {
  // Creamos un nuevo div en el DOM para la tarjeta
  const card = document.createElement('div');
  // Añadimos una clase para darle estilos
  card.classList.add('event-card');
  // Creamos un nuevo elemento para el contenido
  const title = document.createElement('h3');
  // Buscamos y extraemos el título del articulo a partir de sus tags
  title.textContent = findTag(event, 'title');

  // Creamos un nuevo elemento para el contenido
  const summary = document.createElement('p');
  // Buscamos y extraemos el título del articulo a partir de sus tags
  summary.textContent = findTag(event, 'summary');

  // Creamos un nuevo elemento para añadir un link
  const link = document.createElement('a');
  link.classList.add('button');
  link.href = "https://habla.news/a/" + naddrEncode(event);
  link.textContent = "Ver mas";
  link.target = "_blank";
  

  // Añadimos el contenido a la tarjeta
  card.appendChild(title);
  card.appendChild(summary);
  card.appendChild(link);

  // Agrega la tarjeta al cuerpo del documento
  document.body.appendChild(card);
}

function tarjetaPerfil(event) {
  const objetoEvent = JSON.parse(event.content); 
  // Creamos un nuevo div en el DOM para la tarjeta
  const card = document.createElement('div');
  // Añadimos una clase para darle estilos
  card.classList.add('profile-card');
  // Creamos un nuevo elemento para la imagen
  const img = document.createElement('img');
  img.src = objetoEvent.picture;
  // Creamos un nuevo elemento para el nombre
  const title = document.createElement('h2');
  title.textContent = objetoEvent.name;
  // Creamos un nuevo elemento para la biografia
  const content = document.createElement('p');
  content.textContent = objetoEvent.about;

  // Creamos un nuevo elemento para lightning
  const link = document.createElement('a');
  link.classList.add('button');
  link.href = "lightning:" + objetoEvent.lud16;
  link.textContent = "Tip me ⚡";
  link.target = "_blank";

  // Añadimos el contenido a la tarjeta
  card.appendChild(img);
  card.appendChild(title);
  card.appendChild(content);
  card.appendChild(link);

  // Agrega la tarjeta al cuerpo del documento
  document.body.appendChild(card);
}

// Funcion para encontrar el valor de un tag para un clave dada
function findTag (event, tagKey) {
  return event.tags.find(([clave]) => clave === tagKey).slice(1)
}

// Funcion para codificar los eventos en naddr para poder referenciarlos, y abrirlos en otros clientes
function naddrEncode(event) {
  let naddr = {
    identifier: findTag(event, 'd'),
    relays,
    pubkey: event.pubkey,
    kind: event.kind,
  };
  return window.NostrTools.nip19.naddrEncode(naddr);
}