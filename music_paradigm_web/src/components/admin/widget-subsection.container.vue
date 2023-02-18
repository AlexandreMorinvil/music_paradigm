<template>
    <div class="widget-subsection">
        <h4 class="title"> {{ title }} </h4>
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
    margin-bottom: 5px;
}
</style>
