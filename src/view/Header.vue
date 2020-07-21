<template>
  <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
    <div class="container">
      <router-link to="/" class="navbar-brand"><b-img src="/logo.png" style="width:230px" alt="Responsive image"></b-img></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto"></ul>

        <ul class="navbar-nav ml-auto">
          <template v-if="user">
            <b-avatar class="mr-2"></b-avatar>
            <div class="nav-item p-2">{{user.email}}</div>
            <li class="nav-item">
              <b-button ml-4 pill @click.prevent="signOut">Sign out</b-button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import firebase from "firebase";
export default {
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: "Home"
          });
        });
    }
  }
};
</script>
