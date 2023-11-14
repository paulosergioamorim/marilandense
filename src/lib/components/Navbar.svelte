<script lang="ts">
	import { page } from '$app/stores';
	import { tooltip } from '$lib';
	import { SignedIn, SignedOut } from '.';

	const items = [
		{ name: 'Início', href: '/' },
		{ name: 'Lojas', href: '/shops' },
		{ name: 'Produtos', href: '/products' },
		{ name: 'Carrinho', href: '/cart' },
		{ name: 'Sobre', href: '/about' }
	];
</script>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="/">Marilandense</a>
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
				{#each items as { name, href }}
					{@const isCurrent =
						href === '/' ? $page.url.pathname === href : $page.url.pathname.includes(href)}
					<li class="nav-item">
						<a
							class="nav-link"
							class:active={isCurrent}
							aria-current={isCurrent ? 'page' : false}
							{href}
						>
							{name}
						</a>
					</li>
				{/each}
			</ul>
			<div class="button-group">
				<SignedIn let:signOut>
					<a class="button green" href="/my" use:tooltip={{ text: 'Conta' }}>
						<i class="fa fa-user" />
					</a>
					<button on:click={signOut} class="button salmon" type="submit">Sair</button>
				</SignedIn>
				<SignedOut>
					<a class="button green" href="/sign-in">Entrar</a>
					<a class="button salmon" href="/sign-up">Registrar</a>
				</SignedOut>
			</div>
		</div>
	</div>
</nav>
<br />
