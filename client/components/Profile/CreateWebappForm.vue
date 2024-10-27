<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <Modal :isVisible="isModalVisible" @close="isModalVisible = false">
      <h2>Hello from the Modal!</h2>
      <p>This is your modal content.</p>
    </Modal>
  </div>
</template>

<script>
import Modal from './AddWebappModal.vue';

export default {
  components: {
    Modal
  },
  data() {
    return {
      isModalVisible: false
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
    }
  }
};
</script>
