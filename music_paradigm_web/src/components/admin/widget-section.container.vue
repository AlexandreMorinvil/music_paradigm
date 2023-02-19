<template>
    <div class="widget-section">
        <h3 class="title"> {{ title }} </h3>
        <slot />
    </div>
</template>

<script>
import '@/styles/widget-template.css';

export default {
    props: {
        title: "",
    }
};
</script>

<style scoped>
.title {
    text-align: center;
    margin-bottom: 10px;
}
</style>
