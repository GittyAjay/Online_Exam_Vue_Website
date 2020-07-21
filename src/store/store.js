import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { db } from '@/plugins/firebase'
import firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    db: firebase.firestore(),
    user: null,
    newExam: {},
    newExamId: {},
    exams:[],
  },
  getters: {
    getUser: state => {
      return state.user;
    }
  },
  mutations: {
    ...vuexfireMutations,
    
    setUser: state => {
      state.user = firebase.auth().currentUser;
    },

    saveExam(state) {
      db.collection('Exams').doc(state.newExamId).update(state.newExam);
    }
  },
  actions: {
    bindNewExam: firestoreAction(({ bindFirestoreRef, state }) => {
      return bindFirestoreRef('newExam', db.collection('Exams').doc(state.newExamId))
    }),
    bindExam: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('exams', db.collection('Exams').where('status', 'in', ['Published', 'Draft']).orderBy('created', 'desc'))
    }),
  }
})
