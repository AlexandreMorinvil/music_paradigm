<template>
    <div class="widget-subsection">
        <h4 class="title"> {{ title }} </h4>
        <slot />
        <div v-if="hasButtonsArea" class="area-buttons">
            <slot name="buttons" />
        </div>
    </div>
</template>

<script>
import '@/styles/widget-template.css';

export default {
    props: {
        title: "",
    },
    computed: {
        hasButtonsArea() {
            return Boolean(this.$slots.buttons);
        }
    }
};
</script>

<style scoped>
.title {
    text-align: center;
    margin-bottom: 10px;
}

.area-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
}

.area-buttons>button {
    width: 300px;
}
</style>
