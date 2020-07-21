<template>
  <div>
    <b-collapse :id="'collapse-'+idx">
      <div class="pt-4">
        <div class="pt-3">
          <draggable tag="ul" :list="questions" class="list-group" handle=".handle">
            <li
              class="list-group-item"
              v-for="(element, index) in questions" 
               @click="$router.push({name:'question-form',params: { examId:$store.state.newExam.id, questionId:index, sectionIdx:idx}})"
              :key="element.q"
            >
              <questionItem :pId="idx" :index="index" :data="element" />
            </li>
          </draggable>
        </div>
        <b-card class="mt-2">
          <div>
            <b-button class="m-1" variant="outline-primary" @click="mcq()">Multiple choice</b-button>
            <b-button class="m-1" variant="outline-success" @click="numerical()">Numerical</b-button>
            <b-button class="m-1" disabled variant="outline-info" >Fill in the Blank</b-button>
          </div>
        </b-card>
      </div>
    </b-collapse>
  </div>
</template>
<script>
import questionItem from "./questionItem";
import draggable from "vuedraggable";
export default {
  props: {
    idx: Number,
    element: Object,
  },
  data() {
    return {
      visibility: false,
      dragging: false,
      questionId:null,
      examId:null,
      defaultNumerical:{
          question: "<p>Content of the editor.</p>",
          type:'numerical',
          positiveMark:null,
          negativeMark:null, 
          dificultyLevel:'',
          explanation:'',
          answer: null
      },
      defaultMcq:{
          question: "<p>Content of the editor.</p>",
          type:'mcq',
          positiveMark:null,
          negativeMark:null, 
          dificultyLevel:'',
          isMultiAnswer:false,
          isPartialMarking:false,
          explanation:'',
            options: [
          ],
      },

    };
  },
  components: {
    draggable,
    questionItem
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
     questions() {
      return this.$store.state.newExam.sections[this.idx].questions;
    }
  },
  methods: {
    mcq() {
      this.$store.state.newExam.sections[this.idx].questions.push(this.defaultMcq);
      this.$store.commit("saveExam");
      this.$router.push({
        name: "question-form",
        params: { examId:this.$store.state.newExam.id, questionId:this.$store.state.newExam.sections[this.idx].questions.length-1, sectionIdx:this.idx}
      });
    },
    numerical() {
       this.$store.state.newExam.sections[this.idx].questions.push(this.defaultNumerical);
       this.$store.commit("saveExam");
        this.$router.push({
        name: "numerical-question",
        params: {examId:this.$store.state.newExam.id,questionId:this.$store.state.newExam.sections[this.idx].questions.length-1,sectionIdx:this.idx}
      });
    },
    fillinBlank() {
       
    },
  }
};
</script>