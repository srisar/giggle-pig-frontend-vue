module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Fredoka', 'sans-serif']
			}
		},
		fontWeight: {
			bold: 500,
			normal: 400
		}
	},
	plugins: [
		require('daisyui')
	],
	daisyui: {
		darkTheme: 'business',
	},
};
