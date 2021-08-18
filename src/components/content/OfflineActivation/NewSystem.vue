<template>
  <div class="new-system">
    <div class="system-header">Add System</div>
    <div
      class="upload-section"
      :class="{active: pickedFile, filled: droppedFile}"
      v-on:dragover="dragover" v-on:dragleave="dragleave" v-on:drop="drop"
    >

      <div
        class="uploaded-systems-list"
        v-if="uploadedSystems.length > 0"
      >
        <div
          class="system-item"
          v-for="system in uploadedSystems"
          v-bind:key="'system_' + system.id"
        >
          <button
            class="remove-system"
            v-on:click="removeSystem(system.id)"
          ><span></span></button>
          <div
            class="system-image"
            v-bind:style="{
              background: `url(${system})`,
              'background-size': 'contain',
              'background-repeat': 'no-repeat',
              'background-position': 'center'
            }"
          ></div>
        </div>
      </div>

      <label
        for="system-field"
        v-else
      >
        <input type="file" name="system-field" class="upload-field" multiple 
          v-on:change="uploadDirect" ref="upload" accept=".jpg, .jpeg, .png" />

        <div
          class="upload-icon"
          v-on:click="uploadDirectClick"
        ></div>
        <span
          v-on:click="uploadDirectClick"
        >Choose a file</span> to upload or drag it here <br /> (jpg, png, max size 5mb)
      </label>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'NewSystem',
  props: {
    uploadedData: Object
  },
  data() {
    return {
      droppedFile: null,
      pickedFile: false,
      uploadedSystems: []
    }
  },
  methods: {
    ...mapActions({
      uploadFile: 'main/uploadSystem',
      removeSystem: 'main/removeSystem'
    }),
    dragover(event) {
      event.preventDefault();
      this.pickedFile = true;
    },
    dragleave() {
      this.pickedFile = false;
    },
    drop(event) {
      event.preventDefault();
      this.droppedFile = true;

      this.uploadFile(event.dataTransfer.files);
      this.buildPreview(event.dataTransfer.files)

    },
    uploadDirect(ev) {
      this.uploadFile(ev.target.files);
      this.buildPreview(ev.target.files);
    },
    uploadDirectClick() {
      this.$refs.upload.click();
    },
    buildPreview(files) {
      const [file] = files;

      console.log(file)

      file && 
        this.uploadedSystems.push(URL.createObjectURL(file))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.new-system {
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: flex-start;
  margin-top: 40px;

  width: 100%;
}
.system-header {
  margin-bottom: 24px;
}
.uploaded-systems-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    height: 100%;
    width: 100%;
    align-items: flex-start;
    justify-content: flex-start;

    min-height: 231px;
}
.system-item {
    position: relative;
    margin: 16px;
    background-color: #161819;
    border-radius: 4px;
    animation: uploadsource 0.3s linear forwards;
    -webkit-animation: uploadsource 0.3s linear forwards;

}

@keyframes uploadsource {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
@-webkit-keyframes uploadsource {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.system-image {
    display: block;
    width: 80px;
    height: 80px;
}
.remove-system {
    position: absolute;
    right: -5px;
    top: -5px;
    width: 15px;
    height: 15px;
    background: #CC4343;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
}
.remove-system span {
  display: block;
  background: url('../../../assets/close_icon.png');
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 7px;
  height: 7px;
}
.upload-section {
  background: #1F2224;
  min-height: 231px;
  margin-bottom: 50px;

  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  border: 2px dashed rgba(214, 221, 222, 0.26);
  border-radius: 4px;
  background: rgba(22, 24, 25, 0.26);
}
.upload-section.active {
  background: rgba(22, 24, 25, 0.8);
}

.upload-section label span {
  color: #18A7FF;
  cursor: pointer;
}
.upload-icon {
  display: block;
  width: 40px;
  height: 40px;
  margin: 28px auto;
  background: url('../../../assets/upload_icon.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
}
input {
    visibility: hidden;
    pointer-events: none;
    height: 0;
    margin: 0;
    width: 0;
}
</style>
