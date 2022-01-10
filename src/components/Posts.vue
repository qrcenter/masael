<template>
  <v-container>
       <v-row v-if="!loading&&posts.data==null" align="center" justify="center">
     {{posts.message}}
    </v-row>
    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular
        indeterminate
        color="fo"
      ></v-progress-circular>
    </v-row>
    <v-row v-if="!loading">
      <v-col v-for="post in posts.data" :key="post.id" cols="12">
        <v-card class="mx-auto" elevation="3">
          <v-list-item>
            <v-list-item-avatar color="fo">
              <v-icon dark> mdi-post </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ post.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="body-1 font-weight-black">
            {{ post.content }}
          </v-card-text>

          <v-card-actions> 
              <v-list-item-content>
                <v-list-item-title>
                  <v-chip class="ma-2" color="primary" v-html=" getText(post.type)"> </v-chip>
                </v-list-item-title>
              </v-list-item-content>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="!loading && posts.data != null" class="text-center my-5">
      <v-pagination
        v-model="page"
        :length="posts.max_page"
        :total-visible="8"
        @input="loadPosts()"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Posts",
  data: () => ({
    page: 1,
  }),
  mounted() {
    this.loadPosts();
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    posts() {
      return this.$store.getters.posts;
    },
  },

  methods: {
       getText(val) {
       var text;
      switch (val) {
        case 1:
         text="الفقه";
          break;
        case 2:
          text="العقائد";
          break;
        case 3:
         text="القران الكريم";
          break;
          case 4:
         text="الاجتماعية";
          break;
        default:
          text="الفقه";
      }
      return text;
    },
    loadPosts() {
      this.$store.dispatch("loadPosts", this.page);
    },
  },
};
</script>

   

