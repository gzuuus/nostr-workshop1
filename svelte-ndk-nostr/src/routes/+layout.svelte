<div>
<slot/>
</div>
<style>
    :global(body) {
        max-width: 1200px;
        margin: auto;
        padding: 1rem;
    }
    :global(.button) {
        border: 1px solid;
        background-color: white;
        border-radius: 1rem;
        padding: 1rem;
        display: block;
        width: fit-content;
        text-decoration: none;
    }
    :global(.button:hover) {
        background-color: bisque;
    }
    :global(.active){
        background-color: bisque;
    }
    :global(.hidden) {
        display: none !important;
    }
    div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>