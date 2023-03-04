<template>
    <TemplateFieldsetComponent>
        <TemplateFieldLabelComponent text="Curriculum" />
        <TemplateFieldSelectComponent />
    </TemplateFieldsetComponent>
</template>

<script>

import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/templates/template-field-select.component.vue';

export default {
    components: {
        TemplateFieldsetComponent,
        TemplateFieldLabelComponent,
        TemplateFieldSelectComponent,
    }
};
</script>

<style scoped></style>
