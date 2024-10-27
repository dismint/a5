<script setup lang="ts">
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const currentRoute = useRoute();
const currentRouteName = computed(() => currentRoute.name);
const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { toast } = storeToRefs(useToastStore());

// Make sure to update the session before mounting the app in case the user is already logged in
onBeforeMount(async () => {
  try {
    await userStore.updateSession();
  } catch {
    // User is not logged in
  }
});
</script>

<template>
  <header>
    <nav>
      <div class="title">
        <img src="@/assets/images/cobweb.png" />
        <RouterLink :to="{ name: 'Home' }">
          <h1>Webber</h1>
        </RouterLink>
      </div>
      <ul>
        <li>
          <RouterLink :to="{ name: 'Home' }" :class="{ filled: currentRouteName == 'Home' }"> Home </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Settings' }" :class="{ filled: currentRouteName == 'Settings' }"> Settings </RouterLink>
        </li>
        <li v-else>
          <RouterLink :to="{ name: 'Login' }" :class="{ filled: currentRouteName == 'Login' }"> Login </RouterLink>
        </li>
        <li v-if="isLoggedIn">
          <RouterLink :to="{ name: 'Profile' }" :class="{ filled: currentRouteName == 'Profile' }"> Profile </RouterLink>
        </li>
      </ul>
    </nav>
    <article v-if="toast !== null" class="toast" :class="toast.style">
      <p>{{ toast.message }}</p>
    </article>
  </header>
  <RouterView />
</template>

<style scoped>
@import "./assets/toast.css";

nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  padding: 0.0em 4em;
  background-color: var(--background);
  border-bottom: 4px solid var(--primary);
  display: flex;
  align-items: center;

  a {
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0);
    position: relative;
    -webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
  }

  a:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--primary);
    border-radius: 0em 0em 0.5em 0.5em;
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
    -webkit-transform-origin: 50% 0;
    transform-origin: 50% 0;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
  }

  a:hover:before {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

h1 {
  font-size: 1.6em;
  margin: 0;
}

.title {
  display: flex;
  align-items: center;
  gap: 0.5em;
  margin: 0;
}

img {
  height: 2em;
}

a {
  border: 2px solid var(--background);
  border-radius: 0em 0em 0.5em 0.5em;
  padding: 0.4em 0.4em;
  font-size: 1.0em;
  color: var(--text);
  text-align: center;
  text-decoration: none;
}

a:hover {
  color: var(--background);
}


ul {
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.2em;
  margin: 0 0 0 auto;
}

li {
  font-weight: bold;
}

.filled {
  background-color: var(--accent);
  color: var(--background);
}
</style>
