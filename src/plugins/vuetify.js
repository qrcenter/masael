import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Vuetify);

const opts = {
    rtl:true,
    theme: {
        themes: {
            light: {
                primary: '#A89B00',
                secondary: '#CFBF00',
                accent: '#E6D400',
                fo: '#4581A0',
                bar:'E1E1E1'
               
            },
            dark: {
                primary: '#A89B00',
                secondary: '#CFBF00',
                accent: '#E6D400',
                fo: '#4581A0',
                bar:'E1E1E1'
            
            },
        },
    },
};
    export default new Vuetify(opts)