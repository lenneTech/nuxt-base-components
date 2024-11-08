<script generic="T" lang="ts" setup>
import type {ColumnDef, SortingState, Table} from '@tanstack/vue-table';
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  useVueTable,
} from '@tanstack/vue-table';
import {tv} from 'tailwind-variants';

import FormCheck from '~/components/Form/FormCheckbox.vue';
import FormToggle from '~/components/Form/FormToggle.vue';

defineOptions({inheritAttrs: false});

const props = withDefaults(
    defineProps<{
      ascIcon?: string;
      class?: any;
      columns?: ColumnDef<T>[];
      data?: T[];
      descIcon?: string;
      search?: string;
      showSearch?: boolean;
      showSelect?: boolean;
      showToggle?: boolean;
      sorting?: SortingState;
      tableClass?: any;
      unsortedIcon?: string;
    }>(),
    {
      ascIcon: 'i-bi-chevron-up',
      columns: () => [],
      data: () => [],
      descIcon: 'i-bi-chevron-down',
      sorting: () => [],
      unsortedIcon: 'i-bi-chevron-expand',
    },
);

const emit = defineEmits<{
  ready: [table: Table<T>];
  rowSelection: [selection: RowSelectionState];
  search: [search: string];
}>();

const styles = tv({
  base: 'w-full overflow-x-auto',
});

const checkBoxHeader: ColumnDef<any> = {
  cell: ({row}) => {
    return h(
        'div',
        h(FormCheck, {
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
    return h(
        'div',
        h(FormCheck, {
          ariaLabel: 'Select all',
          modelValue: table.getIsAllRowsSelected() ? true : table.getIsSomeRowsSelected() ? 'indeterminate' : false,
          name: 'select-all',
          'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
          standalone: true,
        }),
    );
  },
  id: 'checkbox',
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
  size: 50,
};

const localColumns: ColumnDef<T>[] = [...props.columns];
if (props.showSelect) {
  localColumns.unshift(checkBoxHeader);
}

if (props.showToggle) {
  localColumns.unshift(toggleHeader);
}

const localSorting = ref(props.sorting);
const globalFilter = ref(props.search);
const rowSelection = ref<RowSelectionState>({});

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
  enableRowSelection: () => props.showSelect || props.showToggle,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
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
  <div class="space-y-5">
    <div
        :class="showSearch ? 'justify-between' : 'justify-end'"
        class="flex flex-col items-center gap-5 md:flex-row md:items-center"
    >
      <FormInput
          v-if="showSearch"
          :icon-submit="true"
          :key-submit="true"
          :model-value="search"
          :standalone="true"
          container-class="pb-0 !mt-0"
          name="search"
          placeholder="Suchen"
          suffix-icon="i-bi-search"
          wrapper-class="mt-0 min-w-72"
          @submit="emit('search', $event)"
          @update:modelValue="emit('search', $event)"
      />

      <div class="flex items-center gap-2">
        <slot name="actions"></slot>
      </div>
    </div>

    <div>
      <div :class="styles({ class: props.class })">
        <TableRaw
            :class="tableClass"
            :style="{
            width: table.getCenterTotalSize(),
          }"
        >
          <TableHeader class="sticky top-0 bg-zinc-100 z-40">
            <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
                class="bg-gradient-to-r from-white to-gradient"
            >
              <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :class="[header.column.getCanSort() && 'cursor-pointer select-none relative']"
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

          <TableBody class="overflow-y-auto">
            <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() ? 'selected' : ''"
            >
              <TableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  :style="{ width: cell.column.getSize() !== 0 ? `${cell.column.getSize()}px` : 'auto' }"
                  class="relative"
              >
                <FlexRender :props="cell.getContext()" :render="cell.column.columnDef.cell"/>
              </TableCell>
            </TableRow>

            <TableEmpty v-if="table.getRowModel().rows.length === 0" :colspan="table.getAllLeafColumns().length">
              <slot :table="table" name="empty"> No data available.</slot>
            </TableEmpty>
          </TableBody>
        </TableRaw>
      </div>
    </div>
  </div>
</template>
