<template>
    <WidgetSubsectionContainer title="Progression Details">
         <div class="centering">
             <UserProgressionDetailsFieldsetComponent />
         </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserProgressionDetailsFieldsetComponent from './user-progression-details-fieldset.component.vue';

export default {
    components: {
        UserProgressionDetailsFieldsetComponent,
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
