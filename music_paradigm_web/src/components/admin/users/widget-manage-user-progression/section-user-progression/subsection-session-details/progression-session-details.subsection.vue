<template>
    <WidgetSubsectionContainer title="Session Details">
         <div class="centering">
             <ProgressionSessionDetailsFieldsetComponent />
             <ProgressionSessionCompletionsTableComponent class="margin-top" />
             <ProgressionSessionProgressSavedTableComponent class="margin-top" />
         </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import ProgressionSessionDetailsFieldsetComponent from './progression-session-details-fieldset.component.vue';
import ProgressionSessionCompletionsTableComponent from './progression-session-completions-table.component.vue';
import ProgressionSessionProgressSavedTableComponent from './progression-session-progress-saved-table.component.vue';

export default {
    components: {
        ProgressionSessionCompletionsTableComponent,
        ProgressionSessionDetailsFieldsetComponent,
        ProgressionSessionProgressSavedTableComponent,
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

.margin-top {
    margin-top: 20px;
}
</style>
