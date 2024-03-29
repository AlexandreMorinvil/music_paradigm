<template>
	<div id="visual-clicker" class="clicker-container">
		<div class="clicker-container-inner-space">
			<ul class="clicker-grid" :class="isLeftHand ? 'left-hand' : 'right-hand'">
				<li class="button-1-area">
					<button class="key" ref="clicker1">{{ textMapping['clicker1'] }}</button>
				</li>
				<li class="button-2-area">
					<button class="key" ref="clicker2">{{ textMapping['clicker2'] }}</button>
				</li>
				<li class="button-3-area">
					<button class="key" ref="clicker3">{{ textMapping['clicker3'] }}</button>
				</li>
				<li class="button-4-area">
					<button class="key" ref="clicker4">{{ textMapping['clicker4'] }}</button>
				</li>
				<li class="button-5-area" :class="isLeftHand ? 'button-5-left-hand' : 'button-5-right-hand'">
					<button class="key" ref="clicker5">{{ textMapping['clicker5'] }}</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			mappingKeyboradToClicker: {},
			highlightedDesignatedAssociatedKeys: [],
			clickerButtons: ['clicker1', 'clicker2', 'clicker3', 'clicker4', 'clicker5'],
		};
	},
	computed: {
		...mapGetters('experiment', [
			'interactiveClicker',
			'interactiveKeyboardTextMapping',
			'keyboardToClickerInputMapping',
			'keyboardToMidiInputMapping',
		]),
		...mapGetters('keyboard', ['currentlyPressedKeyboardKeys', 'referenceKeyboardKeys', 'midiFileTriggeredAssociatedKeys', 'midiFileAssociatedKeys']),
		isLeftHand() {
			return true;
		},
		/**
		 * Mapping { key: button }
		 */
		mustDisplayPressedKeys() {
			return !String(this.interactiveClicker).includes('#');
		},
		mustDisplayLoadedMidiFirstNote() {
			return String(this.interactiveClicker).includes('first');
		},
		mustDisplayReferenceAllKeys() {
			return String(this.interactiveKeyboard).includes('all');
		},
		mustDisplayLoadedMidiAllNotes() {
			return String(this.interactiveClicker).includes('midi');
		},
		numberButtons() {
			return this.clickerButtons.length;
		},
		textMapping() {
			const textMapping = [];
			if (Array.isArray(this.interactiveKeyboardTextMapping))
				for (const index in this.interactiveKeyboardTextMapping) {
					// Get the key
					const currentMidiAssociatedKey = this.midiFileAssociatedKeys[index];

					// Get the text to assign to the key
					const keyTextAssignation = this.interactiveKeyboardTextMapping[index];

					// Assign the key to the button
					const associatedButton = this.mappingKeyboradToClicker[currentMidiAssociatedKey] || 'none';
					textMapping[associatedButton] = keyTextAssignation;
				}
			else if (typeof this.interactiveKeyboardTextMapping === 'object') {
				for (const button in this.interactiveKeyboardTextMapping) {
					// Get the text to assign to the key
					const keyTextAssignation = this.interactiveKeyboardTextMapping[button];
					textMapping[button] = keyTextAssignation;
				}
			} else {
				// Get the key
				const currentMidiAssociatedKey = this.midiFileAssociatedKeys[0];

				// Get the text to assign to the key
				const keyTextAssignation = this.interactiveKeyboardTextMapping;

				// Assign the key to the button
				const associatedButton = this.mappingKeyboradToClicker[currentMidiAssociatedKey] || 'none';
				textMapping[associatedButton] = keyTextAssignation;
			}
			return textMapping;
		},
	},
	methods: {
		assignMapping(keyboardToClickerInputMapping) {
			this.mappingKeyboradToClicker = keyboardToClickerInputMapping || {};
		},
		imposeIndicatedButtons(buttons) {
			this.highlightedDesignatedAssociatedKeys = buttons.map((button) => {
				return this.convertButtonToKeyboardKey(button);
			});
		},
		convertButtonToKeyboardKey(clickerButton) {
			return Object.keys(this.mappingKeyboradToClicker).find((key) => this.mappingKeyboradToClicker[key] == clickerButton);
		},
		designateKeys(keys) {
			if (Array.isArray(keys)) this.highlightedDesignatedAssociatedKeys = keys;
			else this.highlightedDesignatedAssociatedKeys = [keys];
		},
		clearDesignatedKeys() {
			this.highlightedDesignatedAssociatedKeys = [];
		},
		hintAllKeys() {
			const designatedKeys = [];
			for (let index = 0; index < this.referenceKeyboardKeys.length; index++) designatedKeys.push(this.referenceKeyboardKeys[index]);
			this.designateKeys(designatedKeys);
		},
		hintAllNotes() {
			const designatedKeys = [];
			for (let index = 0; index < this.midiFileAssociatedKeys.length; index++) designatedKeys.push(this.midiFileAssociatedKeys[index]);
			this.designateKeys(designatedKeys);
		},
		hintFirstNote() {
			this.designateKeys(this.midiFileAssociatedKeys[0]);
		},
	},
	beforeDestroy() {
		this.clearDesignatedKeys();
	},
	watch: {
		currentlyPressedKeyboardKeys(list) {
			for (const clickerButton of this.clickerButtons) {
				const associatedKey = this.convertButtonToKeyboardKey(String(clickerButton));
				if (this.mustDisplayPressedKeys && list.includes(associatedKey)) {
					this.$refs[String(clickerButton)].classList.add('user-triggered');
				} else this.$refs[String(clickerButton)].classList.remove('user-triggered');
			}
		},
		midiFileTriggeredAssociatedKeys(list) {
			for (const clickerButton of this.clickerButtons) {
				const associatedKey = this.convertButtonToKeyboardKey(String(clickerButton));
				if (list.includes(associatedKey)) this.$refs[String(clickerButton)].classList.add('midi-file-triggered');
				else this.$refs[String(clickerButton)].classList.remove('midi-file-triggered');
			}
		},
		highlightedDesignatedAssociatedKeys(list) {
			for (const clickerButton of this.clickerButtons) {
				const associatedKey = this.convertButtonToKeyboardKey(String(clickerButton));
				if (list.includes(associatedKey)) this.$refs[String(clickerButton)].classList.add('designated');
				else this.$refs[String(clickerButton)].classList.remove('designated');
			}
		},
		highlightedDesignatedKeys(list) {
			for (const clickerButton of this.clickerButtons) {
				const associatedKey = this.convertButtonToKeyboardKey(String(clickerButton));
				if (list.includes(associatedKey)) this.$refs[String(clickerButton)].classList.add('designated');
				else this.$refs[String(clickerButton)].classList.remove('designated');
			}
		},
		midiFileAssociatedKeys: {
			immediate: true,
			handler: function () {
				this.clearDesignatedKeys();
				if (this.mustDisplayLoadedMidiFirstNote) this.hintFirstNote();
				if (this.mustDisplayReferenceAllKeys) this.hintAllKeys();
				if (this.mustDisplayLoadedMidiAllNotes) this.hintAllNotes();
			},
		},
		referenceKeyboardKeys: {
			immediate: true,
			handler: function () {
				this.clearDesignatedKeys();
				if (this.mustDisplayReferenceFirstKey) this.hintFistKey();
				if (this.mustDisplayReferenceAllKeys) this.hintAllKeys();
				if (this.mustDisplayLoadedMidiAllNotes) this.hintAllNotes();
			},
		},
		keyboardToClickerInputMapping: {
			deep: true,
			immediate: true,
			handler: function () {
				this.assignMapping(this.keyboardToClickerInputMapping);
			},
		},
	},
};
</script>

<style scoped>
.clicker-container {
	position: static;
	height: 100%;
	width: 100%;
	max-width: 600px;
	max-height: 450px;
	background: linear-gradient(to bottom right, rgba(230, 230, 230, 0.3), rgba(230, 230, 230, 0)), rgb(215, 215, 200);
	box-shadow: 0 0 10px rgba(0, 0, 0, 1) inset, 0 1px rgba(125, 157, 212, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
	border-radius: 70px;
	padding: 22.5px;
}

.clicker-container-inner-space {
	box-shadow: 0 0 5px rgb(0, 0, 0, 0.3) inset, 0 0 5px rgba(10, 10, 0, 0.25);
	border-radius: 60px;
	height: 100%;
	width: 100%;
}

.left-hand {
	grid-template:
		'.  .  .  .  .  .  .  . '
		'.  .  .  b3 .  .  .  . '
		'.  .  b2 .  b4 .  .  . '
		'.  b1 .  .  .  .  .  . '
		'.  .  .  .  .  b5 b5 . '
		'.  .  .  .  .  .  .  . ';
}

.right-hand {
	grid-template:
		'.  .  .  .  .  .  .  . '
		'.  .  .  .  b3 .  .  . '
		'.  .  .  b4 .  b2 .  . '
		'.  .  .  .  .  .  b1 . '
		'.  b5 b5 .  .  .  .  . '
		'.  .  .  .  .  .  .  . ';
}

.clicker-grid {
	display: grid;
	margin-left: -22.5px;
	height: 100%;
	width: 100%;
	grid-gap: 5px;
	grid-template-columns: repeat(8, calc(100% / 8));
	grid-template-rows: repeat(6, calc(100% / 6));
}

li {
	list-style: none;
}

.key {
	width: 100%;
	height: 100%;
	text-align: center;
	border-radius: 5px;
	flex-grow: 1;
	display: flex;
	justify-content: center;
	align-items: center;
}

.key {
	position: relative;
	color: rgb(209, 210, 212);
	outline: none;
	background-color: rgb(40, 40, 40);
	border: 1px solid rgb(20, 20, 20);
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.65) inset, 0 1px rgba(10, 10, 10, 0.7) inset, 1.5px 1.5px 1.5px rgba(0, 0, 0, 1),
		4px 4px 5px rgba(0, 0, 0, 0.5);
}

.button-1-area {
	grid-area: b1;
	transform: translateY(-70%);
}

.button-2-area {
	grid-area: b2;
	transform: translateY(-50%);
}

.button-3-area {
	grid-area: b3;
	transform: translateY(0%);
}

.button-4-area {
	grid-area: b4;
	transform: translateY(-75%);
}

.button-5-area {
	grid-area: b5;
	width: 120%;
}

.button-5-left-hand {
	transform: translate(-20%, -60%);
}

.button-5-right-hand {
	transform: translate(0, -60%);
}

.designated {
	color: black;
	border: 1px solid rgb(19, 117, 4);
	background: linear-gradient(to bottom, rgb(255, 252, 81) 0%, rgb(222, 219, 0) 100%);
}

.user-triggered {
	color: white;
	border: 1px solid rgb(4, 19, 117);
	background: linear-gradient(to bottom, rgb(0, 187, 255) 0%, rgb(2, 48, 139) 100%);
	box-shadow: none;
}

.midi-file-triggered {
	color: white;
	border: 1px solid rgb(19, 117, 4);
	background: linear-gradient(to bottom, rgb(21, 255, 0) 0%, rgb(9, 139, 2) 100%);
	box-shadow: none;
}
</style>
