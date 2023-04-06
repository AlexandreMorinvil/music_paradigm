<template>
	<button v-show="!mustHide" class="widget-button" :class="{
		[color]: isActive,
		inactive: !isActive || isFrozen,
		activated: isLoading,
		small: isSmall
	}" v-on:click="(event) => handleClick(event)">
		{{ text }}
		<LoaderSuspensionPoints v-if="isLoading" class="button-loader" />
	</button>
</template>

<script>
import '@/styles/field-template.css';

import LoaderSuspensionPoints from '../../visual-helpers/loader-suspension-points.vue'

export default {
	components: {
		LoaderSuspensionPoints
	},
	emits: ['click'],
	props: {
		color: {
			type: String,
			default: 'blue',
		},
		hideIfInactive: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isFrozen: {
			type: Boolean,
			default: false,
		},
		isLoading: {
			type: Boolean,
			default: false,
		},
		isSmall: {
			type: Boolean,
			default: false,
		},
		text: {
			type: String,
			default: '',
		},
	},
	computed: {
		mustHide() {
			return this.hideIfInactive && !this.isActive;	
		},
	},
	methods: {
		handleClick(event) {
			if (!this.isActive) return;
			if (this.isFrozen) return;
			if (this.isLoading) return;
			this.$emit('click', event);
		}
	}
};
</script>

<style scoped>
.widget-button {
	position: relative;
	min-width: auto;
	border-style: solid;
	border-width: 2px;
	border-radius: 5px;
	padding: 10px 10px;
	text-align: center;
	display: inline-block;
	font-size: 1em;
	cursor: pointer;
}

.widget-button.small {
	border-width: 1px;
	border-radius: 2px;
	padding: 5px;
	font-size: 0.8em;
}

/* Blue button */

.widget-button.blue {
	color: white;
	background-color: rgb(0, 0, 120);
	border-color: rgb(0, 0, 140);
}

.widget-button.blue:hover {
	background-color: rgb(0, 0, 100);
	border-color: rgb(0, 0, 120);
}

.widget-button.blue:active,
.widget-button.blue.activated {
	background-color: rgb(0, 0, 80);
	border-color: rgb(0, 0, 100);
}

/* Turquoise button */

.widget-button.turquoise {
	color: white;
	background-color: rgb(0, 120, 120);
	border-color: rgb(0, 140, 140);
}

.widget-button.turquoise:hover {
	background-color: rgb(0, 100, 100);
	border-color: rgb(0, 120, 120);
}

.widget-button.turquoise:active,
.widget-button.turquoise.activated {
	background-color: rgb(0, 80, 80);
	border-color: rgb(0, 100, 100);
}

/* Green button */

.widget-button.green {
	color: white;
	background-color: rgb(0, 120, 0);
	border-color: rgb(0, 140, 0);
}

.widget-button.green:hover {
	background-color: rgb(0, 100, 0);
	border-color: rgb(0, 120, 0);
}

.widget-button.green:active,
.widget-button.green.activated {
	background-color: rgb(0, 80, 0);
	border-color: rgb(0, 100, 0);
}

/* Red button */

.widget-button.red {
	color: white;
	background-color: rgb(120, 0, 0);
	border-color: rgb(140, 0, 0);
}

.widget-button.red:hover {
	background-color: rgb(100, 0, 0);
	border-color: rgb(120, 0, 0);
}

.widget-button.red:active,
.widget-button.red.activated {
	background-color: rgb(80, 0, 0);
	border-color: rgb(100, 0, 0);
}

/* Orange button */

.widget-button.orange {
	color: white;
	background-color: rgb(200, 80, 0);
	border-color: rgb(220, 100, 0);
}

.widget-button.orange:hover {
	background-color: rgb(180, 60, 0);
	border-color: rgb(200, 80, 0);
}

.widget-button.orange:active,
.widget-button.orange.activated {
	background-color: rgb(160, 40, 0);
	border-color: rgb(180, 60, 0);
}

/* Inactive button */

.widget-button.inactive,
.widget-button.inactive:hover,
.widget-button.inactive:active {
	background-color: rgb(160, 160, 160);
	border-color: rgb(180, 180, 180);
	color: grey;
	cursor: default;
	outline: none;
}

/* Loader */
.button-loader {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -25%);
}
</style>
