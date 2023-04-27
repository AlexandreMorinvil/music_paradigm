<template>
	<div class="template-field-input-area" v-on:focus="activateEditor">
		<input class="input-spacing" :class="{
			'edited-text': mustHighlightIfChanged && isEdited,
			'invalid-input': isInvalid,
		}" :value="valueToDisplay" v-on:input="(event) => edit(event)" v-on:click="activateEditor" v-bind="inputAttributes"
			readonly />
		<div v-show="isActive" class="duration-input-tooltip">
			<fieldset>
				<label for="weeks"> Weeks </label>
				<input name="weeks" type="number" min="0" placeholder="Weeks" v-model="weeks" ref="weeks"
					@focus="() => focusWeeks = true" @blur="() => focusWeeks = false" />
				<label for="days"> Days </label>
				<input name="days" type="number" min="0" max="6" placeholder="Days" v-model="days"
					@focus="() => focusDays = true" @blur="() => focusDays = false" />
				<label for="hours"> Hours </label>
				<input name="hours" type="number" min="0" max="23" placeholder="Hours" v-model="hours"
					@focus="() => focusHours = true" @blur="() => focusHours = false" />
				<label for="minutes"> Minutes </label>
				<input name="minutes" type="number" min="0" max="59" placeholder="Minutes" v-model="minutes"
					@focus="() => focusMinutes = true" @blur="() => focusMinutes = false" />
				<label for="seconds"> Seconds </label>
				<input name="seconds" type="number" min="0" max="59" placeholder="Seconds" v-model="seconds"
					@focus="() => focusSeconds = true" @blur="() => focusSeconds = false" />
			</fieldset>
		</div>
	</div>
</template>

<script>
import '@/styles/field-template.css';

import { durationHandler } from '@/_helpers';

export default {
	emits: ['edit'],
	props: {
		expectedValue: {
			type: null,
			default: null,
		},
		inputAttributes: {
			type: Object,
			default() {
				return {
					type: 'text',
					name: 'input',
					autocomplete: 'off',
					placeholder: ''
				}
			}
		},
		isNullValid: {
			type: Boolean,
			default: true,
		},
		mustHighlightIfChanged: {
			type: Boolean,
			default: true,
		},
		value: {
			type: null,
			default: null,
		},
	},
	data() {
		return {
			isActive: false,
			focusWeeks: false,
			focusDays: false,
			focusHours: false,
			focusMinutes: false,
			focusSeconds: false,
		};
	},
	computed: {
		weeks: {
			get() {
				const { weeks } = durationHandler.parsedDuration(this.value);
				return weeks;
			},
			set(newValue) {
				const { weeks, ...restOfDurationComponents } = durationHandler.parsedDuration(this.value);
				const newDuration = durationHandler.constructDuration({ weeks: newValue, ...restOfDurationComponents });
				this.edit(newDuration);
			}
		},
		days: {
			get() {
				const { days } = durationHandler.parsedDuration(this.value);
				return days;
			},
			set(newValue) {
				const { days, ...restOfDurationComponents } = durationHandler.parsedDuration(this.value);
				const newDuration = durationHandler.constructDuration({ days: newValue, ...restOfDurationComponents });
				this.edit(newDuration);
			}
		},
		hours: {
			get() {
				const { hours } = durationHandler.parsedDuration(this.value);
				return hours;
			},
			set(newValue) {
				const { hours, ...restOfDurationComponents } = durationHandler.parsedDuration(this.value);
				const newDuration = durationHandler.constructDuration({ hours: newValue, ...restOfDurationComponents });
				this.edit(newDuration);
			}
		},
		minutes: {
			get() {
				const { minutes } = durationHandler.parsedDuration(this.value);
				return minutes;
			},
			set(newValue) {
				const { minutes, ...restOfDurationComponents } = durationHandler.parsedDuration(this.value);
				const newDuration = durationHandler.constructDuration({ minutes: newValue, ...restOfDurationComponents });
				this.edit(newDuration);
			}
		},
		seconds: {
			get() {
				const { seconds } = durationHandler.parsedDuration(this.value);
				return seconds;
			},
			set(newValue) {
				const { seconds, ...restOfDurationComponents } = durationHandler.parsedDuration(this.value);
				const newDuration = durationHandler.constructDuration({ seconds: newValue, ...restOfDurationComponents });
				this.edit(newDuration);
			}
		},
		focus() {
			return this.focusWeeks || this.focusDays || this.focusHours || this.focusMinutes || this.focusSeconds;
		},
		hasExpectedValue() {
			return this.expectedValue !== null;
		},
		hasNoValue() {
			return this.value === null || this.value === undefined || this.value === '';
		},
		isEdited() {
			return this.hasExpectedValue && this.value !== this.expectedValue;
		},
		isInvalid() {
			return this.hasNoValue && !this.isNullValid;
		},
		valueToDisplay() {
			return this.formatDurationNumbers(Number(this.value));
		},
	},
	methods: {
		activateEditor() {
			this.isActive = true;
			this.$nextTick(() => {
				this.$refs.weeks.focus();
			});
		},
		deactivateEditorIfLostFocus() {
			if (!this.focus) this.isActive = false;
		},
		formatDurationNumbers(durationInMilliseconds) {
			if (!durationHandler.isDurationValid(durationInMilliseconds)) return null;
			let { weeks, days, hours, minutes, seconds } = durationHandler.parsedDuration(durationInMilliseconds);
			weeks = weeks.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: false });
			days = days.toLocaleString('en-US', { minimumIntegerDigits: 1, useGrouping: false });
			hours = hours.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
			minutes = minutes.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
			seconds = seconds.toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
			return `${weeks}w. ${days}d. ${hours}h. ${minutes}m. ${seconds}s.`;
		},
		edit(newDuration) {
			this.$emit('edit', newDuration);
		},
	},
	watch: {
		focus() {
			// This trick is used to detect the loss of focus of the duration editor. When clicking from one input to 
			// another, there is a brief instant where both inputs lose focus before the focus is then transfered to the
			// last clicked input field. This brief moment where no element has a focus would make the duration editor 
			// to disappear. In order to avoid this issue, the setTimeout with an arbitrarily small amount of time 
			// allows the application to overlook this brief moment where no element has focus. 
			setTimeout(this.deactivateEditorIfLostFocus, 1);
		}
	},
};
</script>

<style scoped>
.template-field-input-area {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 1fr;
	position: relative;
}

input {
	width: 100%;
}

.duration-input-tooltip {
	position: absolute;
	background-color: rgb(240, 240, 240);
	border: 2px solid rgb(230, 230, 230);
	border-radius: 5px;
	padding: 10px;
	top: 100%;
	z-index: 2;
}

fieldset {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 10px;
	border: none;
}

label {
	display: flex;
	align-items: center;
}

fieldset>input {
	text-align: center;

}
</style>
