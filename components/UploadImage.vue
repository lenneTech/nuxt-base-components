<script lang="ts" setup>
import {ErrorMessage, useField} from 'vee-validate';

import ModalCroppingImage from '~/components/CroppingModal.vue';

const props = withDefaults(
    defineProps<{
      accept?: string;
      cropping?: boolean;
      disabled?: boolean;
      label?: string;
      maxSize?: number;
      multiple?: boolean;
      name: string;
      readonly?: boolean;
      required?: boolean;
      tabindex?: string;
      validateOnInput?: boolean;
    }>(),
    {
      accept: 'image/*',
      maxSize: 4000000,
      multiple: false,
      readonly: false,
      validateOnInput: false,
    },
);

const config = useRuntimeConfig();
const {close, open} = useModal();
const {errors, handleBlur, meta, setErrors, setTouched, setValue, value} = useField(() => props.name);

const blob = ref<string>('');
const input = ref<HTMLElement>();

if (value.value) {
  await getPreviewUrl(value.value as string);
}

watch(
    () => value.value,
    async () => {
      await getPreviewUrl(value.value as string);
    },
);

async function handleInput(e: any) {
  if (!e) {
    blob.value = '';
    return;
  }
  const file = e.target.files[0];

  if (file.size > props.maxSize) {
    setErrors('Das Bild darf nicht größer als ' + props.maxSize / 1000000 + 'MB sein.');
    return;
  }

  if (props.cropping) {
    // open cropper modal
    open({
      component: ModalCroppingImage,
      data: {
        confirm: async (croppedFile: File | null) => {
          if (!croppedFile) {
            close();
            return;
          }
          // There is an error that is not affecting the function
          value.value = croppedFile;
          await getPreviewUrl(croppedFile);
          close();
        },
        img: file,
      },
      size: 'lg',
    });
  } else {
    setValue(file, meta.validated);
    await getPreviewUrl(file);
  }
}

async function getPreviewUrl(src: File | string) {
  if (!src) {
    blob.value = '';
    return;
  }

  const validHexChars = /^[0-9a-fA-F]{24}$/;
  if (typeof src === 'object' && validHexChars.test(src?.id)) {
    blob.value = config.public.apiUrl + '/files/' + src.id;
  } else if (typeof src === 'string' && validHexChars.test(src)) {
    blob.value = config.public.apiUrl + '/files/' + src;
  } else if (typeof src === 'string') {
    blob.value = src;
  } else if (src instanceof File) {
    blob.value = URL.createObjectURL(src);
  }
}
</script>

<template>
  <div class="mt-4">
    <div class="flex justify-between">
      <label v-if="label" :for="name" class="block text-base font-medium leading-6 text-foreground"
      >{{ label }}{{ meta.required ? '*' : '' }}</label
      >
      <slot name="suffix"></slot>
    </div>
    <div class="relative mt-2 pb-3 flex flex-col h-[183px]">
      <div v-show="!blob" class="flex h-full gap-2">
        <div
            :class="{
            'border-red-500': errors?.length,
          }"
            class="border-dashed border-primary border relative w-full rounded-lg"
        >
          <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex flex-col items-center">
              <span class="i-bi-upload mb-6 text-primary text-3xl"></span>
              <div class="text-center">Bild hier ablegen /</div>
              <div class="text-center">Klicken zum Hochladen</div>
            </div>
          </div>
          <input
              :id="name"
              ref="input"
              :accept="accept"
              :disabled="disabled"
              :multiple="multiple"
              :name="name"
              :tabindex="tabindex"
              class="opacity-0 h-full w-full cursor-pointer"
              type="file"
              @blur="handleBlur"
              @focus="setTouched(true)"
              @input="handleInput"
          />
        </div>
      </div>
      <div
          v-if="blob"
          class="border border-black border-dashed rounded-lg flex justify-center cursor-pointer"
          @click="input?.click()"
      >
        <img :src="blob" alt="Bild" class="h-[183px]"/>
      </div>

      <ErrorMessage :name="name" class="absolute -bottom-2.5 text-xs font-light text-red-600"/>
    </div>
  </div>
</template>

<style scoped>
::file-selector-button {
  cursor: pointer;
}
</style>
