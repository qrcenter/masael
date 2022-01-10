<template>
  <v-app id="inspire">
    <v-app-bar app flat clipped-right color="primary" dark>
      <v-app-bar-nav-icon v-if="userIsAuthenticated" @click="drawer = !drawer">
      </v-app-bar-nav-icon>
      <v-img
        :src="require('@/assets/logo.png')"
        class="ml-2"
        contain
        height="48"
        width="48"
        max-width="48"
        link
        @click="$vuetify.goTo(0)"
      />
      <v-toolbar-title>
        <strong>الأجوبة الميسرة</strong>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field :disabled="tab=='/'||tab=='/posts'?false:true"
        v-if="userIsAuthenticated"
        v-model="searchStr"
        class="mx-4"
        flat
        hide-details
        label="ابحث"
        prepend-inner-icon="mdi-magnify"
        @click:prepend-inner="search()"
         v-on:keyup.enter="search()"
        solo-inverted
      >
        <template  v-slot:append>
          <v-menu style="top: -12px" offset-y max-height="400">
            <template v-slot:activator="{ on, attrs }">
              <v-btn :disabled="tab=='/'?false:true" v-bind="attrs" v-on="on" text dark>
                <v-icon>mdi-filter-menu</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="category in categories.data"
                :key="category.id"
                @click="loadQuestionsByCategories(category.id)"
              >
                <v-list-item-title>{{ category.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-text-field>
      <v-spacer></v-spacer>

      <v-menu
        v-if="userIsAuthenticated"
        transition="slide-x-transition"
        bottom
        right
        max-height="400"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn dark icon v-bind="attrs" v-on="on">
            <v-icon>mdi-view-module</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item  @click="loadQuestionsByType(1)">
            <v-list-item-title>الفقه</v-list-item-title>
          </v-list-item>
          <v-list-item  @click="loadQuestionsByType(2)">
            <v-list-item-title>العقاعد</v-list-item-title>
          </v-list-item>
          <v-list-item  @click="loadQuestionsByType(3)">
            <v-list-item-title>القران الكريم</v-list-item-title>
          </v-list-item>
          <v-list-item  @click="loadQuestionsByType(4)">
            <v-list-item-title>الاجتماعية</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <template v-slot:extension v-if="userIsAuthenticated">
        <v-tabs v-model="tab" centered slider-color="yellow">
          <v-tab to="/"> الاسئلة </v-tab>

          <v-tab to="/posts"> المنشورات </v-tab>
          <v-tab to="/tags"> الاشارات </v-tab>
           <v-tab v-if="!user.isGuest" to="/my-questions"> اسئلتي </v-tab>
        </v-tabs>

        <!-- <v-fab-transition>
          <v-btn v-show="!hidden" fab absolute bottom left>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-fab-transition> -->
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-if="userIsAuthenticated"
      v-model="drawer"
      :mini-variant.sync="mini"
      clipped
      app
      right
    >
      <v-list>
        <v-list-item class="px-2">
          <!-- <v-list-item-avatar>
            <v-icon>mdi-user-circle</v-icon>
          </v-list-item-avatar> -->

          <v-list-item-content>
            <v-list-item-title class="title">
              {{ user.name }}
            </v-list-item-title>
          </v-list-item-content>

          <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list shaped>
        <v-list-item
          v-for="link in drawerLinks"
          :key="link.icon"
          link
          color="primary"
          :to="link.to"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.stop="setSendQuestionDialog">
          <v-list-item-icon>
            <v-icon>mdi-comment-question</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>اسئل سؤال</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>الحساب</v-list-item-title>
          </template>

          <v-list-item @click.stop="setChangeNameDialog">
            <v-list-item-content>
              <v-list-item-title>تغيير الاسم</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="logout()">
            <v-list-item-content>
              <v-list-item-title>تسجيل خروج</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <ask-question />
     <change-name />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <v-footer dark padless clipped-right app>
      <v-card class="flex" flat tile>
        <v-card-title class="primary">
          <strong class="subheading">تواصل معنا على السوشال ميديا.</strong>
          <v-spacer></v-spacer>
          <v-btn v-for="icon in icons" :key="icon" class="mx-4" dark icon>
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="fo py-2 white--text text-center">
          <strong>معهد تراث الانبياء</strong> — {{ new Date().getFullYear() }}
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  components: {
    AskQuestion: () => import("@/components/AskQuestion"),
     ChangeName: () => import("@/components/ChangeName"),
  },
  data: () => ({
    drawer: null,
    mini: false,
    tab: null,
    searchStr:'',
  }),
   watch: {
    user(value) {
     if (value !== null && value !== undefined) {
        this.$store.dispatch("loadCategories");
      }
    },
  },
  computed: {
    drawerLinks() {
      let items = [];
      if (this.user.isGuest) {
        items = [
          { title: "الاسئلة", icon: "mdi-calendar-question", to: "/" },
          { title: "المنشورات", icon: "mdi-post", to: "/posts" },
          { title: "الاشارات", icon: "mdi-tag", to: "/tags" },
        ];
      } else {
        items = [
          { title: "الاسئلة", icon: "mdi-calendar-question", to: "/" },
          { title: "اسئلتي", icon: "mdi-head-question", to: "/my-questions" },
          { title: "المنشورات", icon: "mdi-post", to: "/posts" },
          { title: "الاشارات", icon: "mdi-tag", to: "/tags" },
        ];
      }
      return items;
    },
    icons() {
      let icons = ["mdi-facebook", "mdi-instagram", "mdi-youtube"];
      return icons;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    user() {
      return this.$store.getters.user;
    },
    categories() {
      return this.$store.getters.categories;
    },
  },
  methods: {
    loadCategories() {
      this.$store.dispatch("loadCategories");
    },
    loadQuestionsByCategories(id) {
      this.$store.dispatch("loadQuestionsByCategories", id);
    },
      loadQuestionsByType(id) {
      this.$store.dispatch("loadQuestionsByType", id);
    },
     setSendQuestionDialog() {
      this.$store.commit("setSendQuestionDialog", true);
    },
    setChangeNameDialog() {
      this.$store.commit("setChangeNameDialog", true);
    },
     search() {
       switch (this.tab) {
  
  case '/':
    this.$store.dispatch("search", {
        tab: 1,
        str: this.searchStr, 
      }
      );
    break;
  case '/posts':
    this.$store.dispatch("search", {
        tab: 2,
        str: this.searchStr, 
      }
      );
    break;
}
      
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>