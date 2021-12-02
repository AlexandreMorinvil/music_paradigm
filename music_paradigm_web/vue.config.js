module.exports = {
	// Options...
	configureWebpack: {
		devtool: 'source-map',
	},

	devServer: {
		disableHostCheck: true,
		public: '0.0.0.0:8080',
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
