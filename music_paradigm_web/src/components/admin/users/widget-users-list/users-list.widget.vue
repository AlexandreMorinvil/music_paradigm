<template>
	<WidgetContentFrameComponent title="Users List">
		<div class="widget widget-bg">
			<UsersListSection />
		</div>
		<UsersListTableComponentCopy />
	</WidgetContentFrameComponent>
</template>

<script>
import '@/styles/widget-template.css';

import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import UsersListSection from './section-users-list/users-list.section.vue';

// TODO: Delete this component when the code will have been adjusted
import UsersListTableComponentCopy from './section-users-list/users-list-table/users-list-table.component copy.vue'; 

export default {
	components: {
		UsersListTableComponentCopy,
		UsersListSection,
		WidgetContentFrameComponent,
	},
};
</script>

<style scoped></style>
