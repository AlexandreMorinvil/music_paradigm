<template>
	<div class="content">
		<div class="main-area">
			<login-prompt-component />
		</div>
		<application-footer-component />
	</div>
</template>

<script>
import ApplicationFooterComponent from '@/components/application-component/application-footer.component.vue';
import LoginPromptComponent from '@/components/application-component/login-prompt.component.vue';

export default {
	components: {
		ApplicationFooterComponent,
		LoginPromptComponent,
	},
};
</script>

<style scoped>
.content {
	display: grid;
	justify-content: center;
	align-content: center;
	height: 100%;
	width: 100%;

	grid-template-columns: 1fr;
	grid-template-rows: 1fr auto;
}

.main-area {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
