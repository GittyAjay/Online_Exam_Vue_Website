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
                <b-form-select v-model="formData.dificultyLevel" :options="options"></b-form-select>
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
            <div class="mt-4">
              <h6>MULTIPLE ANSWER</h6>
              <div class="mt-2">
                <b-form-checkbox
                  v-model="formData.isMultiAnswer"
                  name="multi"
                  :value="true"
                  :unchecked-value="false"
                  class="align-items-center"
                  size="lg"
                >
                  <p class="pt-1">Enable Multiple Answer</p>
                </b-form-checkbox>
              </div>
            </div>
            <div class="mt-4">
              <h6>PARTIAL MARKING</h6>
              <div class="mt-2">
                <b-form-checkbox
                  v-model="formData.isPartialMarking"
                  name="partial"
                  :value="true"
                  :unchecked-value="false"
                  class="align-items-center"
                  size="lg"
                >
                  <p class="pt-1">Enable Partial Marking</p>
                </b-form-checkbox>
              </div>
            </div>
          </div>
        </b-col>
        <b-col cols="9" class="p-4">
          <b-card title="QUESTION*">
            <ckeditor :editor="editor" v-model="formData.question" :config="editorConfig"></ckeditor>
            <h4 class="pt-3 pb-3">CHOICES</h4>

            <div v-for="(item, index) in formData.options" :key="item.label">
              <div class="d-flex align-items-center align-content-stretch mt-4">
                <h5 class="pr-4">{{ item.label }}</h5>
                <div class="flex-grow-1">
                  <ckeditor :editor="editor" v-model="item.text" :config="editorConfig"></ckeditor>
                </div>

                <b-form-checkbox
                  v-model="item.isTrue"
                  :value="true"
                  :unchecked-value="true"
                  class="align-items-center mr-3 ml-3"
                  size="lg"
                  :id="`${index}`"
                  @change="chbx(index)"
                ></b-form-checkbox>
                <b-icon
                  icon="x-circle-fill"
                  variant="secondary"
                  font-scale="2"
                  @click="deleteOption(index)"
                ></b-icon>
              </div>
            </div>

            <b-button variant="success" size="sm" class="mt-4" @click="addOption">+ ADD OPTION</b-button>
            <div>
              <div class="d-flex flex-row align-items-center justify-content-left mt-3">
                <h6>EXPLANATION</h6>
                <b-icon icon="plus-circle" v-b-toggle.collapse-3 class="m-1" variant="secondary"></b-icon>
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
import { Editor } from "@/editor/classic/ckeditor";
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
        options: []
      },
      selected: "Medium",
      options: [
        { value: "Easy", text: "Easy" },
        { value: "Medium", text: "Medium" },
        { value: "Hard", text: "Hard" }
      ],
      editor: Editor,
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "bold",
            "italic",
            "underline",
            "blockQuote",
            "bulletedList",
            "numberedList",
            "|",
            "subscript",
            "superscript",
            "|",
            "MathType",
            "ChemType"
          ]
        },
        language: "en"
      }
    };
  },

  methods: {
    addOption() {
      this.formData.options.push({
        label: "",
        text: "",
        isTrue: false,
        isSelected: false
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
    chbx(idx) {
      if (this.formData.isMultiAnswer!=null && !this.formData.isMultiAnswer) {
        if (document.getElementById(idx).checked == true) {
          for (var i = 0; i < this.formData.options.length; i++) {
            document.getElementById(`${i}`).checked = false;
          }
          document.getElementById(idx).checked = true;
        }
      }
    },
    save() {
      console.log(this.formData);
      this.$store.state.newExam.sections[
        this.$route.params.sectionIdx
      ].questions[this.$route.params.questionId] = this.formData;
      this.$store.commit("saveExam");
    }
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
        this.$store.state.newExamId = this.$route.params.examId;
        this.$store.dispatch("bindNewExam");
      }
    },
    exam: {
      immediate: true,
      handler() {
        if (this.exam != null) {
          this.formData = this.exam.sections[
            this.$route.params.sectionIdx
          ].questions[this.$route.params.questionId];
        }
      }
    }
  }
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
