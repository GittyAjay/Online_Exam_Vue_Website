<template>
  <div>
    <div v-if="examData.banner" style="position: relative;">
      <b-button variant="info" @click="removeData" class="btnclose">
        <i class="fa fa-trash"></i>
      </b-button>
      <b-img :src="examData.banner" thumbnail fluid alt="Responsive image" ></b-img>
    </div>
    <div v-else>
      <input type="file" ref="file" accept="image/*" v-show="false" v-on:change="startUpload" />
      <div class="d-flex justify-content-center dotted p-4" v-if="!isUploading">
        <b-button variant="success" @click="selectFile">Upload Banner</b-button>
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
export default {
  props: {
    examData: Object
  },
  data() {
    return {
      meta: {
        name: "",
        size: "",
        contentType: "",
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
      this.sendToServer();
    },
    sendToServer() {
      this.uploadTask = storage
        .child(`banner/${this.examData.id}`)
        .put(this.file, {
          contentType: this.meta.contentType
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
              console.log('uploading paused')
              break;
            case "running": // or 'running'
              console.log('uploading..')
              break;
          }
        },
        function(error) {
          console.log(error);
        },
        function() {
          self.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            let imgRef = db.collection("Exams").doc(self.examData.id);
            imgRef.set({ banner: downloadURL }, { merge: true });
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
        verification: "Lecture", // for hard confirm, user will be prompted to type this to enable the proceed button
        verificationHelp: 'Type "[+:verification]" below to confirm', // Verification help text. [+:verification] will be matched with 'options.verification' (i.e 'Type "continue" below to confirm')
        clicksCount: 3, // for soft confirm, user will be asked to click on "proceed" btn 3 times before actually proceeding
        backdropClose: false, // set to true to close the dialog when clicking outside of the dialog window, i.e. click landing on the mask
        customClass: "" // Custom class to be injected into the parent node for the current dialog instance
      };
      const self = this;
      this.$dialog.confirm(message, options)
        .then(async function()  {
    
     self.$emit("removeBanner");
   })
  .catch(function() {
    
  });
        
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
  top: 8px;
  right: 8px;
  z-index: 9999;
}

/* Darker background on mouse-over */
.btnclose:hover {
  background-color: RoyalBlue;
}
</style>