<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchy } from "../../utils/fetchy";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";

const username = ref("");
const joinDate = ref("");
const webappcount = ref(0);

onMounted(async () => {
  const userData = await fetchy("/api/session", "GET");
  const webapps = await fetchy("/api/webapp/view/all", "GET");
  username.value = useUserStore().currentUsername;
  joinDate.value = new Date(userData.dateCreated).toLocaleDateString();
  webappcount.value = webapps.length;
});
</script>

<template>
  <div class="profilebox">
    <h1>{{ username }}</h1>
    <p>Joined On: <b>{{ joinDate }}</b></p>
    <h3>Webapp Count: {{ webappcount }}</h3>
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
  align-items: center;

  border-radius: 0.4em;
}

h1 {
  font-size: 2.6em;
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
</style>
