import { visit } from 'unist-util-visit';

const copyIcon = {
	type: 'element',
	tagName: 'svg',
	properties: {
		xmlns: 'http://www.w3.org/2000/svg',
		width: '20',
		height: '20',
		viewBox: '0 0 20 20',
		fill: 'none'
	},
	children: [
		{
			type: 'element',
			tagName: 'path',
			properties: {
				d: 'M6.99976 9C6.99976 7.89543 7.89519 7 8.99976 7H14.9998C16.1043 7 16.9998 7.89543 16.9998 9V15C16.9998 16.1046 16.1043 17 14.9998 17H8.99976C7.89519 17 6.99976 16.1046 6.99976 15V9Z',
				fill: '#97979B'
			}
		},
		{
			type: 'element',
			tagName: 'path',
			properties: {
				d: 'M4.99976 3C3.89519 3 2.99976 3.89543 2.99976 5V11C2.99976 12.1046 3.89519 13 4.99976 13L4.99976 5H12.9998C12.9998 3.89543 12.1043 3 10.9998 3H4.99976Z',
				fill: '#97979B'
			}
		}
	]
};

export function rehypeCopyButton() {
	return (tree) => {
		visit(tree, 'element', (node, index, parent) => {
			if (node.tagName === 'pre' && Array.isArray(node.children)) {
				const className = node.properties?.className?.find((cls) => cls.startsWith('language-'));
				let languageTitle = className ? className.replace('language-', '') : 'text';
				languageTitle = languageTitle === 'bash' ? 'terminal' : languageTitle;
				languageTitle = languageTitle === 'md' ? 'markdown' : languageTitle;

				const wrapper = {
					type: 'element',
					tagName: 'div',
					properties: {
						class:
							'code-block mb-6 relative overflow-hidden border rounded-lg border-neutral-200 dark:border-neutral-700'
					},
					children: [
						{
							type: 'element',
							tagName: 'div',
							properties: {
								class:
									'flex items-center justify-between bg-[#F4F4F7] dark:bg-[#2c2c2f] px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300'
							},
							children: [
								{
									type: 'element',
									tagName: 'span',
									properties: {
										class:
											'bg-neutral-300 dark:bg-neutral-700 px-2 py-1 font-normal rounded text-xs'
									},
									children: [{ type: 'text', value: languageTitle }]
								},
								{
									type: 'element',
									tagName: 'button',
									properties: {
										class:
											'copy-button text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-opacity',
										'aria-label': 'Copy code',
										onclick: 'copyCode(this)'
									},
									children: [copyIcon]
								}
							]
						},
						node
					]
				};

				if (
					!tree.children.some(
						(child) => child.tagName === 'script' && child.properties?.id === 'copy-script'
					)
				) {
					tree.children.push({
						type: 'element',
						tagName: 'script',
						properties: { id: 'copy-script' },
						children: [
							{
								type: 'text',
								value: `
                                function copyCode(button) {
                                    const pre = button.closest(".code-block").querySelector("pre");
                                    if (!pre) return;

                                    const code = pre.querySelector("code");
                                    if (code) {
                                        navigator.clipboard.writeText(code.innerText);
                                    }
                                }
                            `
							}
						]
					});
				}

				parent.children[index] = wrapper;
			}
		});
	};
}
