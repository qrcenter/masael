<template>
  <v-container>
    <v-dialog v-model="changeNameDialog" width="400">
      <v-card>
        <v-toolbar dens nav dark color="primary">
          <strong class="pt-1 px-2">تغيير الاسم</strong>
          <v-spacer></v-spacer>

          <v-btn text @click.stop="changeNameDialog = false"
            ><strong>اغلاق</strong></v-btn
          >
          <v-progress-linear
            :active="loading"
            :indeterminate="loading"
            absolute
            top
            color="fo"
          ></v-progress-linear>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <form @submit.prevent="postChangeName">
            <v-text-field
              name="name"
              label="الاسم"
              id="name"
              v-model="name"
              type="text"
              required
            ></v-text-field>
          
         
            <v-btn color="primary" class="mr-4" type="submit" :loading="loading"
              >ارسال</v-btn
            >
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div class="text-center">
      <v-snackbar
        v-model="changeNameStatus"
        :timeout="timeout"
        @input="clear()"
      >
        {{ changeNameContent.message }}

        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      rules: [(value) => !value],
      snackbar: false,
      timeout: 3000,
    };
  },
  computed: {
    changeNameStatus() {
      if (
        this.$store.getters.changeName !== null &&
        this.$store.getters.changeName !== undefined
      )
        return true;
      else return false;
    },
   changeNameContent() {
      if (
        this.$store.getters.changeName !== null &&
        this.$store.getters.changeName !== undefined
      )
        return this.$store.getters.changeName;
      else return "";
    },
    loading() {
      return this.$store.getters.changeNameLoading;
    },
    changeNameDialog: {
      get() {
        return this.$store.state.changeNameDialog;
      },
      set(val) {
        this.$store.commit("setChangeNameDialog", val);
      },
    },
  },
  methods: {
    clear() {
     
        (this.name = ""),
      
      this.$store.commit("setChangeName", null);
    },
    postChangeName() {
      this.$store.dispatch("postChangeName", {
        lang: "ar",
        name: this.name,
    
      });
    },
  },
};
</script>
