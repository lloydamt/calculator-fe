<template>
  <div class="backdrop" v-if="isOpen" @click="clearError">
    <dialog open>
      <header>
        <h2>Error!</h2>
      </header>
      <main>
        <slot></slot>
      </main>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults, defineEmits } from "vue";
type Props = {
  isOpen?: boolean;
};

withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emit = defineEmits<{
  clearError: [];
}>();

function clearError() {
  emit("clearError");
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

dialog {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}
</style>
