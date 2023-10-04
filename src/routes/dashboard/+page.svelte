<script lang="ts">
	import SignedIn from "$lib/components/SignedIn.svelte";
	import { rolesMap } from "$lib/utils";

    let profileModal: HTMLDialogElement;
</script>

<SignedIn let:currentUser>
    <dialog bind:this={profileModal}>
        <button on:click={() => profileModal.close()} class="btn-close"></button>
        <h2>{currentUser.name}</h2>
        <p>
            Email: {currentUser.email} <br>
            Telefone: {currentUser.phone} <br>
            Endereço: {currentUser.address} <br>
            Função: {rolesMap.get(currentUser.role)} <br>
        </p>
        <a href="/register?update">Atualizar</a>
    </dialog>
</SignedIn>

<button on:click={() => profileModal.showModal()} class="btn btn-primary">Ver informações</button>

<style>
</style>