<template>
    <fieldset class="fieldset-spacing">
        <slot />
    </fieldset>
</template>

<script>
export default {};
</script>

<style scoped>
.fieldset-spacing {
    border-style: none;
    display: grid;
    gap: 4px;
    grid-template-columns: 300px 400px;
}
</style>
