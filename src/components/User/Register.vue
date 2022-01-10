<template>
  <v-container>
    <v-row row v-if="error" align="center" justify="center">
      <v-col sm="4" xs="12">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-col>
    </v-row>
    <v-row  class="fill-height my-auto" align="center" justify="center">
      <v-col sm="4" xs="12">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark tile>
            <v-toolbar-title>تسجيل</v-toolbar-title>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              top
              color="green"
            ></v-progress-linear>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onRegister">
                <v-col xs="12">
                  <v-text-field
                    label="الايميل"
                    v-model="email"
                    type="email"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="الاسم"
                    v-model="name"
                    type="text"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="الموبايل"
                    v-model="phone"
                    type="text"
                  ></v-text-field>
                  <v-select
                    label="الجنس"
                    v-model="gender"
                    :items="genders"
                     item-text="text"
                     item-value="value"
                    type="text"
                  ></v-select>
                  <v-select
                    label="اللغة"
                    v-model="lang"
                      :items="langs"
                        item-text="text"
                     item-value="value"
                    type="text"
                  ></v-select>

                  <v-text-field
                    label="كلمة المرور"
                    v-model="password"
                    type="password"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="تأكيد كلمة المرور"
                    v-model="password_confirmation"
                    type="password"
                    :rules="[comparePasswords]"
                  ></v-text-field>

                  <v-btn dark color="primary" type="submit" :loading="loading"
                    >تسجيل</v-btn
                  >
                </v-col>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      name: "",
      phone: "",
      gender: "",
      lang: "",
      password: "",
      password_confirmation: "",
      langs:['ar','en'],
      genders:[{ text: 'ذكر', value: 1 },{ text: 'انثى', value: 2 }],
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.password_confirmation
        ? "Passwords do not match."
        : true;
    },
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
          this.$cookies.set('user',value)
          this.$router.push("/");
      }
    },
  },
  methods: {
    onRegister() {
      this.$store.dispatch("Register", {
        email: this.email,
        name: this.name,
        phone: this.phone,
        gender: this.gender,
        lang: this.lang,
        password: this.password,
        password_confirmation: this.password_confirmation,
      });
    },
    onDismissed() {
      this.$store.dispatch("clearError");
    },
  },
};
</script>
