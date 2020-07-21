<template>
  <div>
    <div class="sticky-top">
       <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">
        <i class="fa fa-angle-left" aria-hidden="true"  @click="$router.go(-1)"></i>
          </b-navbar-brand>
         <b-navbar-brand href="#"><h6>Test</h6></b-navbar-brand> 
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div class="side-bar row mt-3">
      <div class="col-2">
        <div class=" pl-3">
          <b-list-group >
            <b-list-group-item
              button
              v-bind:class="{ 'active' : isSelected(0) }"
              v-on:click="selected =0"
            >Exam Details</b-list-group-item>
            <b-list-group-item
              button
              v-bind:class="{ 'active' : isSelected(1) }"
              v-on:click="selected = 1"
            >Exam Content</b-list-group-item>
            <b-list-group-item
              button
              v-bind:class="{ 'active' : isSelected(2) }"
              v-on:click="selected = 2"
            >Exam Price</b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <div class="col-10">
        <component
          v-bind:is="(selected===0)? 'ExamDetail': (selected===1)? 'ExamContent': 'ExamPrice'"
        ></component>
      </div>
    </div>
  </div>
</template>
<script>
import ExamDetail from './page/ExamDetail';
import ExamPrice from './page/ExamPrice';
import ExamContent from './page/ExamContent';

export default {
  name: "handle",
  display: "Handle",
  instruction: "Drag using the handle icon",
  order: 5,
  components: {
    ExamDetail,
    ExamContent,
    ExamPrice
  },
  data() {
    return {
      selected: 0,
      name: "",
      nameState: null,
      submittedNames: "",
      modalShow: false,
      list: [
        { name: "Section One", text: "", id: 0 },
        { name: "Section Two", text: "", id: 1 },
        { name: "Section Three", text: "", id: 2 }
      ],
      dragging: false,
      id: 2
    };
  },
  computed: {
    currentExamId() {
      return this.$store.state.newExamId;
    },
    exam() {
      return this.$store.state.newExam;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.selected = 0;
        this.$store.state.newExamId = this.$route.params.examId;
        this.$store.dispatch("bindNewExam");
      }
    }
  },
  methods: {
    isSelected(i) {
      console.log(this.exam);
      return i === this.selected;
    },
  }
};
</script>
<style >
.side-bar{
  overflow: auto;
  height: calc(100vh-48px);
}

</style>
