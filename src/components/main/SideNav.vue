<template>
  <cv-side-nav-items>
    <cv-side-nav-link v-for="item in  menu" :key="item.route" @click="navigateTo(item.route)">
      <template slot="nav-icon">
        <component v-bind:is="item.icon"></component>
      </template>
      {{ item.name }}
    </cv-side-nav-link>
  </cv-side-nav-items>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menu: [
         { name: "EXAMS", route: "Exam", icon: "Course" },
        // { name: "SUBJECT", route: "subject", icon: 'Bee' },
        { name: "NOTIFICATION", route: "Notification", icon: "Notification" },
      ]
    };
  },
  methods: {
    navigateTo(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>