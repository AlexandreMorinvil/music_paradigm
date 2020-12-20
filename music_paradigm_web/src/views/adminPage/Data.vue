<template>
  <admin-page-context title="Data">
    <widget-context title="Not Implemented Yet">
      <div class="widget widget-box widget-bg">
        Interface to visualize the data and log files from the experiments
      </div>
    </widget-context>
  </admin-page-context>
</template>

<script>
import AdminPageContext from'@/components/admin/AdminPageContext.vue';
import WidgetContext from'@/components/admin/WidgetContext.vue';

import'@/styles/widgetTemplate.css';

export default{
	'name': 'AdminData',
	'components': {
		'AdminPageContext': AdminPageContext,
		'WidgetContext': WidgetContext
	}
};
</script>

<style scoped></style>
