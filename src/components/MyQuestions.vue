<template>
  <v-container>
    <v-row v-if="!loading&&myQuestions.data==null" align="center" justify="center">
     {{myQuestions.message}}
    </v-row>
    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular
        indeterminate
        color="fo"
      ></v-progress-circular>
    </v-row>
    
    <v-row v-if="!loading&&myQuestions.data!=null">
      <v-col v-for="question in myQuestions.data" :key="question.id" cols="12">
        <v-card class="mx-auto" elevation="3">
          <v-card-title>
            <v-list-item>
              <v-list-item-avatar color="grey">
                <v-icon dark> mdi-account </v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ question.user }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  question.timestamp | moment("dddd, MMMM Do YYYY")
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-card-title>
          <v-card-text class="body-1 font-weight-black">
            السؤال:
            {{ question.content }}
          </v-card-text>
          <v-divider inset></v-divider>
          <v-card-text class="body-1 font-weight-black">
            الجواب:
            {{ question.answer }}
          </v-card-text>
          <v-card-actions>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip
                    class="ma-2"
                    color="primary"
                    v-html="getText(question.type)"
                  >
                  </v-chip>
                </v-list-item-title>
              </v-list-item-content>

              <v-row align="center" justify="end">
                <v-icon
                  class="ml-1"
                  :color="question.noOfLikes ? 'red ' : 'grey'"
                  >{{ question.noOfLikes ? "mdi-heart " : "mdi-heart-outline" }}
                </v-icon>
                <span class="subheading ml-2">{{ question.noOfLikes }}</span>
                <span class="ml-1">·</span>

                <v-btn :to="'/question/' + question.id" fab small text>
                  <v-icon to="/" class="mr-1"> mdi-dots-horizontal </v-icon>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="!loading&&myQuestions.data!=null" class="text-center my-5">
      <v-pagination
        v-model="page"
        :length="myQuestions.max_page"
        :total-visible="8"
        @input="loadMyQuestions()"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MyQuestions",
  data: () => ({
    page: 1,
  }),
  mounted() {
    this.loadMyQuestions();
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    myQuestions() {
      return this.$store.getters.myQuestions;
    },
  },

  methods: {
    getText(val) {
      var text;
      switch (val) {
        case 1:
          text = "الفقه";
          break;
        case 2:
          text = "العقائد";
          break;
        case 3:
          text = "القران الكريم";
          break;
        case 4:
          text = "الاجتماعية";
          break;
        default:
          text = "الفقه";
      }
      return text;
    },
    loadMyQuestions() {
      this.$store.dispatch("loadMyQuestions", this.page);
    },
  },
};
</script>

   

