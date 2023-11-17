// Creamos una nueva instancia de Pool de relays
const pool = new window.NostrTools.SimplePool();
// Guardamos una lista de relays en una variable
let relays = ['wss://nos.lol', 'wss://relay.nostr.band']
// Meodo get para obtener el ultimo evento publicado, del tipo perfil

document.addEventListener('DOMContentLoaded', function () {
    // Busca el botón con el id 'signer'
    const signerButton = document.getElementById('signer');

    // Agrega un event listener para el evento de clic en el botón
    signerButton.addEventListener('click', async function () {
        try{
        // Aquí puedes ejecutar la acción que deseas cuando se hace clic en el botón
        let user = await window.nostr.getPublicKey()
        let lastEvent = await pool.get(relays, {
            authors: [user],
            kinds: [0],
          })
          tarjetaPerfil(lastEvent)
          
        } catch (error) {
            console.log(error)
        }

    });

    const publishButton = document.getElementById('publicar');

    publishButton.addEventListener('click', async function () {
        const textArea = document.getElementById('contenido');
        const content = textArea.value;
        let nostrEvent = {
            kind: 1,
            created_at: Math.floor(Date.now() / 1000),
            tags: [],
            content: content,
            pubkey: await window.nostr.getPublicKey(),
          };
        nostrEvent.id = window.NostrTools.getEventHash(nostrEvent)
        nostrEvent = await window.nostr.signEvent(nostrEvent)
        let ok = window.NostrTools.validateEvent(nostrEvent)
        let veryOk = window.NostrTools.verifySignature(nostrEvent)

        console.log(nostrEvent)
        if (ok && veryOk) {
            try {
                await pool.publish(relays, nostrEvent)
                let event = await pool.get(relays, {
                    ids: [nostrEvent.id],
                })
                tarjetaEventos(event)
                textArea.value = '';
            } catch (error) {
                console.log(error)
            }
        }
    });
});

function tarjetaPerfil(event) {
    const objetoEvent = JSON.parse(event.content);

    // Busca el elemento con el id 'perfil'
    const perfilDiv = document.getElementById('perfil');

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

    // Agrega la tarjeta al div 'perfil'
    perfilDiv.appendChild(card);
}

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
  