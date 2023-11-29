
async function crearEvento(contenido, pubkey, kind){
    if (kind == "1"){
        let nostrEvent = {
            kind: 1,
            created_at: Math.floor(Date.now() / 1000),
            tags: [],
            content: contenido,
            pubkey: pubkey,
          };
          nostrEvent.id = window.NostrTools.getEventHash(nostrEvent)
          nostrEvent = await window.nostr.signEvent(nostrEvent)
          let ok = window.NostrTools.validateEvent(nostrEvent)
          let veryOk = window.NostrTools.verifySignature(nostrEvent)
          tarjetaEventos(nostrEvent)
    } else if (kind == "30023"){
        let nostrEvent = {
            kind: 30023,
            created_at: Math.floor(Date.now() / 1000),
            tags: [
                ['d', 'identificador'],
                ['tittle', 'Nombre del articulo'],
                ['summary', 'Resumen del articulo'],
            ],
            content: contenido,
            pubkey: pubkey,
          };
          nostrEvent.id = window.NostrTools.getEventHash(nostrEvent)
          nostrEvent = await window.nostr.signEvent(nostrEvent)
          let ok = window.NostrTools.validateEvent(nostrEvent)
          let veryOk = window.NostrTools.verifySignature(nostrEvent)
          tarjetaEventos(nostrEvent)
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // Busca el botón con el id 'signer'
    const signerButton = document.getElementById('enviar');

    // Agrega un event listener para el evento de clic en el botón
    signerButton.addEventListener('click', async function () {
        try {
        // Aquí puedes ejecutar la acción que deseas cuando se hace clic en el botón
        let user = await window.nostr.getPublicKey()
        const textArea = document.getElementById('contenido');
        const opciones = document.getElementById('opciones');
        const opcion = opciones.value;
        const content = textArea.value;
        console.log(opcion)
        console.log(content)
        console.log(user)
        crearEvento(content, user, opcion)
          
        } catch (error) {
            console.log(error)
        }

    });
});

function tarjetaEventos(event) {
    // Creamos un nuevo div en el DOM para la tarjeta
    const card = document.createElement('div');
    // Añadimos una clase para darle estilos
    card.classList.add('event-card');
    // Creamos un nuevo elemento para el contenido
    const content = document.createElement('code');
    content.textContent = JSON.stringify(event, null, 2);
  
    // Añadimos el contenido a la tarjeta
    card.appendChild(content);
  
    // Agrega la tarjeta al cuerpo del documento
    document.body.appendChild(card);
  }
  