import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/kit/vite';
export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			edge: false,
			split: false
		})
	}
};
