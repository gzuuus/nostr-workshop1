// Importamos writable de svelte, para guardar un contexto global de NDK, usando una tipologia singlenton
import { writable } from "svelte/store";
// Importamos NDK
import NDK from "@nostr-dev-kit/ndk";
// Definimos los relays por defecto a los que conectaremos
const defaulRelaysUrls: string[] = [
    "wss://relay.nostr.band",
    "wss://nos.lol",
    "wss://relay.damus.io",
];
// Instanciamos NDK
const ndk = new NDK({
    explicitRelayUrls: defaulRelaysUrls,
});
// Nos conectamos 
ndk.connect().then(() => {
    console.log("Conectado!");
});
// Entonces guardamos la instancia de NDK que acabamos de crear, en un contexto global usando writable de svelte store
const ndkStore = writable(ndk);
// Luego exportamos la instancia de NDK por default
export default ndkStore;