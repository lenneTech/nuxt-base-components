<script lang="ts" setup>
import {ErrorMessage, useField} from 'vee-validate';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
    defineProps<{
      disabled?: boolean;
      info?: string;
      infoDisabled?: string;
      label?: string;
      modelValue?: boolean;
      name: string;
      standalone?: boolean;
    }>(),
    {
      disabled: false,
      standalone: false,
    },
);

const attributes = useAttrs() as { class: string };

const {meta, setTouched, setValue, value} = useField(() => props.name, undefined, {
  controlled: !props.standalone,
  initialValue: props.standalone ? props.modelValue : undefined,
  syncVModel: props.standalone,
});

function handleInput(value: boolean) {
  setValue(value, meta.validated);
  setTouched(true);
}
</script>

<template>
  <div class="relative flex items-center gap-2">
    <div
        :class="{ 'pointer-events-none cursor-not-allowed opacity-50 ': disabled }"
        class="flex items-center gap-4 cursor-pointer"
        @click.prevent.stop="handleInput(!value)"
    >
      <div class="flex justify-between items-center">
        <div
            :class="{ 'bg-primary-400': value }"
            class="w-10 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
        >
          <div
              :class="{ 'translate-x-3': value }"
              class="bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out"
          ></div>
        </div>
      </div>
      <label
          v-if="label"
          :class="attributes.class"
          :for="name"
          class="text-base font-medium leading-6 text-foreground flex items-center gap-2"
      >{{ label }}{{ meta.required ? '*' : '' }}
      </label>
    </div>
    <Tooltip v-if="info || infoDisabled" :text="disabled ? infoDisabled : info"
    ><span class="i-bi-info-circle flex items-center"></span
    ></Tooltip>
    <ErrorMessage v-if="meta.validated" :name="name" class="absolute -bottom-2.5 text-xs font-light text-red-600"/>
  </div>
</template>
