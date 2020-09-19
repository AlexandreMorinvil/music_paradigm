<template>
  <div id="users-editor" class="widget widget-box widget-bg">
    <div class="edition-buttons-position">
      <button v-on:click="handleRevert" class="widget-button blue">Revert</button>
      <button v-on:click="handleUnselection" class="widget-button blue">Unselect</button>
    </div>

    <div class="editor-position">
      <div class="user-editor-box-form">
        <form v-on:submit.prevent="doNothing()">
          <div>
            <label for="username">
              Username :
              <span class="selected-user-attribute">{{ userSelectedUsernameDisplay }}</span>
            </label>
            <input
              type="text"
              v-model="username"
              name="username"
              autocomplete="new-username"
              placeholder="Insert new username"
            />
          </div>
          <div>
            <label for="email">
              Email :
              <span class="selected-user-attribute">{{ userSelectedEmailDisplay }}</span>
            </label>
            <input
              type="email"
              v-model="email"
              name="email"
              autocomplete="new-email"
              placeholder="Insert new email"
            />
          </div>
          <div>
            <label for="password">
              Password :
              <span class="selected-user-attribute">{{ userSelectedPasswordDisplay }}</span>
            </label>

            <input
              type="password"
              v-model="password"
              name="password"
              autocomplete="new-password"
              placeholder="Insert new password"
            />
          </div>
          <div class="form-name-row">
            <div>
              <label for="firstName">
                First Name :
                <span class="selected-user-attribute">{{ userSelectedFirstNameDisplay }}</span>
              </label>
              <input
                type="text"
                v-model="firstName"
                name="firstName"
                autocomplete="new-first-name"
                placeholder="Insert new first name"
              />
            </div>
            <div>
              <label for="middleName">
                Middle Name :
                <span
                  class="selected-user-attribute"
                >{{ userSelectedMiddleNameDisplay }}</span>
              </label>
              <input
                type="text"
                v-model="middleName"
                name="middleName"
                autocomplete="new-middle-name"
                placeholder="Insert new middle name"
              />
            </div>
            <div>
              <label for="lastName">
                Last Name :
                <span class="selected-user-attribute">{{ userSelectedLastNameDisplay }}</span>
              </label>
              <input
                type="text"
                v-model="lastName"
                name="lastName"
                autocomplete="new-last-name"
                placeholder="Insert new last name"
              />
            </div>
          </div>
          <div>
            <div class="form-tags">
              <div class="form-tags-input">
                <label for="tags">
                  <button v-on:click="addTag()" class="widget-button blue">Add</button>
                  Tag(s) :
                  <span
                    class="selected-user-attribute"
                  >{{ userSelectedTagsDisplay }}</span>
                </label>
              </div>
              <div v-for="(tag, index) in tags" :key="index" class="form-group-input">
                <button v-on:click="removeTag(index)" class="widget-button small red">Remove</button>
                <input
                  type="text"
                  v-model="tags[index]"
                  name="tags"
                  autocomplete="new-tags"
                  placeholder="Insert new tag name"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="submission-buttons-position">
      <form submit.prevent ref="upload" style="display: none">
        <input
          type="file"
          id="myfile"
          name="myfile"
          v-on:change="handleUploadExperiment"
          ref="fileInput"
        />
      </form>
      <button v-on:click="$refs.fileInput.click()" class="widget-button blue">Upload</button>
      <button v-on:click="submitUserToCreate" class="widget-button green">Create</button>
      <button v-on:click="submitUserToUpdate" class="widget-button blue">Update</button>
      <button v-on:click="submitUserToDelete" class="widget-button red">Delete</button>
    </div>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ExperimentsWorkshopWidget",
  data() {
    return {
      hasFocusedOnUsername: false,
      hasAttemptedSubmit: false,
      id: "",
      username: "",
      password: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      tags: [],
      role: "",
    };
  },
  computed: {
    ...mapGetters("users", [
      "hasSelectedUser",
      "userSelectedId",
      "userSelectedUsername",
      "userSelectedEmail",
      "userSelectedFirstName",
      "userSelectedMiddleName",
      "userSelectedLastName",
      "userSelectedTags",
    ]),
    userSelectedUsernameDisplay() {
      return this.hasSelectedUser ? this.userSelectedUsername || "---" : "";
    },
    userSelectedEmailDisplay() {
      return this.hasSelectedUser ? this.userSelectedEmail || "---" : "";
    },
    userSelectedPasswordDisplay() {
      return this.hasSelectedUser ? "***" : "";
    },
    userSelectedFirstNameDisplay() {
      return this.hasSelectedUser ? this.userSelectedFirstName || "---" : "";
    },
    userSelectedMiddleNameDisplay() {
      return this.hasSelectedUser ? this.userSelectedMiddleName || "---" : "";
    },
    userSelectedLastNameDisplay() {
      return this.hasSelectedUser ? this.userSelectedLastName || "---" : "";
    },
    userSelectedTagsDisplay() {
      if (this.hasSelectedUser) {
        if (this.userSelectedTags.length > 0) {
          let display = "";
          this.userSelectedTags.forEach((element) => {
            display += element + ", ";
          });
          return display.slice(0, -2);
        } else return "---";
      } else return "";
    },
  },
  methods: {
    ...mapActions("users", [
      "unsetSelectedUser",
      "createUser",
      "updateUser",
      "deleteUser",
    ]),
    bundleUserFromForm() {
      return {
        username: this.username,
        password: this.password,
        email: this.email,
        firstName: this.firstName,
        middleName: this.middleName,
        lastName: this.lastName,
        tags: this.tags,
      };
    },
    addTag() {
      this.tags.push("");
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    assignFormId(id) {
      this.id = id;
    },
    assignFormUsername(username) {
      this.username = username;
    },
    assignFormEmail(email) {
      this.email = email;
    },
    assignFormPassword(password) {
      this.password = password;
    },
    assignFormFirstName(firstName) {
      this.firstName = firstName;
    },
    assignFormMiddleName(middleName) {
      this.middleName = middleName;
    },
    assignFormLastName(lastName) {
      this.lastName = lastName;
    },
    assignFormTags(tags) {
      this.tags = Array.isArray(tags) ? JSON.parse(JSON.stringify(tags)) : [];
    },
    assignFormRole(role) {
      this.role = role;
    },
    assignSelectedToForm() {
      this.assignFormId(this.userSelectedId);
      this.assignFormUsername(this.userSelectedUsername);
      this.assignFormEmail(this.userSelectedEmail);
      this.assignFormFirstName(this.userSelectedFirstName);
      this.assignFormMiddleName(this.userSelectedMiddleName);
      this.assignFormLastName(this.userSelectedLastName);
      this.assignFormTags(this.userSelectedTags);
      this.assignFormRole(this.userSelectedRole);
    },
    clearForm() {
      this.assignFormId("");
      this.assignFormUsername("");
      this.assignFormEmail("");
      this.assignFormPassword("");
      this.assignFormFirstName("");
      this.assignFormMiddleName("");
      this.assignFormLastName("");
      this.assignFormTags([]);
      this.assignFormRole("");
    },
    handleRevert() {
      this.assignSelectedToForm();
    },
    submitUserToCreate() {
      const userToCreate = this.bundleUserFromForm();
      this.createUser(userToCreate);
    },
    submitUserToUpdate() {
      const answer = window.confirm(
        "Are your sure you want to edit the user(s)?"
      );
      if (answer) {
        const userToCreate = this.bundleUserFromForm();
        this.updateUser({
          id: this.userSelectedId,
          user: userToCreate,
        }).then(() => this.assignSelectedToForm());
      }
    },
    submitUserToDelete() {
      const answer = window.confirm(
        "Are your sure you want to delete the user(s)?"
      );
      if (answer) {
        this.deleteUser(this.userSelectedId).then(this.clearForm());
      }
    },
    handleUnselection() {
      this.unsetSelectedUser();
      this.clearForm();
    },
    handleUploadExperiment(event) {
      console.log("Todo", event);
    },
  },
  watch: {
    userSelectedId: {
      immediate: true,
      handler: function () {
        this.assignSelectedToForm();
      },
    },
  },
};
</script>

<style scoped>
.submit-position {
  grid-area: submit;
  background-color: darkred;
}

.edition-buttons-position {
  grid-area: edition-btn;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
}

.selection-buttons-position {
  grid-area: selection-btn;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
}

.editor-position {
  grid-area: editor;
  background-color: rgb(40, 40, 40);
  padding: 5px 40px 25px;
  display: grid;
}

.submission-buttons-position {
  grid-area: submission-btn;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.widget {
  grid-template-columns: 100%;
  /* grid-template-rows: 64pxx; */
  grid-template-areas:
    "edition-btn"
    "editor"
    "submission-btn";
}

/* Form  */

.user-editor-box-form label {
  display: block;
  padding: 10px 0;
  font-size: 1em;
}

.user-editor-box-form input {
  display: inline-block;
  min-width: 100%;
  padding: 0.4em 0;
  border-radius: 4px;
  padding-left: 10px;
  font-size: 0.8em;
}

.form-note-text {
  text-align: right;
  font-size: 0.75rem;
  margin: 10px 0 10px;
}

.form-tags {
  display: grid;
  grid-gap: 10px;
  margin-top: 15px;
}

.form-group-input button {
  min-width: auto;
  width: 100px;
}

.form-group-input {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100px auto;
}

.form-name-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.selected-user-attribute {
  color: rgb(24, 210, 24);
}
</style>
