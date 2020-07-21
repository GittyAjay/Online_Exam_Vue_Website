<template>
  <div
    class="py-2 align-items-center d-flex"
    @mouseleave="visiblity=false"
    @mouseover="visiblity=true"
  >
    <i class="pr-3" v-if="!visiblity">{{index+1}}</i>
    <i class="fa fa-align-justify handle pr-3" v-if="visiblity"></i>
    <span class="text flex-grow-1">{{ data.question }}</span>

    <i class="fa fa-trash fa-lg" aria-hidden="true" v-if="visiblity" @click="removeAt(index)"></i>
  </div>
</template>
<script>
export default {
  props: {
    pId: Number,
    data: Object,
    index: Number,
    list: Array
  },
  data() {
    return {
      visiblity: false
    };
  },
  methods: {
   removeAt() {
      console.log('in remove')
      console.log(this.index)
      this.$store.state.newExam.sections[this.pId].questions.splice(this.index,1);
      this.$store.commit("saveExam");
      console.log("in remove button");
      console.log(this.pId);
    }
  }
};
</script>