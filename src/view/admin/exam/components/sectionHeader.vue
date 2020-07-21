<template>
  <cv-tile class="border mb-3">
    <div @mouseleave="visibility=false" @mouseover="visibility=true">
      <div class="d-flex align-items-center">
        <i class="fa fa-align-justify handle"></i>
        <span class="text m-2">{{ element.name }}</span>
        <div class="action-box flex-grow-1">
          <i class="fa fa-pencil mx-2 p-0 edit" @click="editSection();" v-show="visibility"></i>
        </div>
        <b-button variant="primary" v-b-toggle="'collapse-'+id" class="mr-4">
          <b-icon icon="caret-down-fill" aria-label="Help"></b-icon>
        </b-button>
        <i class="fa fa-times close" @click="removeAt()"></i>
      </div>
      <sectionDetail :idx="id" :element="element" />
    </div>
  </cv-tile>
</template>
<script>
import sectionDetail from "./sectionDetail";
export default {
  name: "handle",
  display: "Handle",
  instruction: "Drag using the handle icon",
  order: 5,
  components: {
    sectionDetail
  },
  props: {
    id: Number,
    element: Object,
  },
  data() {
    return {
      name: "",
      nameState: null,
      submittedNames: "",
      modalShow: false,
      visibility: false
    };
  },
  methods: {
    removeAt() {
      console.log(this.id);
      this.$store.state.newExam.sections.splice(this.id, 1);
      // Commit Save Exam
    },
    editSection() {
      this.$dialog
        .prompt({
          title: "Want to edit new section?",
          body: "Enter section name you can change it leter?",
          promptHelp:
            'Type section name in the box below and click "[+:okText]"'
        })
        .then(dialog => {
          this.submittedNames = dialog.data;
          if (dialog.data != "") {
            this.$store.state.newExam.sections[this.id].name = this.submittedNames;
            // Commit Save Exam
          } else {
            this.$dialog.alert(
              dialog.data || "OOPS! section name can not be empty"
            );
          }
        });
    }
  }
};
</script>