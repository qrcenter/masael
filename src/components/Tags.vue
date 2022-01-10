<template>
  <v-container>
    <v-row v-if="loading" align="center" justify="center">
      <v-progress-circular
        indeterminate
        color="fo"
      ></v-progress-circular>
    </v-row>
    <v-row v-if="!loading">
      <v-col v-for="tag in tags.data" :key="tag.id" cols="12">
        <v-card class="mx-auto" elevation="3">
          <v-list-item>
            <v-list-item-avatar color="grey">
              <v-icon dark> mdi-tag </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ tag.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-text class="body-1 font-weight-black">
            {{ tag.content }}
          </v-card-text>

          <v-card-actions> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="!loading" class="text-center my-5">
      <v-pagination
        v-model="page"
        :length="tags.max_page"
        :total-visible="8"
        @input="loadTags()"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "Tags",
  data: () => ({
    page: 1,
  }),
  mounted() {
    this.loadTags();
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    tags() {
      return this.$store.getters.tags;
    },
  },

  methods: {
    loadTags() {
      this.$store.dispatch("loadTags", this.page);
    },
  },
};
</script>

   

