<template>
	<div id="users-editor" class="widget widget-bg">
		<users-curriculum-form-component class="curticulum-position inner-widget" ref="userCurriculumForm" />
		<users-parameters-form-component class="parameters-position inner-widget" ref="userParametersForm" />
		<users-progression-form-component v-show="mustDisplayProgression" class="progression-position inner-widget" ref="userProgressionForm" />

		<div class="submission-buttons-position">
			<button v-on:click="handleRevert" class="widget-button blue" :class="{ inactive: !isRevertButtonActive }">Revert</button>
			<button v-on:click="submitCurriculumToAssign" class="widget-button green" :class="{ inactive: !isCurriculumAssignmentButtonActive }">
				Assign Curriculum
			</button>
			<button v-on:click="submitParametersToUpdate" class="widget-button blue" :class="{ inactive: !isParametersUpdateButtonActive }">
				Update Parameters
			</button>
			<button v-on:click="submitAdjustmentsToUpdate" class="widget-button blue" :class="{ inactive: !isAdjustmentsUpdateButtonActive }">
				Update Adjustments
			</button>
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';

import { AdminUsersEventBus, adminUsersEvents } from '@/event-bus/admin-users.event-bus.js';
import UsersCurriculumFormComponent from './curriculum/users-curriculum-form.component.vue';
import UsersParametersFormComponent from './parameters/users-parameters-form.component.vue';
import UsersProgressionFormComponent from './progression/users-progression-form.component.vue';

export default {
	components: {
		UsersCurriculumFormComponent,
		UsersParametersFormComponent,
		UsersProgressionFormComponent,
	},
	data() {
		return {
			curriculum: null,
			isRevertButtonActive: false,
			isCurriculumAssignmentButtonActive: false,
			isParametersUpdateButtonActive: false,
			isAdjustmentsUpdateButtonActive: false,
		};
	},
	computed: {
		...mapGetters('users', ['hasSelectedUser', 'userSelectedId', 'userSelectedCurriculum', 'hasCurriculumToSelectedUser']),
		...mapGetters('users/progressions', ['hasProgressionHistory']),
		isCurrentCurriculumAssigned() {
			return this.userSelectedCurriculum === this.curriculum;
		},
		mustDisplayProgression() {
			return this.hasProgressionHistory && this.isCurrentCurriculumAssigned;
		},
	},
	methods: {
		...mapActions('managementCurriculums', ['fetchAllCurriculumHeaders']),
		...mapActions('users', ['assignCurriculum']),
		...mapActions('users/progressions', ['updateParameters', 'updateAdjustments']),
		bundleUserCurriculumInformation() {
			return {
				...this.$refs.userCurriculumForm.bundleCurriculumForm(),
				...this.$refs.userParametersForm.bundleParametersForm(),
			};
		},
		handleRevert() {
			if (!this.isRevertButtonActive) return;
			this.$refs.userCurriculumForm.assignSelectedToForm();
			this.$refs.userParametersForm.assignSelectedToForm();
			this.$refs.userProgressionForm.revert();
		},
		submitCurriculumToAssign() {
			if (!this.isCurriculumAssignmentButtonActive) return;
			const curriculumParameters = this.bundleUserCurriculumInformation();
			this.assignCurriculum({ userId: this.userSelectedId, curriculumParameters: curriculumParameters });
		},
		submitParametersToUpdate() {
			if (!this.isParametersUpdateButtonActive) return;
			const parameters = this.$refs.userParametersForm.bundleParametersForm();
			this.updateParameters({ userId: this.userSelectedId, assignedParameters: parameters });
		},
		submitAdjustmentsToUpdate() {
			if (!this.isAdjustmentsUpdateButtonActive) return;
			const adjustments = this.$refs.userProgressionForm.bundleProgressionAdjustments();
			this.updateAdjustments({ userId: this.userSelectedId, assignedAdjustments: adjustments });
		},
		evaluateAllButtonsActive() {
			const wasCurriculumModified = this.$refs.userCurriculumForm.wasCurriculumModified;
			const wasParametersModified = this.$refs.userParametersForm.wasParametersModified;
			const wasProgressionModified = this.$refs.userProgressionForm.wasProgressionModified;
			this.evaluateIsRevertButtonActive(wasCurriculumModified, wasParametersModified, wasProgressionModified);
			this.evaluateIsAssignCurriculumButtonActive(wasCurriculumModified);
			this.evaluateIsParametersUpdateButtonActive(wasCurriculumModified, wasParametersModified);
			this.evaluateIsAdjustmentsUpdateButtonActive(wasCurriculumModified, wasProgressionModified);
		},
		evaluateIsRevertButtonActive(wasCurriculumModified, wasParametersModified, wasProgressionModified) {
			this.isRevertButtonActive = this.hasSelectedUser && (wasCurriculumModified || wasParametersModified || wasProgressionModified);
		},
		evaluateIsAssignCurriculumButtonActive(wasCurriculumModified) {
			this.isCurriculumAssignmentButtonActive = this.hasSelectedUser && wasCurriculumModified;
		},
		evaluateIsParametersUpdateButtonActive(wasCurriculumModified, wasParametersModified) {
			this.isParametersUpdateButtonActive = this.hasSelectedUser && wasParametersModified && !wasCurriculumModified;
		},
		evaluateIsAdjustmentsUpdateButtonActive(wasCurriculumModified, wasProgressionModified) {
			this.isAdjustmentsUpdateButtonActive = this.hasSelectedUser && wasProgressionModified && !wasCurriculumModified;
		},
		changeCurriculum(curriculum) {
			this.curriculum = curriculum;
		},
	},
	beforeMount() {
		this.fetchAllCurriculumHeaders();
	},
	mounted() {
		this.$watch(() => this.$refs.userCurriculumForm.wasCurriculumModified, this.evaluateAllButtonsActive, { immediate: true });
		this.$watch(() => this.$refs.userParametersForm.wasParametersModified, this.evaluateAllButtonsActive, { immediate: true });
		this.$watch(() => this.$refs.userProgressionForm.wasProgressionModified, this.evaluateAllButtonsActive, { immediate: true });
		AdminUsersEventBus.$on(adminUsersEvents.SELECTED_USER_CURRICULUM_CHANGED, this.changeCurriculum);
	},
	beforeDestroy() {
		AdminUsersEventBus.$off(adminUsersEvents.SELECTED_USER_CURRICULUM_CHANGED, this.changeCurriculum);
	},
};
</script>

<style scoped>
.edition-buttons-position {
	grid-area: edition-btn;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr;
}

.curticulum-position {
	grid-area: curticulum;
}

.parameters-position {
	grid-area: parameters;
}

.progression-position {
	grid-area: progression;
}

.submission-buttons-position {
	grid-area: submission-btn;
	display: grid;
	grid-gap: 15px;
	grid-template-columns: 1fr 1fr 1fr 1fr;
}

.widget {
	grid-template-columns: 100%;
	grid-template-areas:
		'curticulum'
		'parameters'
		'progression'
		'submission-btn';
}
</style>
