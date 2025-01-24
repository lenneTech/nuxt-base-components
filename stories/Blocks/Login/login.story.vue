<script lang="ts" setup>

import BlockLogin from "../../../blocks/BlockLogin.vue";
</script>

<template>
  <Story
      :layout="{ type: 'single', iframe: false }"
      title="Blocks/Login/Login"
  >
    <Variant title="Default">
      <BlockLogin></BlockLogin>
    </Variant>
    <Variant title="With SSO">
      <BlockLogin enable-sso></BlockLogin>
    </Variant>
  </Story>
</template>
