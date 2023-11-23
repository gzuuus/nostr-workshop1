<script lang="ts">
    // Importamos la instancia de ndk
    import ndk from "$lib/stores/ndk";
    // Definimos userPubKey como prop para el componente, asi podremos asignarle diferentes valores, por defecto si no se asigna un valor leera "npub1gzuush..."
    export let userPubKey: string = "40b9c85fffeafc1cadf8c30a4e5c88660ff6e4971a0dc723d5ab674b5e61b451"
    // Definimos tambien kind como prop para elegir el tipo de evento de una manera mas flexible
    export let eventKind: number[] | undefined = [1]
    // Importamos algunas utilidades
    import { unixToDate, buildEventPointer } from "$lib/utils/helpers";
    import { goto } from "$app/navigation";
    // Creamos la funcion que obtiene el perfil del usuario
    async function fetchUserEvents() {
        const fetchedEvents = await $ndk.fetchEvents({
            kinds: eventKind,
            authors: [userPubKey!],
            limit: 10
        }, {closeOnEose: true, groupable: false})
        return fetchedEvents
    }
</script>
{#await fetchUserEvents()}
    Cargando..
{:then events} 
    {#each events as event}
        <div>
            {#if event.kind == 30023}
                <h2>{event.tagValue('title')}</h2>
            {/if}
            <p>{event.content}</p>
            <hr/>
            <section>
                <small>{unixToDate(event.created_at)}</small>
                {#if event.kind == 30023}
                <a 
                    class="button" 
                    href={`http://habla.news/a/${buildEventPointer(event)}`} 
                    target="_blank"
                >
                    Ver articulo
                </a>
                {:else if event.kind == 1}
                <a 
                    class="button" 
                    href={`http://njump.me/${buildEventPointer(event)}`} 
                    target="_blank"
                >
                    Ver nota
                </a>
                {/if}
            </section>
        </div>
    {/each}
{/await}

<style>
    div {
        border: 1px solid black;
        padding: 1rem;
        border-radius: 1rem;
    }
    hr {
        border: 1px solid bisque;
        opacity: 0.5;
    }
    p {
        word-wrap: break-word;
    }
    section {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
</style>