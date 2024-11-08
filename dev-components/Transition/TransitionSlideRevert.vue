<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
      leaveDuration?: `${number}` | number;
      startDuration?: `${number}` | number;
    }>(),
    {
      leaveDuration: 500,
      startDuration: 500,
    },
);
</script>

<template>
  <div :style="`--start-duration: ${props.startDuration}ms; --leave-duration: ${props.leaveDuration}ms;`">
    <Transition
        enter-active-class="transition ease-out duration-[--start-duration]"
        enter-from-class="transform -translate-x-full"
        enter-to-class="transform translate-x-0"
        leave-active-class="transition ease-in duration-[--leave-duration]"
        leave-from-class="transform translate-x-0"
        leave-to-class="transform -translate-x-full"
    >
      <slot></slot>
    </Transition>
  </div>
</template>
