<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { ErrorMessage, useField } from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
      height?: string;
      label?: string;
      modelValue?: string;
      name: string;
      placeholder?: string;
      readOnly?: boolean;
      standalone?: boolean;
      toolbar?: string;
    }>(),
    {
      height: '500px',
      readOnly: false,
      standalone: false,
      toolbar: 'essential',
    },
);

const { errors, handleBlur, meta, setTouched, setValue, value } = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.standalone ? props.modelValue : undefined,
  syncVModel: props.standalone,
});
const editor = ref<any>(null);

watch(
    () => value.value,
    () => {
      const content = editor.value?.getContents();

      if (content !== value.value) {
        editor.value?.setContents(value.value);
        setTouched(false);
      }
    },
);

function handleInput(content: any) {
  setValue(content, meta.validated);
}

const attributes = useAttrs() as { class: string };
</script>

<template>
  <div class="mt-4">
    <div class="flex justify-between">
      <label
          v-if="label"
          :for="name"
          class="block text-base font-medium leading-6 text-foreground"
          :class="attributes.class"
      >{{ label }}{{ meta.required ? '*' : '' }}</label
      >
      <slot name="suffix"></slot>
    </div>
    <div class="relative mt-2 pb-3 text-left">
      <ClientOnly>
        <div :class="{ 'ring-1 !ring-error !text-error': meta.validated && errors?.length }">
          <QuillEditor
              ref="editor"
              :content="value"
              :toolbar="toolbar"
              content-type="html"
              :placeholder="placeholder"
              :read-only="readOnly"
              theme="snow"
              @blur="handleBlur"
              @focus="setTouched(true)"
              @update:content="handleInput"
          />
        </div>
      </ClientOnly>
      <ErrorMessage v-if="meta.validated" class="absolute -bottom-2.5 text-xs font-light text-red-600" :name="name" />
    </div>
  </div>
</template>

<style>
.ql-toolbar.ql-snow {
  border-radius: 8px 8px 0 0;
}

.ql-container.ql-snow {
  border-radius: 0 0 8px 8px;
  height: v-bind('height');
}
</style>
