<template>
	<button v-if="session.associativeId" class="session-container container-flex" :class="state">
		<h3 class="title-area">{{ title }}</h3>
		<svg id="icon" class="icon icon-area">
			<use :xlink:href="iconReference" />
		</svg>
		<p v-if="hasCaption" class="caption-area">{{ caption }}</p>
	</button>
</template>

<script>
export default {
	data() {
		return {
			isAvailable: false,
			captionType: 'none',
			icon: 'lock',
		};
	},
	props: {
		index: { type: Number, default: -1 },
		session: { type: Object, default: null },
	},
	computed: {
		state() {
			// if (true) return 'unavailable';
			// else if (true) return 'almost-available';
			// else if (true) return 'new-available';
			// else if (true) return 'completed-available';
			// else if (true) return 'completed';
			// else return 'unavailable';
			return 'unavailable';
		},
		title() {
			return this.session.title;
		},
		iconReference() {
			return 'user-sprites.svg#' + this.icon;
		},
		caption() {
			switch (this.captionType) {
				case 'timer-left':
					return 'In X days at Y hours';
				case 'available':
					return 'available';
				default:
					return '';
			}
		},
		hasCaption() {
			return Boolean(this.caption);
		},
	},
	watch: {
		state: {
			immediate: true,
			handler: function (state) {
				switch (state) {
					case 'unavailable':
						this.isAvailable = false;
						this.captionType = 'none';
						this.icon = 'closed-lock';
						break;
					case 'almost-available':
						this.isAvailable = false;
						this.captionType = 'timer-left';
						this.icon = 'icon-clock';
						break;
					case 'new-available':
						this.isAvailable = true;
						this.captionType = 'available';
						this.icon = 'opened-lock';
						break;
					case 'always-available':
						this.isAvailable = true;
						this.captionType = 'available';
						this.icon = 'check-circle';
						break;
					case 'completed':
						this.isAvailable = false;
						this.captionType = 'none';
						this.icon = 'check-circle';
						break;
					default:
						break;
				}
			},
		},
	},
};
</script>

<style scoped>
.session-container {
	width: 180px;
	height: 180px;
	margin: 10px;
	background-color: gray;
	box-shadow: 5px 5px 5px rgb(35, 35, 35);
	border-style: solid;
	border-radius: 10px;
	border-width: 4px;
	text-align: center;
	padding: 5px;
}

.container-flex {
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
}

.title-area {
	grid-area: title;
	flex-basis: 25%;
}

.icon-area {
	grid-area: icon;
	flex-basis: 50%;
}

.caption-area {
	grid-area: caption;
	flex-basis: 25%;
}

.unavailable,
.almost-available {
	background-color: rgb(40, 40, 40);
	border-color: rgb(35, 35, 35);
	color: rgb(80, 80, 80);

	cursor: default;
	outline: none;
}

.new-available {
}

.completed-available {
}

.completed {
}

.label {
	background-color: rgb(40, 40, 40);
	border-color: rgb(35, 35, 35);
	color: rgb(80, 80, 80);
}

.icon {
	background-color: turquoise;
	display: block;
	margin: auto;
	height: 100%;
	width: 100%;
}
</style>
