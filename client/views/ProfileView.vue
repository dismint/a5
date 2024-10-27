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

function printworking(value: string) {
  currentNode.value = value;
}
</script>

<template>
  <main class="column">
    <ProfileHeader />
    <div class="row">
    <TopTags />
    <ProfileGraph @nodeClick="printworking"/>
    <Current :node="currentNode"/>
  </div>
  </main>
</template>
