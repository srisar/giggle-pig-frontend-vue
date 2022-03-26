module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Barlow', 'sans-serif']
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
