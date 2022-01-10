<template>
  <v-container>
    <v-row row v-if="error" align="center" justify="center">
      <v-col sm="4" xs="12">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row class="fill-height" align="center" justify="center">
      <v-col sm="4" xs="12">
        <v-card>
          <v-toolbar color="primary" dense dark flat>
            <strong class="pt-1 px-2">حسابي</strong>
          </v-toolbar>
          <v-card-title>
            <v-list-item>
              <v-list-item-avatar size="70">
                <v-img :src="imageURL"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-file-input
              v-model="img"
              :loading="loadingImg"
              accept="image/*"
              placeholder="اختر صورة"
              prepend-icon="mdi-camera"
            >
              <template v-slot:append-outer>
                <v-icon size="25" @click="changeImage" color="secondary"
                  >mdi-content-save</v-icon
                >
              </template>
            </v-file-input>
            <v-text-field
              v-model="email"
              type="email"
              label="الايميل"
              :loading="loadingEmail"
            >
              <template v-if="!loadingEmail" v-slot:append-outer>
                <v-icon size="25" @click="changeEmail" color="secondary"
                  >mdi-content-save</v-icon
                ></template
              >
            </v-text-field>

            <v-text-field
              v-model="phone"
              type="text"
              label="الموبايل"
              :loading="loadingPhone"
            >
              <template v-if="!loadingPhone" v-slot:append-outer>
                <v-icon size="25" @click="changePhone" color="secondary"
                  >mdi-content-save</v-icon
                ></template
              >
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      imageName: "",
      imageUrl: "",
      imageFile: "",
      chip: true,
      loadingImg: false,
      loadingName: false,
      loadingEmail: false,
      loadingPhone: false,
      img: null,
      imageURL: "",
      name: "",
      email: "",
      phone: "",
      uid: null,
      password: null,
    };
  },
  mounted() {
    let user = this.$store.getters.user;
    this.imageURL = user.image;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
  },
  methods: {
    changeImage() {
      this.loadingImg = true;
    },

    changeName() {
      this.loadingName = true;
    },
    changeEmail() {
      this.loadingEmail = true;
      let token = this.user.access_token;
      axios
        .post(
          "https://edu-api.turathalanbiaa.com/api/profile/change-email",
          {
            email: this.email,
          },
          {
            headers: {
              "App-Key": "base64:/RBhKZzvRM/aowkAQmBI/diaXAQV3cOxzv+jOXHMlmc=",
              Lang: "ar",
              Authorization: "Bearer " + token,
            },
          }
        )

        .then((response) => response.data)
        .then((user) => {
          this.loadingEmail = null;
          user.data.access_token = token;
          this.$cookies.set("user", user.data);
          this.$store.dispatch("autoSignIn", user.data);
        })
        .catch((error) => {
          this.loadingEmail = null;
          this.$store.commit("setError", error);
        });
    },
    changePhone() {
      this.loadingPhone = true;
      let token = this.user.access_token;
      axios
        .post(
          "https://edu-api.turathalanbiaa.com/api/profile/change-phone",
          {
            phone: this.phone,
          },
          {
            headers: {
              "App-Key": "base64:/RBhKZzvRM/aowkAQmBI/diaXAQV3cOxzv+jOXHMlmc=",
              Lang: "ar",
              Authorization: "Bearer " + token,
            },
          }
        )

        .then((response) => response.data)
        .then((user) => {
          this.loadingPhone = null;
          user.data.access_token = token;
          this.$cookies.set("user", user.data);
          this.$store.dispatch("autoSignIn", user.data);
        })
        .catch((error) => {
          this.$store.commit("setError", error);
          this.loadingEmail = null;
        });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>
