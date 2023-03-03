<template>
    <WidgetSubsectionContainer title="Details">
         <div class="centering">
             <UserDetailsFieldsetComponent />
         </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserDetailsFieldsetComponent from './user-details-fieldset.component.vue';

export default {
    components: {
        UserDetailsFieldsetComponent,
        WidgetSubsectionContainer,
    },
};
</script>

<style scoped>
.centering {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}
</style>
