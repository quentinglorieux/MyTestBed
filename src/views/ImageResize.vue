<script setup>
import { ref } from "vue";
import { IKImage, IKUpload } from "imagekit-vue3";

const path = ref("");
const name = ref("");
const direction = ref("");
const load = ref(0);

function onError(err) {
  console.log("Error");
  console.log(err);
}

function onSuccess(res) {
  console.log("Success");
  console.log(res);
  path.value = res.filePath;
  name.value = res.name;
  res.height > res.width
    ? (direction.value = "portrait")
    : (direction.value = "landscape");
  load.value = 100;
}

function onProgress(progress) {
  console.log("Progress");
  console.log(progress);
  load.value = 10;
}
</script>

<template>
  <div>
    <h1>Resize pour La Grange</h1>
  </div>

  <h2>Upload image :</h2>
  <IKUpload
    :tags="['la Grange', 'Larchant']"
    :responseFields="['fileName']"
    @error="onError"
    @success="onSuccess"
    @progress="onProgress"
    urlEndpoint="https://ik.imagekit.io/quentinglx"
    publicKey="public_QoAnOszxzry0gVchb2sz3NhXi+w="
    authenticationEndpoint="https://auth.rubidiumweb.eu/secret"
  />


  <div v-if="load == 10">LOADING</div>

  <div v-if="load == 100">
    <div v-if="path">
      <div v-if="direction == 'portrait'">
        <IKImage
          :path="path"
          :transformation="[
            { height: '800' },
            { aspectRatio: '1-1', height: '800', blur: 30 },
            { overlayImage: name, overlayHeight: 800 },
          ]"
          loading="lazy"
          urlEndpoint="https://ik.imagekit.io/quentinglx"
          publicKey="public_QoAnOszxzry0gVchb2sz3NhXi+w="
        />
      </div>

      <div v-if="direction == 'landscape'">
        <IKImage
          :path="path"
          :transformation="[
            { aspectRatio: '1-1', width: '800', blur: 30 },
            { overlayImage: name, overlayWidth: 800 },
          ]"
          loading="lazy"
          urlEndpoint="https://ik.imagekit.io/quentinglx"
          publicKey="public_QoAnOszxzry0gVchb2sz3NhXi+w="
        />
      </div>
    </div>
  </div>
</template>
