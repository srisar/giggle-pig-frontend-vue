module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['M PLUS 1', 'sans-serif']
			}
		},
		container: {
			center: true,
		}
	},
	plugins: [
		require('daisyui')
	],
	daisyui: {
		themes: ['halloween']
	},
};
