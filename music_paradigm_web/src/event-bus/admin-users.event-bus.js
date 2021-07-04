import Vue from 'vue';

export const AdminUsersEventBus = new Vue();

export const adminUsersEvents = {
	SELECTED_USER_CURRICULUM_CHANGED: 'selected-user-curriculum-changed',
};
