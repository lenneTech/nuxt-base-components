<script generic="T" lang="ts" setup>
import type {ColumnDef, RowSelectionState, SortingState, Table} from '@tanstack/vue-table';
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from '@tanstack/vue-table';
import {tv} from 'tailwind-variants';

import FormToggle from '~/components/Form/FormToggle.vue';

defineOptions({inheritAttrs: false});

const props = withDefaults(
    defineProps<{
      ascIcon?: string;
      class?: string;
      columns?: ColumnDef<T>[];
      data?: T[];
      descIcon?: string;
      initSelection?: RowSelectionState;
      search?: string;
      showSearch?: boolean;
      showToggle?: boolean;
      sorting?: SortingState;
      tableClass?: string;
      unsortedIcon?: string;
    }>(),
    {
      ascIcon: 'i-bi-chevron-up',
      columns: () => [],
      data: () => [],
      descIcon: 'i-bi-chevron-down',
      showSearch: true,
      sorting: () => [],
      unsortedIcon: 'i-bi-chevron-expand',
    },
);

const emit = defineEmits<{
  end: [value: any];
  ready: [table: Table<T>];
  rowSelection: [selection: RowSelectionState];
  search: [search: string];
}>();

const styles = tv({
  base: 'w-full overflow-x-auto',
});

const draggableHeader: ColumnDef<any> = {
  cell: ({row}) => {
    return h('span', {
      class: 'i-bi-grip-vertical cursor-pointer size-4 handle',
    });
  },
  enableHiding: false,
  enableSorting: false,
  header: ({table}) => {
    return '';
  },
  id: 'draggable',
  size: 50,
};

const toggleHeader: ColumnDef<any> = {
  cell: ({row}) => {
    return h(
        'div',
        h(FormToggle, {
          ariaLabel: 'Select row',
          modelValue: row.getIsSelected(),
          name: 'select-row-' + row.id,
          'onUpdate:modelValue': (value) => row.toggleSelected(!!value),
          standalone: true,
        }),
    );
  },
  enableHiding: false,
  enableSorting: false,
  header: ({table}) => {
    return '';
  },
  id: 'checkbox',
  size: 20,
};

const localColumns: ColumnDef<T>[] = [...props.columns];

if (props.showToggle) {
  localColumns.unshift(toggleHeader);
}

localColumns.unshift(draggableHeader);

const localSorting = ref(props.sorting);
const globalFilter = ref(props.search);
const rowSelection = ref<RowSelectionState>(props.initSelection || {});

const table = useVueTable({
  get columns() {
    return localColumns;
  },
  get data() {
    return props.data;
  },
  defaultColumn: {
    minSize: 0,
    size: 0,
  },
  enableRowSelection: () => props.showToggle,
  enableSorting: false,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getRowId: (row) => {
    return row?.id;
  },
  getSortedRowModel: getSortedRowModel(),
  initialState: {
    globalFilter: props.search,
    rowSelection: rowSelection.value,
  },
  manualPagination: true,
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value = typeof updaterOrValue === 'function' ? updaterOrValue(globalFilter.value) : updaterOrValue;
  },
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection.value) : updaterOrValue;
  },
  onSortingChange: (updaterOrValue) => {
    localSorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(localSorting.value) : updaterOrValue;
  },
  state: {
    get globalFilter() {
      return props.search;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get sorting() {
      return localSorting.value;
    },
  },
});

watch(rowSelection, () => {
  emit('rowSelection', table.getSelectedRowModel());
});

onMounted(() => {
  emit('ready', table);
});
</script>

<template>
  <div>
    <div class="flex flex-col justify-between items-center gap-5 md:flex-row md:items-center">
      <div>
        <FormInput
            v-if="showSearch"
            :icon-submit="true"
            :key-submit="true"
            :model-value="search"
            :standalone="true"
            container-class="pb-0 !mt-0"
            name="search"
            placeholder="Search..."
            suffix-icon="i-bi-search"
            wrapper-class="mt-0 min-w-60"
            @submit="emit('search', $event)"
            @update:model-value="emit('search', $event)"
        />
      </div>

      <div class="flex items-center gap-2">
        <slot name="actions"></slot>
      </div>
    </div>
    <div>
      <div :class="styles({ class: props.class })" class="mt-5">
        <TableRaw :class="tableClass">
          <TableHeader class="sticky top-0 bg-zinc-100 z-40">
            <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
                class="bg-gradient-to-r from-white to-gradient"
            >
              <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :class="[header.column.getCanSort() && 'cursor-pointer select-none']"
                  :colspan="header.colSpan"
                  :style="{ width: header.getSize() !== 0 ? `${header.getSize()}px` : 'auto' }"
                  @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <template v-if="!header.isPlaceholder">
                  <div class="flex items-center gap-3">
                    <FlexRender :props="header.getContext()" :render="header.column.columnDef.header"/>
                    <span
                        v-if="header.column.getCanSort() && header.column.getIsSorted() === 'asc'"
                        :class="[ascIcon]"
                        class="h-4 w-4"
                    ></span>
                    <span
                        v-else-if="header.column.getCanSort() && header.column.getIsSorted() === 'desc'"
                        :class="[descIcon]"
                        class="h-4 w-4"
                    ></span>
                    <span
                        v-else-if="header.column.getCanSort() && !header.column.getIsSorted()"
                        :class="[unsortedIcon]"
                        class="h-4 w-4"
                    ></span>
                  </div>
                </template>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableDraggableBody :rows="table.getRowModel().rows" @end="emit('end', $event)"/>
        </TableRaw>
      </div>
    </div>
  </div>
</template>
