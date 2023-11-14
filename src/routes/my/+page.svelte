<script>
	import { rolesMap } from '$lib';
	import SignedIn from '$lib/components/SignedIn.svelte';
</script>

<SignedIn let:user>
	<h2>Olá, {user.name}</h2>
	<p>
		Email: {user.email} <br />
		Telefone: {user.phone} <br />
		Endereço: {user.address} <br />
		Função: {rolesMap.get(user.role)}
	</p>
	<div class="button-group">
		<a href="/sign-up" class="button blue">Atualizar</a>
	</div>
</SignedIn>
