import axios from "axios";
import router from "@/router";
const AuthModule = {
  state: {
    user: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    //logIn With Facebook
    logInWithFacebook({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      axios
        .post(
          "https://masael-api.turathalanbiaa.com/api/login-by-facebook", { fb_id: payload.id, fb_name: payload.name },

          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json"

            },
          }

        )

        .then((response) => response.data)
        .then((user) => {
          commit("setLoading", false);
          if (!user.data) {
            commit("setError", user);

          } else {
            commit("setUser", user.data);
          }
        })
        .catch((error) => {
          console.log("Catch")
          commit("setLoading", false);
          commit("setError", error);
        });
    },
    //logIn As Guest
    logInAsGuest({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      axios
        .post(
          "https://masael-api.turathalanbiaa.com/api/login-as-a-guest", {},


          {
            headers: {
              "App-Key": "base64:Y2tVErFFLJMoLA1qnFKt2jLCa6R9UcS7KC5mdC4c8/w=",
              "Language": "ar",
              "Content-Type": "application/json"

            },
          }
        )

        .then((response) => response.data)
        .then((user) => {
          commit("setLoading", false);
          if (!user.data) {
            commit("setError", user);

          } else {
            commit("setUser", user.data);
          }
        })
        .catch((error) => {
          console.log("Catch")
          commit("setLoading", false);
          commit("setError", error);
        });
    },

    //Auto SignIn
    autoSignIn({ commit }, payload) {
      commit("setUser", payload);
    },

    //Logout
    logout({ commit }) {
      window.$cookies.remove('user')
      commit("setUser", null);
      router.push("/login");
    },
  },
};

export default AuthModule;
