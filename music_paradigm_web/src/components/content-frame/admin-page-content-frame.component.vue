<template>
	<div class="page-grid">
		<header class="area-title">
			<h1>{{ title }}</h1>
			<hr />
			<h2>{{ subTitle }}</h2>
		</header>

		<div class="area-separation"></div>

		<main class="area-main">
			<slot> Page to be implemented </slot>
		</main>

		<application-footer> </application-footer>
	</div>
</template>

<script>
import ApplicationFooter from '@/components/application-component/footer.component.vue';

export default {
	components: {
		ApplicationFooter: ApplicationFooter,
	},
	props: {
		title: {
			type: String,
			default() {
				return 'Title';
			},
		},
		subTitle: {
			type: String,
			default() {
				return 'Administrator Management Board';
			},
		},
	},
};
</script>

<style scoped>
.page-grid {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto auto 1fr auto;
	grid-template-areas:
		'title'
		'separation'
		'main'
		'footer';
	height: 100%;
}

.area-title {
	grid-area: title;
	display: block;
	padding: 20px;
	background-color: rgb(15, 15, 15);
	color: rgb(230, 230, 230);
}

.area-title h2 {
	font-size: 1em;
}

.area-separation {
	background-color: rgb(35, 35, 35);
	height: 10px;
}

.area-main {
	grid-area: main;
	display: block;
	background-image: linear-gradient(to bottom right, rgb(20, 20, 2), rgb(0, 0, 0));
}

.area-footer {
	grid-area: footer;
	display: block;
}
</style>
