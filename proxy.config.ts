/** Dev server proxy — used only with `ng serve`. */
export default {
	'/api': {
		target: 'http://localhost:8080',
		secure: false,
		changeOrigin: true,
	},
};
