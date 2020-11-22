<template>
  <div>
    <component
      :is="type"
      :message="message"
      v-on:advanceButtonClicked="emitAdvanceSignal"
      v-on:skipButtonClicked="emitSkipSignal"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FootnoteSimple from '@/components/experiment/footnote/FootnoteSimple.vue';

export default {
  name: 'Footnote',
  components: {
    footnoteSimple: FootnoteSimple,
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
      this.$emit('skipButtonClicked');
    },
  },
};
</script>

<style scoped></style>
