export default {
    removeFromUsersListTableSelection(state, idsList) {
        state.usersListTableSelection.removeIfIn(idsList);
    },
};