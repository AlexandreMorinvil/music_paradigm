<template>
	<div class="dimmensions position layout formatting">
		<h2 class="title-area">{{ titleDisplayed }}</h2>
		<div class="content-area">
			<p class="solution-message-area">{{ solutionMessage }} :</p>
			<p v-for="(solution, index) in solutionsDisplayed" :key="index" class="solution">
				<span class="index-square"># {{ index + 1 }}</span>
				<span class="solution-text-space">{{ solution }}</span>
			</p>
			<p class="conclusion">{{ conclusionDisplayed }}</p>
			<button v-on:click="preceed" class="button-format">{{ buttonDisplayed }}</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			default: null,
		},
		solutions: {
			type: Array,
			default: null,
		},
		conclusion: {
			type: String,
			default: null,
		},
		button: {
			type: String,
			default: null,
		},
	},
	computed: {
		titleDisplayed() {
			return this.title ? this.title : this.$t('user.problem-prompt.default.title');
		},
		solutionMessage() {
			const solutionCount = Array.isArray(this.solutions) ? this.solutions.length : 0;
			return this.$tc('user.problem-prompt.default.solution-message', solutionCount);
		},
		solutionsDisplayed() {
			return this.solutions ? this.solutions : [this.$t('user.problem-prompt.default.solution-1')];
		},
		conclusionDisplayed() {
			return this.conclusion ? this.conclusion : this.$tc('user.problem-prompt.default.conclusion', this.solutionsDisplayed.length);
		},
		buttonDisplayed() {
			return this.button ? this.button : this.$t('user.problem-prompt.default.button');
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
	height: 700px;
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
	font-size: 0.9em;
}

.index-square {
	width: auto;
	height: 2em;
	border-radius: 10px;
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
