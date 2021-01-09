<template>
	<div class="page-grid">
		<header class="area-title">
			<h1>{{ title }}</h1>
		</header>
		<div class="area-separation"></div>

		<main class="area-user-main widget widget-bg">
			<div class="page-content">
				<slot> Page to be implemented </slot>
			</div>
		</main>
	</div>
</template>

<script>
import '@/styles/widget-template.css';

export default {
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
	grid-template-rows: auto auto 1fr;
	grid-template-areas:
		'title'
		'separation'
		'main';
	height: 100%;
}

.area-title {
	grid-area: title;
	display: block;
	padding: 20px;
	background-color: rgb(15, 15, 15);
	color: rgb(230, 230, 230);
	text-align: center;
}

.area-title h2 {
	font-size: 1em;
}

.area-separation {
	background-color: rgb(45, 45, 45);
	height: 10px;
}

.area-user-main {
	grid-area: main;
	display: block;
}

.page-content {
	background-color: rgb(50, 50, 50);
	border: 2px solid rgb(40, 40, 40);
	box-shadow: 5px 10px 8px black;
	padding: 20px;
	height: 100%;
	width: 100%;
}
</style>
