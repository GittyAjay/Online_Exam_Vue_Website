<template>
  <div class="row d-flex justify-content-center">
    <b-card class="col-xl-8 col-lg-10 col-sm-12">
      <cv-form>
        <div>
            <Banner :examData="exam" @removeBanner="deleteBanner" />
        </div>
        <cv-text-input
          label="Exam Title"
          class="my-3"
          v-model="formData.name"
          placeholder="Enter name of exam"
        />
        <ckeditor
          class="cv-text-input"
          :editor="editor"
          v-model="formData.description"
          :config="editorConfig"
        ></ckeditor>
        <div class="my-3">
          <label class="bx--label">Select Classes</label>
          <multiselect
            v-model="formData.classes"
            :multiple="true"
            :taggable="true"
            :options="classList"
          ></multiselect>
        </div>
        <div>
          <label class="bx--label">Choose a Language</label>
          <multiselect
            v-model="formData.language"
            :multiple="false"
            :taggable="true"
            :options="languageList"
          ></multiselect>
        </div>
        <div  class="d-flex justify-content-between">
          <cv-text-input
          label="Exam Duration in minutes"
          class="my-3 d-flex flex-grow-1"
          v-model="formData.duration"
          placeholder="Enter duration of exam"
        />
        <cv-date-picker
        class="my-3 d-flex flex-row-reverse"
          kind="single"
          :cal-options="calOptions"
          dateLabel="Start Date"
          placeholder="dd/mm/yyyy"
          v-model="formData.startTime"
        >
        </cv-date-picker>
        </div>
        <div class="pt-4 d-flex ">
        <cv-number-input
        class="flex-grow-1"
          label="Number of Attempt"
          step="1"
          mobile="false"
          v-model="formData.attemptCount"
        >
        </cv-number-input>
          <b-form-checkbox
          class="flex-grow-1"
            id="checkbox-1"
            v-model="formData.isPause"
            name="checkbox-1"
            value="true"
            unchecked-value="false"
          >
            Pause Enable
          </b-form-checkbox>
        </div>
      </cv-form>
      <div class="d-flex justify-content-end mt-3">
        <b-button @click="saveData">Save</b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import {Editor} from "@/editor/classic/ckeditor";
import Multiselect from "vue-multiselect";
import "vue-multiselect/dist/vue-multiselect.min.css";
import Banner from "../../../../components/banner/bannerSlot";
import { db } from "@/plugins/firebase";

export default {
  data() {
    return {
      formData: {
        name: "",
        banner: "",
        description: "<p>Lecture description here..</p>",
        classes: [],
        language: [],
        attemptCount:null,
        isPause:'false',
        startTime:null,
        duration:null
      },
      calOptions: { dateFormat: "d/m/Y" },
      classList: ["12th","11th","10th"],
      subjectList: ["PHUSICS","CHEMISTRY","BIOLOGY"],
      languageList: ["HINDI","ENGLISH","HINDI-ENGLISH"],
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
					]
				},
				language: 'en',
      },
    };
  },
  components: {
    multiselect: Multiselect,
    Banner,
 
  },
  methods: {
    saveData() {
      this.exam.name = this.formData.name;
      this.exam.banner = this.formData.banner;
      this.exam.description = this.formData.description;
      this.exam.classes = this.formData.classes;
      this.exam.language = this.formData.language;
      this.exam.attemptCount = this.formData.attemptCount;
      this.exam.isPause = this.formData.isPause;
      this.exam.startTime = this.formData.startTime;
      this.exam.duration=this.formData.duration;
      this.$store.commit("saveExam");
    },
    deleteBanner() {
      db.collection("Exams")
        .doc(this.exam.id)
        .update({ banner: null });
    },
    
  },
  computed: {
    exam() {
      return this.$store.state.newExam;
    },
  },

  watch: {
    exam: {
      immediate: true,
      handler() {
        this.formData.name = this.exam.name;
        this.formData.description = this.exam.description;
        this.formData.classes = this.exam.classes;
        this.formData.banner = this.exam.banner;
        this.formData.language = this.exam.language;
        this.formData.attemptCount = this.exam.attemptCount;
        this.formData.isPause = this.exam.isPause;
        this.formData.startTime = this.exam.startTime;
       this.formData.duration= this.exam.duration;
        
      },
    },
  },
};
</script>
<style scoped>
.banner {
  min-width: 265;
}
</style>
