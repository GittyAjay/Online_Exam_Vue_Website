<template>
  <Login />
</template>
<script>
import Login from "./SignIn.vue";
export default {
  components: {
    Login
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    gotoDashboard() {
      this.$router.replace({ name: "Dashboard" });
    }
  }
};
</script>

<style scoped>
</style>
