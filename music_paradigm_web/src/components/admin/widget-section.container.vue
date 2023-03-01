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
    display: flex;
    justify-content: right;
}
.title-left-side {
    display: flex;
    justify-content: left;
}
</style>
