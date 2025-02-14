import { writable } from 'svelte/store';

interface LayoutState {
	isLeftSidebarOpen: boolean;
	isRightSidebarOpen: boolean;
	isMobileMenuOpen: boolean;
}

const createLayoutStore = () => {
	const { subscribe, update, set } = writable<LayoutState>({
		isLeftSidebarOpen: false,
		isRightSidebarOpen: false,
		isMobileMenuOpen: false
	});

	return {
		subscribe,
		toggleLeftSidebar: () =>
			update((state) => ({
				...state,
				isLeftSidebarOpen: !state.isLeftSidebarOpen
			})),
		toggleRightSidebar: () =>
			update((state) => ({
				...state,
				isRightSidebarOpen: !state.isRightSidebarOpen
			})),
		toggleMobileMenu: () =>
			update((state) => ({
				...state,
				isMobileMenuOpen: !state.isMobileMenuOpen
			})),
		closeAll: () =>
			set({
				isLeftSidebarOpen: false,
				isRightSidebarOpen: false,
				isMobileMenuOpen: false
			})
	};
};

export const layoutStore = createLayoutStore();
