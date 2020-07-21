<template>
  <div>
    <div v-if="courseData.intro" style="position: relative;">
      <b-button variant="info" @click="removeData" class="btnclose">
        <i class="fa fa-trash"></i>
      </b-button>
      <b-aspect aspect="16:9">
        <video height="100%" width="100%" controls>
          <source :src="courseData.intro" type="video/mp4" />
        </video>
      </b-aspect>
    </div>
    <div v-else>
      <input type="file" ref="file" accept="video/*" v-show="false" v-on:change="startUpload" />
      <div class="d-flex justify-content-center dotted p-4" v-if="!isUploading">
        <b-button variant="success" @click="selectFile">Upload Intro</b-button>
      </div>
      <div class="dotted" v-if="isUploading">
        <b-progress height="56px" :value="progress" class="mb-2 progress-upload"></b-progress>
        <div class="d-flex align-items-center">
          <i id="play" class="fa fa-play-circle"></i>
          <h6 class="flex-grow-1">{{ meta.size }}</h6>
          <h6 class="flex-grow-1">{{progress+' %'}}</h6>
          <div class="flex-grow-0">
            <i :class="isPaused? 'fa fa-play': 'fa fa-pause'" @click="pauseUpload"></i>
            <i class="fa fa-times m-3" @click="cancelUpload"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import { db, storage } from "@/plugins/firebase";
import getBlobDuration from "get-blob-duration";

export default {
  props: {
    courseData: Object
  },
  data() {
    return {
      meta: {
        name: "",
        size: "",
        contentType: "",
        extension: ".mp4",
        duration: 0,
        url: ""
      },
      upload: {
        progress: 0,
        status: "0 %"
      },
      uploadTask: null,
      file: null,
      isPaused: false,
      progress: 0,
      uploaded: false,
      isUploading: false,
      mainProps: { width: 120, height: 75 },
      previewData: null
    };
  },

  methods: {
    cancelUpload() {
      if (this.isUploading) {
        this.uploadTask.cancel();

        this.$refs.file.value = "";
        this.isPaused = false;
        this.isUploading = false;
      }
    },
    pauseUpload() {
      if (!this.isPaused) {
        this.uploadTask.pause();
        this.isPaused = true;
      } else {
        this.uploadTask.resume();
        this.isPaused = false;
      }
    },
    selectFile() {
      this.$refs.file.click();
    },
    async startUpload(event) {
      this.file = event.target.files[0];
      this.meta.name = event.target.files[0].name;
      this.meta.contentType = event.target.files[0].type;
      this.meta.size = this.bytesToSize(event.target.files[0].size);
      this.isUploading = true;
      this.progress = 0;
      this.meta.duration = this.secoundToHour(await getBlobDuration(this.file));

      this.sendToServer();
    },
    sendToServer() {
      this.uploadTask = storage
        .child(`intro/${this.courseData.id}`)
        .put(this.file, {
          contentType: this.meta.contentType,
          customMetadata: this.meta
        });

      var self = this;
      this.uploadTask.on(
        "state_changed",
        snapshot => {
          self.progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          switch (snapshot.state) {
            case "paused": // or 'paused'
              break;
            case "running": // or 'running'
              break;
          }
        },
        function(error) {
          console.log(error);
        },
        function() {
          self.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            let vidRef = db.collection("Courses").doc(self.courseData.id);
            vidRef.set({ intro: downloadURL }, { merge: true });

            self.isUploading = false;
            self.uploaded = true;
          });
        }
      );
    },

    removeData() {
      let message = `<strong>Are you sure want to remove this video?</strong>`;

      let options = {
        html: true, // set to true if your message contains HTML tags. eg: "Delete <b>Foo</b> ?"
        loader: false, // set to true if you want the dailog to show a loader after click on "proceed"
        reverse: false, // switch the button positions (left to right, and vise versa)
        okText: "Yes",
        cancelText: "Close",
        animation: "zoom", // Available: "zoom", "bounce", "fade"
        type: "soft", // coming soon: 'soft', 'hard', 'basic'
        clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
        backdropClose: false, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
        customClass: "" // Custom class to be injected into the parent node for the current dialog instance
      };

      const self = this;
      this.$dialog
        .confirm(message, options)
        .then(async function() {
          self.$emit("removeIntro");
        })
        .catch(function() {});
    },
    secoundToHour(secs) {
      var sec_num = parseInt(secs, 10);
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor(sec_num / 60) % 60;
      var seconds = sec_num % 60;

      return [hours, minutes, seconds]
        .map(v => (v < 10 ? "0" + v : v))
        .filter((v, i) => v !== "00" || i > 0)
        .join(":");
    },
    bytesToSize(bytes) {
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes == 0) return "0 Byte";
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
      return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    }
  }
};
</script>
<style scoped>
.dotted {
  border: 1px dashed #ccc;
  position: relative;
  z-index: 3;
}
.progress-upload {
  position: absolute;
  opacity: 0.3;
  z-index: -10;
  top: 0px;
  width: 100%;
}
#play {
  color: red;
  margin: 16px;
  font-size: 1.5rem;
}
/* Style buttons */
.btnclose {
  background-color: grey; /* Blue background */
  border: none; /* Remove borders */
  color: white; /* White text */
  padding: 3px 9px; /* Some padding */
  font-size: 16px; /* Set a font size */
  cursor: pointer; /* Mouse pointer on hover */
  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 9999;
}
/* Darker background on mouse-over */
.btnclose:hover {
  background-color: RoyalBlue;
}
</style>