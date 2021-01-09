<template>
	<div class="dimmensions position layout formatting">
		<h2 class="title-area"><span> Issue : </span> {{ title }}</h2>
		<div class="content-area">
			<p class="solution-message-area">Please try the following solution(s) :</p>
			<p v-for="(solution, index) in solutions" :key="index" class="solution">
				<span class="index-square"># {{ index + 1 }}</span>
				<span class="solution-text-space">{{ solution }}</span>
			</p>
			<p class="conclusion">{{ conclusion }}</p>
			<button v-on:click="preceed" class="button-format">{{ button }}</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: 'unspecified',
		},
		solutions: {
			type: Array,
			default: () => ['No solution'],
		},
		conclusion: {
			type: String,
			default: 'If the solution(s) above did not fix the problem:\n Please contact the operator of the platform for further technical support.',
		},
		button: {
			type: String,
			default: 'OK',
		},
	},
	methods: {
		preceed() {
			this.$emit('ok');
		},
	},
};
</script>

<style scoped>
.position {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;
}

.dimmensions {
	border-radius: 10px;
	height: 600px;
	width: 800px;
}

.formatting {
	box-shadow: 0 0 10px black;
	background-color: rgb(240, 160, 40);
	color: white;
	font-size: 1em;
}

.layout {
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'title'
		'content';
}

.title-area {
	grid-area: title;
	border-radius: 10px 10px 0 0;
	background-color: rgb(255, 120, 20);
	padding: 20px 30px;
}

.content-area {
	grid-area: content;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding: 20px;
}

.solution-message-area {
	grid-area: solution-message;
	font-size: 0.8em;
}

.solutios-area {
	text-align: justify;
}

.conclusion {
	font-size: 0.8em;
}

.button-format {
	background-color: rgb(20, 170, 230);
	box-shadow: 0 0 5px rgb(145, 145, 145);
	border-radius: 5px;
	margin-top: 15px;
	padding: 15px;
	height: 1000;
	width: 50%;
}

.solution {
	margin: auto;
	width: 100%;
	text-align: justify;
	display: grid;
	grid-template-columns: 3em 1fr;
}

.index-square {
	width: auto;
	height: 2em;
	background-color: rgb(255, 0, 70);
	border: 3px solid rgb(250, 0, 50);
	padding: 0.2em;
	margin: 10px;
}

.solution-text-space {
	text-align: justify;
	padding: 0 25px;
	margin: auto 0 auto;
}
</style>
