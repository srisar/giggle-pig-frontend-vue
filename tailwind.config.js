module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Catamaran', 'sans-serif']
			}
		},
	},
	plugins: [
		require('daisyui')
	],
	daisyui: {
		darkTheme: 'forest',
	},
};
