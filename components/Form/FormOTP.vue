<script lang="ts" setup>
import { ErrorMessage, useField } from 'vee-validate';
import { ref, watch } from 'vue';

const props = defineProps<{
  fields: number;
  name: string;
}>();

const emit = defineEmits<{
  submit: () => void;
}>();

const data = ref([]);
const firstInputEl = ref(null);

const { meta, setValue, value } = useField(() => props.name);

watch(
  () => data,
  (newVal) => {
    if (newVal.value != '' && newVal.value.length === props.fields && !newVal.value.includes('')) {
      setValue(newVal.value.join(''));
    } else {
      setValue(null);
    }

    if (newVal.value.length === props.fields && !newVal.value.includes('')) {
      emit('submit');
    }
  },
  { deep: true },
);

const handleOtpInput = (e) => {
  if (e.data && e.target.nextElementSibling) {
    e.target.nextElementSibling.focus();
  } else if (e.data == null && e.target.previousElementSibling) {
    e.target.previousElementSibling.focus();
  }
};

const handlePaste = (e) => {
  const pasteData = e.clipboardData.getData('text');
  let nextEl = firstInputEl.value[0].nextElementSibling;

  for (let i = 1; i < pasteData.length; i++) {
    if (i >= props.fields) {
      break;
    }

    if (nextEl) {
      data.value[i] = pasteData[i];
      nextEl = nextEl.nextElementSibling;
    }
  }

  setTimeout(() => {
    if (props.fields === pasteData.length || pasteData.length > props.fields) {
      firstInputEl.value[props.fields - 1]?.focus();
    } else {
      firstInputEl.value[pasteData.length]?.focus();
    }
  }, 200);
};
</script>

<template>
  <div class="otp w-full flex justify-around" @input="handleOtpInput">
    <template v-for="field in fields" :key="field">
      <input
        ref="firstInputEl"
        v-model="data[field - 1]"
        type="text"
        maxlength="1"
        class="inline-flex text-center size-14 bg-white rounded-lg border border-gray-200 justify-start items-center gap-3 text-gray-400 text-xl font-semibold"
        @paste="field === 1 && handlePaste($event)"
      />
    </template>
  </div>
  <div class="mt-2">
    <ErrorMessage v-if="meta.validated && meta.touched" class="text-xs font-light text-red-600" :name="name" />
  </div>
</template>
