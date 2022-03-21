module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Alegreya Sans', 'sans-serif']
			}
		},
	},
	plugins: [
		require('daisyui')
	],
	daisyui: {
		themes: ['halloween']
	},
};
