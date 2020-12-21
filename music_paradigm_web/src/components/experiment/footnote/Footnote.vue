<template>
	<div>
		<component class="fill" :is="type" :message="message" v-on:advanceButtonClicked="emitAdvanceSignal" v-on:skip-request="emitSkipSignal" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import FootnoteButton from '@/components/experiment/footnote/FootnoteButton.vue';
import FootnoteSimple from '@/components/experiment/footnote/FootnoteSimple.vue';

export default {
	name: 'Footnote',
	components: {
		footnoteSimple: FootnoteSimple,
		footnoteButton: FootnoteButton,
	},
	props: {
		message: {
			type: String,
			default() {
				return '';
			},
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('experiment', ['footnoteType']),
		type() {
			if (this.footnoteType === 'button') return 'footnoteButton';
			else return 'footnoteSimple';
		},
	},
	methods: {
		emitAdvanceSignal() {
			this.$emit('advanceButtonClicked');
		},
		emitSkipSignal() {
			this.$emit('skip-request');
		},
	},
};
</script>

<style scoped>
.fill {
	width: 100%;
	height: 100%;
}
</style>
