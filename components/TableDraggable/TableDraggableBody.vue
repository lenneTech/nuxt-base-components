<script lang="ts" setup>
import Draggable from 'vuedraggable';
import {FlexRender} from "@tanstack/vue-table";
import { tv } from 'tailwind-variants';

const props = defineProps<{
  class?: any;
  rows: any[];
}>();

const styles = tv({
  base: "[&_tr:last-child]:border-0",
});

const dragOptions = computed(() => {
  return { animation: 200, disabled: false, ghostClass: 'ghost', group: 'description' };
});

const list = ref(props.rows);
</script>

<template>
  <Draggable
      v-bind="dragOptions"
      v-model="list"
      item-key="id"
      handle=".handle"
      tag="tbody">
    <template #item="{ element }">
      <TableRow :data-state="element.getIsSelected() ? 'selected' : ''">
        <TableCell v-for="cell in element.getVisibleCells()" :key="cell.id"
                   :style="{width: cell.column.getSize() ? cell.column.getSize() + 'px' : 'auto'}">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()"/>
        </TableCell>
      </TableRow>
    </template>
  </Draggable>
</template>
