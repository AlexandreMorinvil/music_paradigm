<template>
	<div data-app class="file-browser-container">
		<file-browser :axiosConfig="axiosConfig" />
	</div>
</template>

<script>
import { authHeader, url } from '@/_helpers';
import FileBrowser from 'vuetify-file-browser';

export default {
	components: {
		FileBrowser,
	},
	data() {
		return {};
	},
	computed: {
		axiosConfig() {
			return {
				baseURL: url.baseUrl(),
				timeout: 10000,
				auth: authHeader(),
			};
		},
	},
};
</script>


<style scoped>
.file-browser-container {
	font-size: 2em;
}
</style>