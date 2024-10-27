<script setup lang="ts">
import CreateWebappForm from "@/components/Profile/CreateWebappForm.vue";
import PatchWebappForm from "@/components/Profile/PatchWebappForm.vue";
import WebappList from "@/components/Profile/WebappList.vue";
import ProfileHeader from "@/components/Profile/ProfileHeader.vue";
import TopTags from "@/components/Profile/TopTags.vue";
import ProfileGraph from "@/components/Profile/ProfileGraph.vue";
import Current from "@/components/Profile/Current.vue";

import { ref } from "vue";

const currentNode = ref("");
const updateTop = ref(false);
const updateGraph = ref(false);

function changeNode(value: string) {
  currentNode.value = value;
}

function changed() {
  updateTop.value = !updateTop.value;
  updateGraph.value = !updateGraph.value;
}
</script>

<template>
  <main class="column">
    <ProfileHeader :update="updateTop"/>
    <div class="row">
    <TopTags :updateTop="updateTop"/>
    <ProfileGraph @nodeClick="changeNode" :updateGraph="updateGraph"/>
    <Current :node="currentNode" @nodeAdd="changed" @nodeEdit="changed" @nodeDelete="changed"/>
  </div>
  </main>
</template>
