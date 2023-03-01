import { User } from "@/modules/users";

export default {
	setUserSelection(state, user) {
		state.selectionUser = new User(user);
	},

	unsetUserSelection(state) {
		state.selectionUser = new User();
	},
};