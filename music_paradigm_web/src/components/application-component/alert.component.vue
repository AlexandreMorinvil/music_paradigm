<template>
	<div class="alert position dimentsions" :class="alertMessageClass">
		<div class="type-area" :class="alertTypeClass">
			<strong>{{ alertPrefix }}</strong>
		</div>

		<div class="message-area">{{ alertMessage }}</div>

		<div class="close-button" v-on:click="clearAlert">&times;</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	data() {
		return {
			timeoutUniqueIdentifier: 0,
			timeoutInSeconds: 15,
		};
	},
	computed: {
		...mapGetters('alert', ['hasAlert', 'alertCounter', 'alertType', 'alertMessage']),
		alertTypeClass() {
			switch (this.alertType) {
				case 'success':
					return 'success';
				case 'info':
					return 'information';
				case 'warning':
					return 'warning';
				case 'error':
					return 'error';
				default:
					return 'information';
			}
		},
		alertMessageClass() {
			return this.alertTypeClass + '-message';
		},

		alertPrefix() {
			switch (this.alertType) {
				case 'success':
					return this.$t('application-component.alert.success');
				case 'information':
					return this.$t('application-component.alert.information');
				case 'warning':
					return this.$t('application-component.alert.warning');
				case 'error':
					return this.$t('application-component.alert.error');
				default:
					return this.alertType.toUpperCase(); // This should never happen
			}
		},
	},
	methods: {
		...mapActions('alert', ['clearAlert']),
	},
	beforeDestroy() {
		clearTimeout(this.timeoutUniqueIdentifier);
	},
	watch: {
		alertCounter: {
			immediate: true,
			handler: function (value) {
				if (value) {
					clearTimeout(this.timeoutUniqueIdentifier);
					this.timeoutUniqueIdentifier = setTimeout(this.clearAlert, this.timeoutInSeconds * 1000);
				} else {
					clearTimeout(this.timeoutUniqueIdentifier);
				}
			},
		},
	},
};
</script>

<style scoped>
.alert {
	display: flex;
	align-items: stretch;
	color: rgb(125, 125, 125);
	opacity: 1;
	transition: opacity 0.6s;
	text-align: left;
}

.position {
	position: fixed;
	top: 64px;
	margin: auto;
	left: 5%;
	z-index: 100;
}

.dimentsions {
	width: 90%;
	height: auto;
	border-radius: 2px;
}

.type-area {
	color: white;
	border-radius: 2px 0 0 2px;
	padding: 20px;
	display: inline-block;
	width: auto;
}

.message-area {
	width: 100%;
	padding: 20px;
}

.close-button {
	padding: 10px;
	width: auto;
	color: white;
	font-weight: bold;
	font-size: 1.5em;
	cursor: pointer;
	transition: 0.3s;
}

.success {
	background-color: #4caf50;
}
.information {
	background-color: #2196f3;
}
.warning {
	background-color: #ff9800;
}
.error {
	background-color: #f44336;
}

.success-message {
	background-color: #daffdc;
}
.information-message {
	background-color: #cfeaff;
}
.warning-message {
	background-color: #ffe9c8;
}
.error-message {
	background-color: #ffbeb8;
}

.close-button:hover {
	color: black;
}
</style>
