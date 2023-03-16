<template>
    <div class="widget-section">
        <div class="title-area">
            <div class="title-left-side ">
                <slot name="topLeft" />
            </div>
            <h3 class="title">{{ title }}</h3>
            <div class="title-right-side">
                <slot name="topRight" />
            </div>
        </div>
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
.title-area {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: space-between;
}

.title {
    text-align: center;
    margin-bottom: 10px;
}

.title-right-side {
    gap: 5px;
    display: flex;
    justify-content: right;
}

.title-left-side {
    gap: 5px;
    display: flex;
    justify-content: left;
}

.area-buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
}

.area-buttons > button {
    width: 300px;
}
</style>
