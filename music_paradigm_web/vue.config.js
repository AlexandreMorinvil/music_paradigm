module.exports = {
    // Options...
    configureWebpack: {
		devtool: 'source-map',
	},

    devServer: {
		disableHostCheck: true,
	},

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: false
      }
    }
};
