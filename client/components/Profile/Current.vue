<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { fetchy } from "../../utils/fetchy";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";

const props = defineProps(["node"]);
const selected = ref(false);
const name = ref("");
const description = ref("");
const url = ref("");
const tags = ref<string[]>([]);

watch(() => props.node, async (newVal, oldVal) => {
  const webapp = await fetchy(`/api/webapp/view`, "GET", { query: { _id: newVal } });
  const tgs = await fetchy(`/api/tag/view`, "GET", { query: { _id: newVal } });
  selected.value = true;
  name.value = webapp.name;
  description.value = webapp.description;
  url.value = webapp.url;
  tags.value = tgs;
});
</script>

<template>
  <div class="profilebox">
    <h1>Current</h1>
    <div v-if="selected">
      <p><b>Name:</b> {{ name }}</p>
      <p><b>Description:</b> {{ description }}</p>
      <p><b>URL:</b> {{ url }}</p>
      <h3>Tags:</h3>
      <div class="tags">
        <p v-for="tag in tags" :key="tag">{{ tag }}</p>
      </div>
    </div>
    <div v-else>
      <h3>No Node Selected</h3>
      <p><b>Please select either</b></p>
      <p>1. A graph node</p>
      <p>2. "Add Node"</p>
    </div>
  </div>
</template>

<style scoped>
.profilebox {
  margin: 0em;
  padding: 1em;
  width: 50%;
  max-width: 60em;

  color: var(--background);
  background-color: var(--primary);

  display: flex;
  flex-direction: column;

  border-radius: 0.4em;
}

h1 {
  align-self: center;
  font-size: 2.0em;
  margin: 0;
}

h3 {
  font-size: 1.2em;
  margin-top: 1em;
}

p {
  padding: 0.3em;
  border-radius: 0.4em;
  font-size: 1.0em;
  margin: 0.2em;
}

.tags {
  text-align: left;
  gap: 0.5em;
}
</style>
