<script setup lang="ts">
import CreateWebappForm from "@/components/Profile/CreateWebappForm.vue";
import PatchWebappForm from "@/components/Profile/PatchWebappForm.vue";
import WebappList from "@/components/Profile/WebappList.vue";
</script>

<template>
  <main class="column">
    <h1>Profile</h1>
    <CreateWebappForm />
    <PatchWebappForm />
    <RouterLink to="/" class="button"> Return to the home page </RouterLink>
  </main>
</template>
