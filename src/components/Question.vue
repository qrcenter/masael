<template>
  <v-container>
    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular indeterminate color="fo"></v-progress-circular>
    </v-row>
    <v-row v-if="!loading">
      <v-col :key="question.data.id" cols="12">
        <v-card class="mx-auto" elevation="3">
          <v-card-title>
            <v-list-item>
              <v-list-item-avatar color="fo">
                <v-icon dark> mdi-account </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ question.data.user }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  question.data.timestamp | moment("dddd, MMMM Do YYYY")
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-title>
          <v-card-text class="body-1 font-weight-black">
           السؤال({{question.data.id}}):
            {{ question.data.content }}
          </v-card-text>
          <v-divider inset></v-divider>
          <v-card-text class="body-1 font-weight-black">
            الجواب:
            {{ question.data.answer }}
          </v-card-text>
          <v-card-actions>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    class="ma-2"
                    color="primary"
                    v-html="getText(question.data.type)"
                  >
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-btn
                  text
                  color="primary"
                  @click="likeQuestion(question.data.id)"
                >
                  <v-icon class="ml-2">{{ likeIcon }} </v-icon>
                </v-btn>
                <v-speed-dial v-model="dialShare" open-on-hover>
                  <template v-slot:activator>
                    <v-btn text color="primary">
                      <v-icon v-if="dialShare">mdi-close</v-icon>
                      <v-icon v-else>mdi-share-variant</v-icon>
                    </v-btn>
                  </template>
                  <v-btn
                    dark
                    fab
                    bottom
                    color="blue"
                    small
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`"
                    target="_blank"
                  >
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn>
                  <!-- <v-btn
                    dark
                    fab
                    bottom
                    color="green"
                    small
                    :href="`https://wa.me/?text=Checkout%20this%20page.%20${pageUrl}`"
                    target="_blank"
                  >
                    <v-icon>mdi-whatsapp</v-icon>
                  </v-btn> -->
                  <v-btn
                    dark
                    fab
                    bottom
                    color="blue"
                    small
                    :href="`https://telegram.me/share/url?url=${pageUrl}`"
                    target="_blank"
                  >
                    <v-icon>fa-telegram</v-icon>
                  </v-btn>
                  <v-btn
                    dark
                    fab
                    bottom
                    color="tertiary"
                    small
                    :href="`mailto:?subject=Awesomeness!&amp;body=Checkout this page!<a href='${pageUrl}'>${pageUrl}</a>`"
                    target="_blank"
                  >
                    <v-icon>mdi-email</v-icon>
                  </v-btn>
                </v-speed-dial>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-snackbar v-model="likeQuestionContent.status" :timeout="timeout" color="fo" dark>
        {{ likeQuestionContent.message }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="likeQuestionContent.status = false">
            اغلاق
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Question",
  data: () => ({
    dialShare: false,
    page: 1,
    snackbar: false,
    timeout: 3000,
    likeIcon: "mdi-heart-outline",
  }),
  props: ["id"],
  mounted() {
    this.loadQuestion();
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    question() {
      return this.$store.getters.question;
    },
    pageUrl() {
      return "https://masael.turathalanbiaa.com" + this.$route.path;
    },
    likeQuestionContent() {
      if (
        this.$store.getters.likeQuestion !== null &&
        this.$store.getters.likeQuestion !== undefined
      )
        return this.$store.getters.likeQuestion;
      else return "";
    },
  },

  methods: {
    getText(val) {
      var text;
      switch (val) {
        case "1":
          text = "الفقه";
          break;
        case "2":
          text = "العقائد";
          break;
        case "3":
          text = "القران الكريم";
          break;
        case "4":
          text = "الاجتماعية";
          break;
        default:
          text = "الفقه";
      }
      return text;
    },
    loadQuestion() {
      this.$store.dispatch("loadQuestion", this.id);
    },
    likeQuestion(question) {
      let like = null;
      if (
        this.$store.getters.likeQuestion !== null &&
        this.$store.getters.likeQuestion !== undefined &&
        this.$store.getters.likeQuestion.message == "تم الاعجاب"
      ) {
        like = 0;
        this.likeIcon = "mdi-heart-outline";
      } else {
        like = 1;
        this.likeIcon = "mdi-heart";
      }
      this.$store.dispatch("likeQuestion", { question: question, like: like });
    },
  },
};
</script>

   

