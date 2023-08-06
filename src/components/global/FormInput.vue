<script setup lang="ts">
import { computed, ref } from "vue";

const props = defineProps<{
  title?: string;
  button?: {
    isEnable?: boolean;
    title?: string;
  };
}>();

const emit = defineEmits<{ (e: "receive", text: string): string }>();

const text = ref("");
const active = ref(false);

const reset = () => {
  text.value = "";
};

const isEnableMemo = computed(() => props.button?.isEnable ?? false);
</script>

<template>
  <form @submit="emit('receive', text)">
    <div
      :class="$style.input"
      :style="isEnableMemo ? 'width: 76%;' : 'width: 96%;'"
    >
      <p :class="{ [$style.active]: text || active }">{{ title }}</p>
      <input
        v-model="text"
        @focus="active = true"
        @blur="[(active = false), isEnableMemo || emit('receive', text)]"
      />
      <i class="icon-cancel" @click="reset"></i>
    </div>
    <a
      @click="emit('receive', text)"
      :class="$style.submit"
      v-text="button?.title"
      v-show="isEnableMemo"
    >
    </a>
  </form>
</template>

<style module lang="scss">
form {
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;

  font-size: 120%;

  border-radius: var(--default-border-radius);

  .input {
    position: relative;

    padding: 0 2% 0 2%;

    input {
      width: 90%;
      height: 1em;

      padding: 0 1% 1% 1%;

      font-size: 70%;
    }
    p,
    .active {
      position: absolute;

      animation-duration: 0.2s;
      animation-fill-mode: forwards;
    }
    p {
      animation-name: unfocus;
      font-size: 40%;
      left: 7px;
    }
    i {
      position: absolute;
      right: 0;
      width: auto;
    }
    .active {
      animation-name: focus;
      font-size: 60%;
    }
  }
  .submit {
    width: 20%;

    text-align: center;
    font-weight: 600;
    font-size: 70%;

    user-select: none;
  }
}
/* background color */
.submit,
input,
form {
  background-color: var(--true-button-color);
}
/* Animation */
@keyframes focus {
  0% {
    font-size: 60%;
  }
  100% {
    font-size: 40%;
  }
}
@keyframes unfocus {
  0% {
    font-size: 40%;
  }
  100% {
    font-size: 60%;
  }
}
</style>
