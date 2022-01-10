<template>
  <v-container>
    <v-row row v-if="error" align="center" justify="center">
      <v-col sm="3" xs="12">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row class="fill-height" align="center" justify="center">
      <v-col sm="4" md="4" lg="4" xs="12" class="">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark tile>
            <v-toolbar-title>تسجيل دخول</v-toolbar-title>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              color="fo"
            ></v-progress-linear>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card-text class="text-center">
            <div class="my-2">
              <v-btn x-large color="fo" dark @click="logInWithFacebook()">
                <v-icon left> mdi-facebook </v-icon>
                الدخول باستخدام فيس بوك
              </v-btn>
            </div>

            <div class="my-2">
              <v-btn x-large color="fo" dark @click="logInAsGuest">
                <v-icon left> mdi-account-cancel </v-icon>
                الدخول كزائر
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { initFbsdk } from '@/plugins/fb.js'
export default {
  data() {
    return {
    };
  },
  mounted () {
    initFbsdk()
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$cookies.set("user", value);
        this.$router.push("/");
      }
    },
  },
  methods: {
    logInAsGuest() {
      this.$store.dispatch("logInAsGuest");
    },
    logInWithFacebook() {
      var self = this;
      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
              self.getFbUserData();
           
        } else {
          window.FB.login(function (response) {
            if (response.authResponse) {
              self.getFbUserData();
              console.log("You are logged in &amp; cookie set!");
            } else {
               console.log("User cancelled login or did not fully authorize.");
            }
          });
        }
      });
      return false;
    },
    getFbUserData() {
       var self = this;
       window.FB.api('/me', {locale: 'en_US',fields: ['id','name']},function (response) {
              self.$store.dispatch("logInWithFacebook",{id:response.id,name:response.name});
            }
          );
    },
    fbLogout() {
      window.FB.logout(function () {
        console.log("You have successfully logout from Facebook.");
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>