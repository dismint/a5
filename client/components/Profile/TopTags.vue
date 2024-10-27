<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { fetchy } from "../../utils/fetchy";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";

type TopTag = { tag: string; count: number };
const tags = ref<TopTag[]>([]);
const props = defineProps(["updateTop"]);

onMounted(async () => {
  const topTags = await fetchy("/api/user/top/tags", "GET");
  for (let tag of topTags) {
    tags.value.push({ tag: tag.tag, count: tag.count });
  }
});

watch(() => props.updateTop, async (newVal, oldVal) => {
  tags.value = [];
  const topTags = await fetchy("/api/user/top/tags", "GET");
  for (let tag of topTags) {
    tags.value.push({ tag: tag.tag, count: tag.count });
  }
})
</script>

<template>
  <div class="profilebox">
    <h1>Top Tags</h1>
    <div class="tags">
      <div v-for="tag in tags" :key="tag.tag">
        <p>{{ tag.tag }}: {{ tag.count }}</p>
      </div>
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
  background-color: var(--accent);
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
