<template>
  <div>
    <div id="info" class="pa-4" v-if="home">
      <v-text-field
        required
        v-model="home.title"
        label="Title"
        placeholder="Title"
        outlined
      >{{ home.title }}</v-text-field>
      <v-text-field
        required
        v-model="home.description"
        label="Description"
        placeholder="Description"
        outlined
      >{{ home.description }}</v-text-field>
      <v-file-input label="File input"  @change="uploadImage"></v-file-input>
    </div>
  </div>
</template>


<script>
import { fb } from "../../../firebase";
export default {
  props: ["home"],
  methods: {
    uploadImage(e) {
      let file = e;
      console.log(e);
      var storageRef = fb.storage().ref("home/" + file.name);
      let uploadTask = storageRef.put(file);
      uploadTask.on(
        "state_changed",
        // eslint-disable-next-line no-unused-vars
        snapshot => {},
        error => {
          console.error("Error updating document: ", error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
            this.home.image = downloadURL;
            this.btnDisabled = false;
            console.log("File available at", downloadURL);
          });
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>