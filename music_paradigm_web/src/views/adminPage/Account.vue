<template>
  <admin-page-context title="Account">
    <widget-context title="Not Implemented Yet">
      <div class="widget widget-box widget-bg">
        Admin Account page
        <br />
        <br />Hability to change : First name, Middle name, Last Name, Password,
        Email, and username of oneself (The current account, this page is not to
        manipulate other accounts).
      </div>
    </widget-context>
  </admin-page-context>
</template>

<script>
import AdminPageContext from'@/components/admin/AdminPageContext.vue';
import WidgetContext from'@/components/admin/WidgetContext.vue';

import'@/styles/widgetTemplate.css';

export default{
	name: 'AdminAccount',
	components: {
		AdminPageContext: AdminPageContext,
		WidgetContext: WidgetContext
	}
};
</script>

<style scoped></style>
