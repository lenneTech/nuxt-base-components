<script lang="ts" setup>

import BlockRegister from "../../../blocks/BlockRegister.vue";
</script>

<template>
  <Story
      :layout="{ type: 'single', iframe: false }"
      title="Blocks/Register/Register"
  >
    <Variant title="Default">
      <BlockRegister></BlockRegister>
    </Variant>
    <Variant title="With SSO">
      <BlockRegister enable-sso></BlockRegister>
    </Variant>
  </Story>
</template>
