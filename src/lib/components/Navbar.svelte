<script lang="ts">
	import { page } from '$app/stores';
	import { rolesMap } from '$lib/utils';
	import Modal from './Modal.svelte';
	import SignedIn from './SignedIn.svelte';
	import SignedOut from './SignedOut.svelte';

	const items = [
		{ name: 'Home', href: '/' },
		{ name: 'Lojas', href: '/shops' },
		{ name: 'Produtos', href: '/products'},
		{ name: 'Carrinho', href: '/cart' },
		{ name: 'Sobre', href: '/about' }
	];

	$: isCurrent = (href: string) => {
		if (href === '/') return $page.url.pathname === href;
		return $page.url.pathname.startsWith(href);
	};

	let showProfileModal = false;
</script>

<SignedIn let:currentUser>
	<Modal on:close={() => (showProfileModal = false)} showModal={showProfileModal}>
		<h2>Olá, {currentUser.name}</h2>
		<p>
			Email: {currentUser.email} <br />
			Telefone: {currentUser.phone} <br />
			Endereço: {currentUser.address} <br />
			Função: {rolesMap.get(currentUser.role)} <br />
		</p>
		<a href="/register?update" class="btn btn-link">Atualizar</a>
	</Modal>
</SignedIn>

<nav class="navbar navbar-expand-lg">
	<div class="container-fluid">
		<a class="navbar-brand" href="/"> Marilandense </a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNavAltMarkup"
			aria-controls="navbarNavAltMarkup"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarNavAltMarkup">
			<ul class="navbar-nav me-auto">
				{#each items as item}
					<li class="nav-item">
						<a
							class="nav-link"
							class:disabled={item.href === '/dashboard' && !$page.data.currentUser}
							class:active={isCurrent(item.href)}
							aria-current={isCurrent(item.href) && 'page'}
							href={item.href}
						>
							{item.name}
						</a>
					</li>
				{/each}
			</ul>
			<div class="d-inline">
				<SignedIn let:signOut>
					<button on:click={() => (showProfileModal = true)} class="btn btn-dark">
						<i class="fa fa-user" />
					</button>
					<button on:click={signOut} class="btn btn-outline-dark" type="submit">Sair</button>
				</SignedIn>
				<SignedOut>
					<a class="btn btn-dark" href="/login">Entrar</a>
					<a class="btn btn-outline-dark" href="/register">Registrar</a>
				</SignedOut>
			</div>
		</div>
	</div>
</nav>
