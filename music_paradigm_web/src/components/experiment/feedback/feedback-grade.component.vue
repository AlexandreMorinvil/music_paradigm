<template>
	<div class="feedback-grade">
		<div class="feedback-grade-name">
			<h1>{{ criteriaName }}</h1>
		</div>

		<div v-if="!hideFeedbackSmiley" class="feedback-grade-emoji">
			<svg class="emoji smile" v-if="isSuccess">
				<use xlink:href="sprites.svg#emoji-smile" />
			</svg>
			<svg class="emoji frown" v-else>
				<use xlink:href="sprites.svg#emoji-frown" />
			</svg>
		</div>

		<div v-if="feedbackNumerical" class="numerical-feedback">
			{{ grade.mark }}
		</div>
		<div v-if="!feedbackNumerical" class="progress-bar">
			<div class="position-wrapper" style="z-index: 1">
				<div class="checkpoint-content checkmark-color" :style="passingWidth"></div>
			</div>
			<div class="progress-content content-color">
				<div :class="'progress-line ' + this.barColor" :style="progressWidth"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	props: {
		grade: {
			type: Object,
			default() {
				return {
					criteria: 'No criteria',
					mark: 0,
					passMark: 60,
					topMark: 100,
				};
			},
		},
	},
	computed: {
		...mapGetters('experiment', ['hideFeedbackSmiley', 'feedbackNumerical']),
		isSuccess() {
			return this.grade.mark >= this.grade.passMark;
		},
		passingWidth() {
			return '--checkpointPosition: ' + (this.grade.passMark / this.grade.topMark) * 100 * 0.955 + '%;';
		},
		progressWidth() {
			return 'width: ' + (Math.min(this.grade.mark, this.grade.topMark) / this.grade.topMark) * 100 + '%;';
		},
		barColor() {
			return this.isSuccess ? ' success-color ' : ' info-color ';
		},
		criteriaName() {
			switch (this.grade.criteria) {
				case 'Sequences Played':
					return this.$tc('experiment.feedback.feedback-grade.sequences-played');
				case 'Melody Accuracy':
					return this.$tc('experiment.feedback.feedback-grade.melody-accuracy');
				case 'Rhythm Accuracy':
					return this.$tc('experiment.feedback.feedback-grade.rhythm-accuracy');
				default:
					return this.grade.criteria;
			}
		},
	},
};
</script>

<style scoped>
.feedback-grade {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-width: 400px;
	height: 100%;
	width: 100%;
	text-align: center;
	color: white;
}
.feedback-grade-name {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: calc(1vh + 1vw);
	height: 15%;
	width: 100%;
	margin-bottom: 10px;
}

.numerical-feedback {
	font-size: calc(2vh + 2vw);
}

.feedback-grade-emoji {
	height: 80%;
	width: 100%;
}

.emoji {
	display: block;
	margin: auto;
	stroke-width: 0;
	height: 100%;
	width: 100%;
}
.smile {
	stroke: rgb(0, 200, 0);
	fill: rgb(0, 200, 0);
}
.frown {
	stroke: rgb(200, 0, 0);
	fill: rgb(200, 0, 0);
}
.progress-bar {
	background-color: rgb(235, 235, 235);
	height: 35px;
	width: 380px;

	margin-top: 2.5%;
	margin-bottom: 2.5%;
	margin-left: auto;
	margin-right: auto;

	border-style: solid;
	border-radius: 3px;
	border-left-width: 5px;
	border-right-width: 5px;
	border-color: rgb(235, 235, 235);
}
.position-wrapper {
	width: inherit;
	position: absolute;
	transform: translate(-5px);
}
.checkpoint-content {
	position: relative;
	border-radius: 100px;
	background-color: inherit;
	height: 60px;
	width: 5px;
	left: var(--checkpointPosition);
	bottom: 15px;
	z-index: inherit;
}
.progress-content {
	background-color: rgb(175, 175, 175);
	margin: auto;
	height: 50%;
	width: 95%;
	border-radius: inherit;
	z-index: 0;
	transform: translate(0, 6px);
}
.progress-line {
	height: 100%;
	width: 95%;
	border-radius: inherit;
}
.content-color {
	background-color: rgb(175, 175, 175);
}
.success-color {
	background-color: rgb(0, 200, 0);
}
.checkmark-color {
	background-color: rgb(0, 150, 0);
}
.info-color {
	background-color: rgb(53, 206, 253);
}
</style>
