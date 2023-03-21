<template>
    <WidgetSubsectionContainer title="Session Details">
         <div class="centering">
             <ProgressionSessionDetailsFieldsetComponent />
             <ProgressionSessionCompletionsTableComponent />
         </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import ProgressionSessionDetailsFieldsetComponent from './progression-session-details-fieldset.component.vue';
import ProgressionSessionCompletionsTableComponent from './progression-session-completions-table.component.vue';

export default {
    components: {
        ProgressionSessionCompletionsTableComponent,
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
