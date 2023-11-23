<script lang="ts">
	import ComposeNote from "$lib/components/compose-note.svelte";
	import EventsCard from "$lib/components/events-card.svelte";
    import ProfileCard from "$lib/components/profile-card.svelte";
    
    let sectionToShow:string
    $: sectionToShow = "notes"
</script>
<ProfileCard />
<div>
    <nav>
        <button 
            on:click={() => sectionToShow = "notes"} 
            class="button"
            class:active={sectionToShow == "notes"}
        >
            Notas
        </button>
        <button 
            on:click={() => sectionToShow = "articles"} 
            class="button"
            class:active={sectionToShow == "articles"}
        >
        Articulos
        </button>
        <button 
            on:click={() => sectionToShow = "compose"} 
            class="button"
            class:active={sectionToShow == "compose"}
        >
        Escribir nota
        </button>
    </nav>
</div>

<div class:hidden={sectionToShow != "notes"}>
    <EventsCard eventKind={[1]} />
</div>
<div class:hidden={sectionToShow != "articles"}>
    <EventsCard eventKind={[30023]} />
</div>
<div class:hidden={sectionToShow != "compose"}>
    <ComposeNote/>
</div>

<style>
    nav {
        display: flex;
        gap: 1rem;
    }
    div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>