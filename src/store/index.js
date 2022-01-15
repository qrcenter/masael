import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import AuthModule from "./AuthModule";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: AuthModule,
  },
  state: {
    questions: [],
    myQuestions: [],
    question:null,

    sendQuestion:null,
    sendQuestionDialog: false,
    sendQuestionLoading:false,
    likeQuestion:null,
    changeName:null,
    changeNameDialog:false,
   changeNameLoading:false,

    posts: [],
    tags: [],
    categories: [],
    loading: false,
    error: null,
  },
  getters: {
    questions(state) {
      return state.questions;
    },
    myQuestions(state) {
      return state.myQuestions;
    },
    question(state) {
      return state.question;
    },
    sendQuestion(state) {
      return state.sendQuestion;
    },
    sendQuestionLoading(state) {
      return state.sendQuestionLoading;
    },
    likeQuestion(state) {
      return state.likeQuestion;
    },
    changeName(state) {
      return state.changeName;
    },
    changeNameLoading(state) {
      return state.changeNameLoading;
    },
    posts(state) {
      return state.posts;
    },
    tags(state) {
      return state.tags;
    },
    categories(state) {
      return state.categories;
    },
    loading(state) {
      return state.loading;
    },
    error(state) {
      return state.error;
    },
  },
  mutations: {
    setQuestions(state, payload) {
      state.questions = payload;
    },
    setMyQuestions(state, payload) {
      state.myQuestions = payload;
    },
    setQuestion(state, payload) {
      state.question = payload;
    },
    setSendQuestion(state, payload) {
      state.sendQuestion = payload;
    },
    setSendQuestionDialog(state, payload) {
      state.sendQuestionDialog = payload
    },
    setSendQuestionLoading(state, payload) {
      state.sendQuestionLoading = payload;
    },
    setLikeQuestion(state, payload) {
      state.likeQuestion = payload;
    },
    setChangeName(state, payload) {
      state.changeName = payload;
    },
    setChangeNameDialog(state, payload) {
      state.changeNameDialog = payload
    },
    setChangeNameLoading(state, payload) {
      state.changeNameLoading = payload;
    },
    
  
    setPosts(state, payload) {
      state.posts = payload;
    },
    setTags(state, payload) {
      state.tags = payload;
    },
    setCategories(state, payload) {
      state.categories = payload;
    },

    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },

  actions: {
    //Questions
    loadQuestions(context, payload) {
      context.commit("setLoading", true);
      const token = context.getters.user.accessToken;
      axios
        .get(
          "https://masael-api.turathalanbiaa.com/api/questions?noOfItems=25&?page=" + payload,
          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )

        .then((response) => response.data)
        .then((questions) => {
          context.commit("setLoading", false);
          context.commit("setQuestions", questions);
        })
        .catch((error) => {
          console.log(error);
        });
    },

     //My Questions
     loadMyQuestions(context, payload) {
      context.commit("setLoading", true);
      const token = context.getters.user.accessToken;
      axios
        .get(
          "https://masael-api.turathalanbiaa.com/api/questions/mine?page="+ payload +"&noOfItems=25" ,
          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )

        .then((response) => response.data)
        .then((questions) => {
          context.commit("setLoading", false);
          context.commit("setMyQuestions", questions);
        })
        .catch((error) => {
          console.log(error);
        });
    },

      //Question
      loadQuestion(context, payload) {
        context.commit("setLoading", true);
        const token = context.getters.user.accessToken;
        axios
          .get(
            "https://masael-api.turathalanbiaa.com/api/questions/" +payload,
            {
              headers: {
                "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
                "Language": "ar",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
              },
            }
          )
  
          .then((response) => response.data)
          .then((question) => {
            context.commit("setLoading", false);
            context.commit("setQuestion", question);
          })
          .catch((error) => {
            console.log(error);
          });
      },

    //Send Question
    postSendQuestion(context, payload) {
      context.commit("setSendQuestionLoading", true);
      const token = context.getters.user.accessToken;
      axios
        .post(
          "https://masael-api.turathalanbiaa.com/api/questions/send",
          {
            lang: payload.lang,
            content: payload.content,
            privacy: payload.privacy,
            type: payload.type, 
          },
          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )

        .then((response) => response.data)
        .then((question) => {
          context.commit("setSendQuestion", question);
          context.commit("setSendQuestionLoading", false);
          context.commit("setSendQuestionDialog", false);
          
        })
        .catch((error) => {
          console.log(error)
        });
    },
        //Change Name
        postChangeName(context, payload) {
          context.commit("setChangeNameLoading", true);
          const token = context.getters.user.accessToken;
          axios
            .post(
              "https://masael-api.turathalanbiaa.com/api/users/change-name",
              {
                lang: payload.lang,
                name: payload.name,
               
              },
              {
                headers: {
                  "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
                  "Language": "ar",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + token,
                },
              }
            )
    
            .then((response) => response.data)
            .then((user) => {
              context.commit("setChangeName", user);
              context.commit("setChangeNameLoading", false);
              context.commit("setChangeNameDialog", false);
              context.commit("setUser", user.data);
              window.$cookies.set('user',user.data);
              
            })
            .catch((error) => {
              console.log(error)
            });
        },
//Questions By Type
loadQuestionsByType(context, payload) {
  context.commit("setLoading", true);
  const token = context.getters.user.accessToken;
  axios
    .get(
      "https://masael-api.turathalanbiaa.com/api/questions?type=" + payload,
      {
        headers: {
          "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
          "Language": "ar",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token,
        },
      }
    )
    .then((response) => response.data)
    .then((questions) => {
      context.commit("setLoading", false);
      context.commit("setQuestions", questions);
    })
    .catch((error) => {
      console.log(error);
    });
},

    //Categories
    loadCategories(context) {
      const token = context.getters.user.accessToken;
      axios
        .get(
          "https://masael-api.turathalanbiaa.com/api/categories",
          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )

        .then((response) => response.data)
        .then((categories) => {
          context.commit("setCategories", categories);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //Questions By Categories
    loadQuestionsByCategories(context, payload) {
      context.commit("setLoading", true);
      const token = context.getters.user.accessToken;
      axios
        .get(
          "https://masael-api.turathalanbiaa.com/api/categories/" + payload,
          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )
        .then((response) => response.data)
        .then((questions) => {
          context.commit("setLoading", false);
          context.commit("setQuestions", questions);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    //likeQuestion
    likeQuestion(context,payload) {
      const token = context.getters.user.accessToken;
      axios
        .post(
          "https://masael-api.turathalanbiaa.com/api/questions/like",
          {
            question: payload.question,
            like: payload.like,
          },
          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )

        .then((response) => response.data)
        .then((likeQuestion) => {
          console.log(likeQuestion)
          context.commit('setLikeQuestion',likeQuestion)
        })
        .catch((error) => {
          console.log(error);
        });
    },
        //Posts
        loadPosts(context, payload) {
          context.commit("setLoading", true);
          const token = context.getters.user.accessToken;
          axios
            .get(
              "https://masael-api.turathalanbiaa.com/api/posts?noOfItems=25&?page=" + payload,
              {
                headers: {
                  "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
                  "Language": "ar",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + token,
                },
              }
            )
            .then((response) => response.data)
            .then((posts) => {
              context.commit("setLoading", false);
              context.commit("setPosts", posts);
            })
            .catch((error) => {
              console.log(error);
            });
        },
    //Tags
    loadTags(context, payload) {
      context.commit("setLoading", true);
      const token = context.getters.user.accessToken;
      axios
        .get(
          "https://masael-api.turathalanbiaa.com/api/tags/" + payload,
          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
          }
        )
        .then((response) => response.data)
        .then((tags) => {
          context.commit("setLoading", false);
          context.commit("setTags", tags);
        })
        .catch((error) => {
          console.log(error);
        });
    },
      //Search
      search(context, payload) {
        context.commit("setLoading", true);
        const token = context.getters.user.accessToken;
        console.log(payload.str)
        axios
          .get(
            "https://masael-api.turathalanbiaa.com/api/search?tab=" + payload.tab + "&q=" + payload.str,
            {
              headers: {
                "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
                "Language": "ar",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
              },
            }
          )
          .then((response) => response.data)
          .then((result) => {
            context.commit("setLoading", false);
            switch (payload.tab) {
              case 1:
                context.commit("setQuestions", result);
                break;
              case 2:
                context.commit("setPosts", result);
                break;
               
            }
           
          })
          .catch((error) => {
            console.log(error);
          });
      },
   
    //Clear Error
    clearError({ commit }) {
      commit('clearError')
    },
  },
});
