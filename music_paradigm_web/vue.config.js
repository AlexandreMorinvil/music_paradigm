module.exports = {
	// Options...
	configureWebpack: {
		devtool: 'source-map',
	},

	devServer: {
		allowedHosts: 'all',
		host: '0.0.0.0',
		port: '8080',
	},

	pluginOptions: {
		i18n: {
			locale: 'en',
			fallbackLocale: 'en',
			localeDir: 'locales',
			enableInSFC: false,
		},
	},
};
