<template>
  <v-container>
    <v-dialog v-model="sendQuestionDialog" width="400">
      <v-card>
        <v-toolbar dens nav dark color="primary">
          <strong class="pt-1 px-2">اسئل سؤال</strong>
          <v-spacer></v-spacer>

          <v-btn text @click.stop="sendQuestionDialog = false"
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
          <form @submit.prevent="postSendQuestion">
            <v-text-field
              name="content"
              label="السؤال"
              id="content"
              v-model="content"
              type="text"
              required
            ></v-text-field>
            <v-select
              v-model="type"
              :items="typeItems"
              item-text="text"
              item-value="val"
              label="النوع"
              persistent-hint
              return-object
              single-line
            ></v-select>
            <v-select
              v-model="privacy"
              :items="privacyItems"
              item-text="text"
              item-value="val"
              label="الخصوصية"
              persistent-hint
              return-object
              single-line
            ></v-select>
            <v-btn color="primary" class="mr-4" type="submit" :loading="loading"
              >ارسال</v-btn
            >
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div class="text-center">
      <v-snackbar
        v-model="sendQuestionStatus"
        :timeout="timeout"
        @input="clear()"
      >
        {{ sendQuestionContent.message }}

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
      langItems: [
        { text: "عربي", val: "ar" },
        { text: "English", val: "en" },
      ],
      typeItems: [
        { text: "الفقه", val: "1" },
        { text: "العقائد", val: "2" },
        { text: "القرأن الكريم", val: "3" },
        { text: "الأجتماعية", val: "4" },
      ],
      privacyItems: [
        { text: "عام", val: "1" },
        { text: "خاص", val: "2" },
      ],
      lang: "",
      content: "",
      type: "",
      privacy: "",
      rules: [(value) => !value],
      snackbar: false,
      timeout: 3000,
    };
  },
  computed: {
    sendQuestionStatus() {
      if (
        this.$store.getters.sendQuestion !== null &&
        this.$store.getters.sendQuestion !== undefined
      )
        return true;
      else return false;
    },
    sendQuestionContent() {
      if (
        this.$store.getters.sendQuestion !== null &&
        this.$store.getters.sendQuestion !== undefined
      )
        return this.$store.getters.sendQuestion;
      else return "";
    },
    loading() {
      return this.$store.getters.sendQuestionLoading;
    },
    sendQuestionDialog: {
      get() {
        return this.$store.state.sendQuestionDialog;
      },
      set(val) {
        this.$store.commit("setSendQuestionDialog", val);
      },
    },
  },
  methods: {
    clear() {
      (this.lang = "ar"),
        (this.content = ""),
        (this.type = ""),
        (this.privacy = "");
      this.$store.commit("setSendQuestion", null);
    },
    postSendQuestion() {
      this.$store.dispatch("postSendQuestion", {
        lang: "ar",
        content: this.content,
        type: this.type.val,
        privacy: this.privacy.val,
      });
    },
  },
};
</script>
