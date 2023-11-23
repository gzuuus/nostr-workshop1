<script lang="ts">
    // Definimos userNpub como prop para el componente, asi podremos asignarle diferentes valores, por defecto si no se asigna un valor leera "npub1gzuush..."
    export let userPubKey: string | undefined = "40b9c85fffeafc1cadf8c30a4e5c88660ff6e4971a0dc723d5ab674b5e61b451"
    // Importamos la instancia de ndk
    import ndk from "$lib/stores/ndk";
    import {nip19} from "nostr-tools"
    // Creamos la funcion que obtiene el perfil del usuario
    async function fetchUserProfile() {
        // Instanciamos un nuevo usuario
        let usuario = $ndk.getUser({
            pubkey: userPubKey
        })
        // Usamos el metodo fetchProfile para obtener el perfil
        let perfilUsuario = await usuario.fetchProfile()
        // lo retornamos
        return perfilUsuario
    }
</script>
<!-- 
    Usamos el operador de await de svelte para ejecutar la funcion, y obtener el perfil del usuario, una vez lo obtenemos, lo mostramos
 -->
{#await fetchUserProfile()}
    Cargando...
{:then perfil}
    <div>
        <img src={perfil?.image} alt="Imagen de perfil"/>
        <h2>{perfil?.name}</h2>
        <code>{perfil?.nip05}</code>
        <p>{perfil?.about}</p>
        <section>
            <a class="button" href={perfil?.website} >Website</a> 
            <a class="button" href={`lightning:${perfil?.lud16}`} >Tip me!</a>
            <a class="button" href={`https://njump.me/${nip19.npubEncode(userPubKey || "").toString()}`} target="_blank" >Find me on nostr!</a> 
        </section>
    </div>
{/await}
<!-- Usamos las etiquetas de estilos para definir los mismos en css -->
<style>
    div {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        background-color:bisque;
        border-radius: 1rem;
    }   
    img {
        width: 100px;
        height: 100px;
        border-radius: 1rem;
    }
    section {
        display: flex;
        gap: 1rem;
    }
</style>