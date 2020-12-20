<template>
<!--
    This page is a buffer page that appears instantaneously between two blocks of a flow.
    The objective of this buffer page is to force Vue to unmount a page and then remount it
    for each block (which would not happen if two consecutive blocks were of the same type).
    The unmounting and remounting of a page will force vue to redo the "mounted" component
    each time we reach a new block, regardless of whether or not we move to twice the same
    type of vue page.
-->
  <div id="transition-state" class="experiment-state-container grid-area-note">
    <div id="text-area" class="experiment-state-division state-division-text"></div>
    <div id="note-area" class="experiment-state-division state-division-text"></div>
  </div>
</template>

<script>
import'@/styles/experimentStateTemplate.css';

export default{
	'name': 'Transition',
	'components': {}
};
</script>

<style scoped>
</style>
