<script lang="ts" setup>
import {FlexRender} from '@tanstack/vue-table';
import {tv} from 'tailwind-variants';
import Draggable from 'vuedraggable';

const props = defineProps<{
  class?: string;
  rows: any[];
}>();

const emit = defineEmits<{
  (event: 'end', value: any[]): void;
}>();

const styles = tv({
  base: '[&_tr:last-child]:border-0',
});

const dragOptions = computed(() => {
  return {animation: 200, disabled: false, ghostClass: 'ghost', group: 'description'};
});

const list = ref(props.rows);

watch(
    () => props.rows,
    () => {
      list.value = props.rows;
    },
);
</script>

<template>
  <Draggable v-model="list" handle=".handle" item-key="id" tag="tbody" v-bind="dragOptions" @end="emit('end', list)">
    <template #item="{ element }">
      <TableRow :data-state="element.getIsSelected() ? 'selected' : ''">
        <TableCell
            v-for="cell in element.getVisibleCells()"
            :key="cell.id"
            :style="{ width: cell.column.getSize() !== 0 ? `${cell.column.getSize()}px` : 'auto' }"
        >
          <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell"/>
        </TableCell>
      </TableRow>
    </template>
  </Draggable>
</template>
