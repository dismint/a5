<template>
  <div class="modal-overlay" @click="close" v-if="visible">
    <div class="modal-content" @click.stop>
      <button class="modal-close" @click="close">X</button>
      <!-- Slot for custom modal content -->
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: var(--background);
  border: 1px solid var(--accent);
  padding: 20px;
  border-radius: 8px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
