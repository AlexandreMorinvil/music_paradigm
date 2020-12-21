/* eslint-disable max-len */
<template>
	<user-page-context title="Before Starting">
		<div>
			When pressing this button pts come to a page with an image of the MIDI-keyboard attached to a computer, and a

			<br />
			<br />text: “Please attach the MIDI-keyboard to your computer using the USB-chord and place it so you can play it comfortably. When done, press
			the button below”.
			<br />
			<br />
			button below reads “Test keyboard”.
			<br />
			<br />When this button is pressed a page opens with the keyboard displayed, and the relevant keys highlighted (in yellow).
			<br />
			<br />There is a text above the keyboard • “Please press all highlighted keys and adjust the volume to an appropriate level. You will need to
			test all highlighted keys before you can move on to today’s training.”
			<br />
			<br />Below the keyboard there is an informational text reading:
			<br />
			<br />“If key presses do not register andthere is no audio: o Leave the test (button below); make sure the MIDI-keyboard is attached to the
			computer and run the test again.”
			<br />
			<br />“If key presses register (keys turn blue), but there is no audio:
			<br />
			<br />Check computer audio using the volume slider/control panel on your computer.
			<br />
			<br />If computer audio is functional and there is still no audio when using the keyboard, try leaving the test, reattaching the keyboard, and
			running the test again.”  Below the informational text there are two buttons that reads • “Leave test”. This takes you back to the intro page.
			<br />
			<br />“Continue to today’s training”. This takes you to the training.
		</div>
	</user-page-context>
</template>

<script>
import UserPageContext from '@/components/user/user-page-context.vue';

export default {
	name: 'UserExperiments',
	components: {
		UserPageContext: UserPageContext,
	},
};
</script>

<style scoped></style>
