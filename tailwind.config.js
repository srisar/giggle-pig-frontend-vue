module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				'sans': ['Cantarell', 'sans-serif']
			}
		},
		container: {
			center: true,
		},
		/*fontWeight: {
			normal: 400,
			bold: 400,
		}*/
	},
	plugins: [
		require('daisyui')
	],
	daisyui: {
		themes: [
			'corporate'
		]
	},
};
