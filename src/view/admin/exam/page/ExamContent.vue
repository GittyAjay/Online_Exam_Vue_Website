<template>
 <div class="row d-flex justify-content-center">
    <div row class="col-10">
    <draggable tag="ul" :list="sections" class="list-group" handle=".handle">
      <div v-for="(element, idx) in sections" :key="element.name">
        <sectionHeader :id="idx" :element="element" />
      </div>
    </draggable>
    <div>
      <b-button @click="createNew()" variant="warning">Add Section</b-button>
    </div>
  </div>
 </div>
</template>
<script>
import draggable from "vuedraggable";
import sectionHeader from "../components/sectionHeader";

export default {
  data() {
    return {};
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
    sections() {
      return this.$store.state.newExam.sections;
    }
  },
  components: {
    draggable,
    sectionHeader
  },
  methods: {
    createNew() {
      this.$dialog
        .prompt({
          title: "Want to create new section?",
          body: "Enter section name you can change it leter?",
          promptHelp:
            'Type section name in the box below and click "[+:okText]"'
        })
        .then(dialog => {
          this.submittedNames = dialog.data;
          if (dialog.data != "") {
            this.$store.state.newExam.sections.push({
              name: this.submittedNames,
              questions: []
            });
            this.$store.commit("saveExam");

            console.log("id is " + this.id);
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