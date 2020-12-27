<template>
	<div>
		<component class="fill" :is="type" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import FootnoteButton from '@/components/experiment/footnote/FootnoteButton.vue';
import FootnoteSimple from '@/components/experiment/footnote/FootnoteSimple.vue';

export default {
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
	computed: {
		...mapGetters('experiment', ['footnoteType']),
		type() {
			if (this.footnoteType === 'button') return 'footnoteButton';
			else return 'footnoteSimple';
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
