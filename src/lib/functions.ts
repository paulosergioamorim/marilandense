import tippy from "tippy.js";

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function tooltip(node: HTMLElement, { text = '' }) {
	const { destroy } = tippy(node, { content: text, animation: 'scale' });

	return {
		destroy
	};
}
