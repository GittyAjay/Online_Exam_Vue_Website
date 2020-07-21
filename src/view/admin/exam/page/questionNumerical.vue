<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
           <b-navbar-brand href="#">
        <i class="fa fa-angle-left" aria-hidden="true" @click="$router.go(-1)"></i>
          </b-navbar-brand>
        <b-navbar-brand href="#">QUESTION SETTING</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-button variant="light" @click="save">SAVE</b-button>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <b-container fluid class="bv-example-row">
      <b-row>
        <b-col cols="3">
          <div class="mt-4">
            <div class="mt-4">
              <h6>DIFFICULTY LEVEL</h6>
              <div class="d-flex justify-content-center mt-2">
                <b-form-select
                  v-model="formData.dificultyLevel"
                  :options="options"
                ></b-form-select>
              </div>
            </div>
            <div class="mt-4">
              <h6>MARKS</h6>
              <div class="d-flex justify-content-center mt-2">
                <b-input-group class="mr-4" prepend="+">
                  <b-form-input v-model="formData.positiveMark"></b-form-input>
                </b-input-group>
                <b-input-group prepend="-">
                  <b-form-input v-model="formData.negativeMark"></b-form-input>
                </b-input-group>
              </div>
            </div> 
        
          </div>
        </b-col>
        <b-col cols="9" class="p-4">
          <b-card title="QUESTION*">
            <ckeditor
              :editor="editor"
              v-model="formData.question"
              :config="editorConfig"
            ></ckeditor>
           
             <h4 class="pt-3">ANSWER</h4>
           <!-- <div v-for="item in question_option" :key="item.label"> -->
              <div
                class="d-flex flex-row align-items-center justify-content-between mt-2"
              >
               
              <div>
                <b-input
                  class="mb-2 mr-sm-2 mb-sm-0"
                  v-model="formData.answer"
                  placeholder="answer"
                ></b-input>
              </div>
                
              </div>
            <!-- </div> -->

            <div>
              <div
                class=" d-flex flex-row align-items-center justify-content-left mt-3"
              >
                <h6>EXPLANATION</h6>
                <b-icon
                  icon="plus-circle"
                  v-b-toggle.collapse-3
                  class="m-1"
                  variant="secondary"
                ></b-icon>
              </div>
              <b-collapse id="collapse-3" class="mt-2">
                <b-form-textarea
                  id="textarea"
                  v-model="formData.explanation"
                  placeholder="Enter explanation..."
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </b-collapse>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import {Editor} from "@/editor/classic/ckeditor";
// import {db} from '../../../../plugins/firebase';

export default {
  name: "CourseForm",
  data() {
    return {
      formData: {
        question: "<p>Content of the editor.</p>",
        type: "mcq",
        positiveMark: null,
        negativeMark: null,
        dificultyLevel: "",
        isMultiAnswer: false,
        isPartialMarking: false,
        explanation: "",
        answer:''
      },
      selected: "Medium",
      options: [
        { value: "Easy", text: "Easy" },
        { value: "Medium", text: "Medium" },
        { value: "Hard", text: "Hard" },
      ],
      editor: Editor,
      editorConfig: {
       toolbar: {
					items: [
						'undo',
						'redo',
						'|',
						'bold',
						'italic',
						'underline',
						'blockQuote',
						'bulletedList',
						'numberedList',
						'|',
						'subscript',
						'superscript',
						'|',
						'MathType',
						'ChemType'
					]
				},
				language: 'en',
      },
    };
  },

  methods: {
    addOption() {
      this.formData.options.push({
        label: "",
        text: "",
        isTrue: false,
        isSelected: false,
      });
      console.log(this.formData.options);
      this.label_rearrange();
    },
    deleteOption(index) {
      this.formData.options.splice(index, 1);
      this.label_rearrange();
    },
    label_rearrange() {
      let nex = "A".charCodeAt(0);
      for (var i = 0; i < this.formData.options.length; i++) {
        this.formData.options[i].label = String.fromCharCode(nex++);
      }
    },
    save() {
      console.log(this.formData);
      this.$store.state.newExam.sections[
        this.$route.params.sectionIdx
      ].questions[this.$route.params.questionId] = this.formData;
      this.$store.commit("saveExam");
    },
  },
  computed: {
    currentExamId() {
      return this.$store.state.newExamId;
    },
    exam() {
      return this.$store.state.newExam;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        this.$store.state.newExamId = this.$route.params.examId;
        this.$store.dispatch("bindNewExam");
      },
    },
    exam: {
      immediate: true,
      handler() {
        if (this.exam != null) {
          this.formData = this.exam.sections[
            this.$route.params.sectionIdx
          ].questions[this.$route.params.questionId];
        }
      },
    },
  },
};
</script>

<style scoped>
.sidebar {
  height: calc(100vh - (48px));
}
.add_option {
  background-color: rgb(63, 168, 63);
  color: white;
  width: 130px;
}
</style>
