<template>
  <div id="app">
    <img id='rest-img' :src="apiUrl+'/static/'+picName" alt="Rest"/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from '@/config';

export default {
  name: 'Rest',
  components: {
  },
  computed: {
    ...mapState([
      'starteds',
      'experiment'
    ]),
  },
  data() {
    return {
      apiUrl: config.apiUrl,
      picName: "",
      current: {}
    }
  },
  methods: {
    ...mapActions([
      'initState',
      'onNext'
    ]),
  },
  watch: {
    // press any piano keys to continue
    starteds() {
      if (this.starteds.length > 0 && !this.current.hasOwnProperty('timeoutInSeconds')) {
        this.onNext();
        this.picName = this.experiment.picName;
      }
    }
  },
  mounted() {
    this.initState();
    this.picName = this.experiment.picName;
    
    this.current = this.experiment.flow[this.experiment.nextFlowIndex];
    // to avoid waiting for last trial of the block (to be modified)
    if (!this.current.hasOwnProperty("followedBy")
    && this.experiment.currentBlockNum !== 0
    && this.experiment.currentBlockNum === this.experiment.totalBlockNum) {
      this.onNext();
      this.picName = this.experiment.picName;
    }
    // timeout to continue
    else 
    if (this.current.hasOwnProperty('timeoutInSeconds')) {
      window.setTimeout(() => {
        this.onNext();
        this.picName = this.experiment.picName;
      }, this.current.timeoutInSeconds * 1000);
    }

    
  }
}
</script>

<style scoped>
img {
  max-height: 100%;
  width: auto;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
