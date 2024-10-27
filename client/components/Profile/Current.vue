<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { fetchy } from "../../utils/fetchy";
import { useToastStore } from "@/stores/toast";
import { useUserStore } from "@/stores/user";
import Modal from "@/components/Profile/ModalForm.vue";

const emit = defineEmits(["nodeAdd", "nodeEdit", "nodeDelete"]);
const props = defineProps(["node"]);
const selected = ref(false);
const name = ref("");
const description = ref("");
const url = ref("");
const tags = ref<string[]>([]);
const showModal = ref(false);
const showAdd = ref(false);

const edit1 = ref("");
const edit2 = ref("");
const edit3 = ref("");
const edit4 = ref("");
const edit5 = ref("");

const add1 = ref("");
const add2 = ref("");
const add3 = ref("");
const add4 = ref("");

watch(() => props.node, async (newVal, oldVal) => {
  const webapp = await fetchy(`/api/webapp/view`, "GET", { query: { _id: newVal } });
  const tgs = await fetchy(`/api/tag/view`, "GET", { query: { _id: newVal } });
  selected.value = true;
  name.value = webapp.name;
  description.value = webapp.description;
  url.value = webapp.url;
  tags.value = tgs;
});

async function submitForm() {
  if (edit1.value !== "") {
    const query = {
      _id: props.node,
      name: edit1.value,
    };
    await fetchy("/api/webapp", "PATCH", { query });
  }
  if (edit2.value !== "") {
    const query = {
      _id: props.node,
      description: edit2.value,
    };
    await fetchy("/api/webapp", "PATCH", { query });
  }
  if (edit3.value !== "") {
    const query = {
      _id: props.node,
      url: edit3.value,
    };
    await fetchy("/api/webapp", "PATCH", { query });
  }
  if (edit4.value !== "") {
    const query = {
      _id: props.node,
      tags: edit4.value,
    };
    await fetchy("/api/tag/add", "POST", { query });
  }
  if (edit5.value !== "") {
    const query = {
      _id: props.node,
      tags: edit5.value,
    };
    await fetchy("/api/tag/remove", "POST", { query });
  }
  edit1.value = "";
  edit2.value = "";
  edit3.value = "";
  edit4.value = "";
  edit5.value = "";
  showModal.value = false;
  emit("nodeEdit");
}

async function submitAdd() {
  var query = {
    name: add1.value,
    description: add2.value,
    url: add3.value,
  };
  const result = await fetchy("/api/webapp", "PUT", { query });
  console.log(result);
  const id = result._id;
  if (add4.value !== "") {
    const nquery = {
      _id: id,
      tags: add4.value,
    };
    await fetchy("/api/tag/add", "POST", { query: nquery });
  }
  add1.value = "";
  add2.value = "";
  add3.value = "";
  add4.value = "";
  showAdd.value = false;
  emit("nodeAdd");
}

async function deleteNode() {
  await fetchy("/api/webapp", "DELETE", { query: { _id: props.node } });
  emit("nodeDelete");
}
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
      <p>Note that tags should be no-space, comma-separated</p>
    </div>

    <div class="row buttons">
      <button v-if="selected" @click="showModal = true">Edit</button>
      <button @click="showAdd = true">Add</button>
      <button v-if="selected" @click="deleteNode">Delete</button>
    </div>
  </div>
  <Modal :visible="showModal" @close="showModal = false">
    <h1>Edit Webapp</h1>
      <div class="column">
        <form @submit.prevent="submitForm" class="column">
          <label>
            Name:
            <input type="text" v-model="edit1" />
          </label>
          
          <label>
            Description:
            <input type="text" v-model="edit2" />
          </label>
          
          <label>
            URL:
            <input type="text" v-model="edit3" />
          </label>

          <label>
            Tags to Add:
            <input type="text" v-model="edit4" />
          </label>

          <label>
            Tags to Remove:
            <input type="text" v-model="edit5" />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
  </Modal>
  <Modal :visible="showAdd" @close="showAdd = false">
    <h1>Add Webapp</h1>
      <div class="column">
        <form @submit.prevent="submitAdd" class="column">
          <label>
            Name:
            <input type="text" v-model="add1" required/>
          </label>
          
          <label>
            Description:
            <input type="text" v-model="add2" required/>
          </label>
          
          <label>
            URL:
            <input type="text" v-model="add3" required/>
          </label>

          <label>
            Tags:
            <input type="text" v-model="add4"/>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
  </Modal>
</template>

<style scoped>
.buttons {
  align-content: center;
  justify-content: center;
  align-items: center;
  font-size: 0.8em;
}
label {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
form {
  align-content: left;
  justify-content: left;
  display: flex;
  flex-direction: column;
  background-color: var(--background);
  border-radius: 1em;
  border: 1px solid var(--accent);
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  align-self: center;
  align-content: center;
  gap: 1em;
}
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
