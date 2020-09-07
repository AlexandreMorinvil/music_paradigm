<template>
  <div>
    Admin Users page
    <widget-context>
      <template v-slot:title>Viewer</template>
      <template v-slot:widget>
        <users-viewer />
      </template>
    </widget-context>
    <widget-context>
      <template v-slot:title>Editor</template>
      <template v-slot:widget>
        <users-editor />
      </template>
    </widget-context>
    <widget-context>
      <template v-slot:title>Board</template>
      <template v-slot:widget>
        <users-table />
      </template>
    </widget-context>
  </div>
</template>

<script>
import WidgetContext from "@/components/admin/WidgetContext.vue";
import UsersViewer from "@/components/admin/users/UsersViewerWidget.vue";
import UsersEditor from "@/components/admin/users/UsersEditorWidget.vue";
import UsersTable from "@/components/admin/users/UsersTableWidget.vue";

// import { mapActions } from "vuex";

export default {
  components: {
    WidgetContext: WidgetContext,
    UsersViewer: UsersViewer,
    UsersEditor: UsersEditor,
    UsersTable: UsersTable,
  },
  // data() {
  //   return {
  //     newUser: {
  //       username: "",
  //       password: "",
  //       experimentFile: "",
  //     },
  //     submitted: false
  //   };
  // },
  // computed: {},
  // methods: {
  //   ...mapActions("account", ["register"]),
  //   initInput() {
  //     this.newUser.username = "";
  //     this.newUser.password = "";
  //   },
  //   handleSubmit() {
  //     this.submitted = true;
  //     // this.$validator.validate().then(valid => {
  //     //     if (valid) {
  //     //         this.register(this.newUser);
  //     //     }
  //     // });
  //     console.log(this.newUser);
  //     if (this.newUser.username != "") {
  //       if (this.newUser.experimentFile == "") {
  //         const user = this.user;
  //         this.register(user);
  //         console.log("register w/o exp");
  //       } else {
  //         this.register(this.user);
  //         console.log("register");
  //       }
  //       this.initInput();
  //     }
  //   },
  // },
  // mounted() {
  //   this.initInput();
  // },
};
</script>

<style scoped>
</style>