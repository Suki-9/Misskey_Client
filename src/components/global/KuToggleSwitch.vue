<script setup lang="ts">
const v = defineModel<boolean>({
  required: true,
});
defineProps<{
  label?: string;
}>();
</script>

<template>
  <div :class="$style.root">
    <p>{{ label }}</p>
    <input type="checkbox" id="switch" v-model="v" />
    <label for="switch"></label>
  </div>
</template>

<style module lang="scss">
p {
  margin-right: 0.2em;
}
div.root {
  display: flex;
  box-sizing: content-box;

  input[type="checkbox"] {
    display: none;

    &:checked {
      & + label:after {
        left: 100%;
        translate: -100%;
        background: white;
      }
      & + label {
        background: var(--accent-color);
      }
    }
  }

  label {
    display: block;
    box-sizing: content-box;
    position: relative;
    cursor: pointer;
    border-radius: 100vmax;
    background: grey;
    width: 2.8em;
    height: 1.4em;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 9999px;
      box-sizing: border-box;
      border: 0px solid #000;
      background: white;
      transition: 0.3s;
      scale: 90%;

      &:after {
        aspect-ratio: 1.4 / 1;
      }
    }
  }
}
</style>
