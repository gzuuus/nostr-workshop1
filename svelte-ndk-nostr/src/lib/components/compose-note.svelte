<script lang="ts">
    import ndk from "$lib/stores/ndk";
    import { NDKEvent, NDKNip07Signer } from "@nostr-dev-kit/ndk";

    let noteContent: string;
    let eventKind: string = "1";

    async function handleSubmit(noteContent: string, eventKind: string) {
        const nostrEvent = new NDKEvent($ndk);
        nostrEvent.content = noteContent;
        nostrEvent.kind = parseInt(eventKind);

        try {
            const signer = new NDKNip07Signer();
            $ndk.signer = signer;
            await nostrEvent.publish().then(() => {
                console.log("event published");
            });
        } catch (error) {
            console.error("error", error);
        }
    }
</script>

<form on:submit|preventDefault={() => handleSubmit(noteContent, eventKind)}>
    <label for="noteContent">Escribe una nota</label>
    <textarea bind:value={noteContent} name="noteContent" id="noteContent" cols="30" rows="10"></textarea>
    <select bind:value={eventKind} name="kind" id="kind">
        <option value="1">Nota</option>
        <option value="30023">Articulo</option>
    </select>
    <button class="button" type="submit">Enviar</button>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    textarea {
        border-radius: 1rem;
        border: 1px solid;
        padding: 1rem;
    }
    select {
        width: fit-content;
    }
</style>