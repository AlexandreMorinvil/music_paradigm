<template>
    <WidgetSectionContainer title="Commands">
        <div class="spaced-buttons">
            <ButtonCreateUserComponent />
            <ButtonUpdateUserComponent />
            <ButtonDeleteUserComponent />
        </div>
    </WidgetSectionContainer>
</template>

<script>
import '@/styles/widget-template.css';
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonCreateUserComponent from '../buttons/button-create-user.component.vue';
import ButtonDeleteUserComponent from '../buttons/button-delete-user.component.vue';
import ButtonUpdateUserComponent from '../buttons/button-update-user.component.vue'

export default {
    components: {
        ButtonCreateUserComponent,
        ButtonDeleteUserComponent,
        ButtonUpdateUserComponent,
        WidgetSectionContainer,
    },
};
</script>

<style scoped>
.spaced-buttons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
}

button {
    width: 300px;
}
</style>
