<template>
	<div>
		<component class="fill" :is="type" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import FootnoteButtonsComponent from '@/components/experiment/footnote/footnote-buttons.component.vue';
import FootnoteMessageComponent from '@/components/experiment/footnote/footnote-message.component.vue';

export default {
	components: {
		footnoteSimple: FootnoteMessageComponent,
		footnoteButton: FootnoteButtonsComponent,
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
	width: 70%;
	height: 100%;
}
</style>
