<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";

const name = ref("");
const description = ref("");
const url = ref("");
const emit = defineEmits(["refreshPosts"]);

const createWebapp = async (name: string, description: string, url: string) => {
  console.log(name, description, url);
  try {
    await fetchy("/api/webapp", "PUT", { query: { name, description, url } });
    useToastStore().showToast({ message: "Added Webapp", style: "success" });
  } catch (_) {
    return;
  }
};
</script>

<template>
  <main>
    <h2>Add Webapp</h2>
    <form @submit.prevent="createWebapp(name, description, url)">
      <label for="name">name</label>
      <textarea id="name" v-model="name" placeholder="name" required> </textarea>
      <br />
      <label for="description">description</label>
      <textarea id="description" v-model="description" placeholder="description" required> </textarea>
      <br />
      <label for="url">url</label>
      <textarea id="url" v-model="url" placeholder="url" required> </textarea>
      <br />
      <button type="submit" class="pure-button-primary pure-button">Create Webapp</button>
    </form>
  </main>
</template>
