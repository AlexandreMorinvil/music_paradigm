<template>
	<file-browser :axiosConfig="{ baseURL: 'http://localhost:4000' }" />
</template>

<script>
import FileBrowser from 'vuetify-file-browser';

export default {
	components: {
		FileBrowser,
	},
};
</script>
