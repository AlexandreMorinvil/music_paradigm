<template>
    <WidgetSubsectionContainer title="Session Details">
         <div class="centering">
             <ProgressionSessionDetailsFieldsetComponent />
         </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import ProgressionSessionDetailsFieldsetComponent from './progression-session-details-fieldset.component.vue';

export default {
    components: {
        ProgressionSessionDetailsFieldsetComponent,
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
