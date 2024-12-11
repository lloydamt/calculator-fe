<template>
  <div class="container">
    <div class="calculator">
      <div class="display">{{ result }}</div>
      <div class="calculator-inputs">
        <input
          type="number"
          name="firstNumber"
          class="calc-input"
          v-model="userInput"
        />
        <input
          type="number"
          name="secondNumber"
          class="calc-input"
          v-model="userInput2"
        />
      </div>
      <div class="calculator-buttons">
        <button class="button" @click="performOperation('+')">+</button>
        <button class="button" @click="performOperation('-')">-</button>
        <button class="button" @click="performOperation('*')">*</button>
        <button class="button" @click="performOperation('/')">/</button>
      </div>
      <button class="clear" @click="clear">Clear</button>
    </div>
  </div>
  <ErrorModal :isOpen="isErrorModalOpen" @clearError="clearError">{{
    errorMessage
  }}</ErrorModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ErrorModal from "./ErrorModal.vue";

const OPERATIONS: Record<string, (...args: any[]) => number> = {
  "+": (value1: number, value2: number) => value1 + value2,
  "-": (value1: number, value2: number) => value1 - value2,
  "*": (value1: number, value2: number) => value1 * value2,
  "/": (value1: number, value2: number) => value1 / value2,
};

const result = ref(0);
const userInput = ref(0);
const userInput2 = ref(0);
const isErrorModalOpen = ref(false);
const errorMessage = ref("");

function performOperation(operation: string): void {
  result.value = OPERATIONS[operation](
    Number(userInput.value),
    Number(userInput2.value)
  );

  if (result.value === Infinity) {
    isErrorModalOpen.value = true;
    errorMessage.value = "Cannot divide by 0";
    clear();
    return;
  }

  userInput.value = result.value;
  userInput2.value = 0;
}

function clear(): void {
  result.value = 0;
  userInput.value = 0;
  userInput2.value = 0;
}

function clearError(): void {
  isErrorModalOpen.value = false;
  errorMessage.value = "";
}
</script>

<style scoped>
.container {
  width: 300px;
  height: 400px;
  margin: 50px auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.display {
  height: 60px;
  background-color: #eaeaea;
  max-width: 100%;
  border-radius: 5px;
  font-size: 24px;
  text-align: right;
  padding: 10px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.calculator-inputs {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: 50px;
}

.calc-input {
  flex: 1;
  height: 40px;
  font-size: 18px;
  max-width: 50%;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px;
}

.calculator-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.button,
.clear {
  height: 50px;
  background-color: #0078d4;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

.clear {
  background-color: #db4932;
  margin: 50px;
  width: 100px;
}

.button:hover {
  background-color: #db4932;
}
</style>
