<script setup lang="ts" generic="T">
import {
  FlexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel, type RowSelectionState,
  useVueTable,
} from "@tanstack/vue-table";
import type {ColumnDef, SortingState, Table} from "@tanstack/vue-table";
import { tv } from 'tailwind-variants';

const props = withDefaults(
    defineProps<{
      data?: T[];
      columns?: ColumnDef<T>[];
      search?: string;
      sorting?: SortingState;
      tableClass?: any;
      ascIcon?: string;
      descIcon?: string;
      unsortedIcon?: string;
      class?: any;
    }>(),
    {
      columns: () => [],
      data: () => [],
      sorting: () => [],
      ascIcon: "i-bi-chevron-up",
      descIcon: "i-bi-chevron-down",
      unsortedIcon: "i-bi-chevron-expand",
    }
);

defineOptions({inheritAttrs: false});

const styles = tv({
  base: "w-full overflow-x-auto",
});

const draggableHeader: ColumnDef<any> = {
  id: "draggable",
  header: ({table}) => {
    return '';
  },
  cell: ({row}) => {
    return h(
        "span",
        {
          class: "i-bi-grip-horizontal cursor-pointer size-4 handle",
        },
    );
  },
  size: 50,
  enableSorting: false,
  enableHiding: false,
};

const localColumns: ColumnDef<T>[] = [...props.columns];
localColumns.unshift(draggableHeader);

const emit = defineEmits<{
  ready: [table: Table<T>];
  search: [search: string];
}>();

const localSorting = ref(props.sorting);
const globalFilter = ref(props.search);
const rowSelection = ref<RowSelectionState>({})

const table = useVueTable({
  get data() {
    return props.data;
  },
  get columns() {
    return localColumns;
  },
  manualPagination: true,
  initialState: {
    rowSelection: rowSelection.value,
    globalFilter: props.search,
  },
  state: {
    get sorting() {
      return localSorting.value;
    },
    get globalFilter() {
      return props.search;
    },
    get rowSelection() {
      return rowSelection.value;
    },
  },
  onSortingChange: (updaterOrValue) => {
    localSorting.value =
        typeof updaterOrValue === "function" ? updaterOrValue(localSorting.value) : updaterOrValue;
  },
  onGlobalFilterChange: (updaterOrValue) => {
    globalFilter.value =
        typeof updaterOrValue === "function" ? updaterOrValue(globalFilter.value) : updaterOrValue;
  },
  onRowSelectionChange: (updaterOrValue) => {
    rowSelection.value =
        typeof updaterOrValue === "function" ? updaterOrValue(rowSelection.value) : updaterOrValue;
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  enableSorting: false,
});

onMounted(() => {
  emit("ready", table);
});
</script>

<template>
  <div>
    <div class="flex flex-col justify-between items-center gap-5 md:flex-row md:items-center">
      <FormInput container-class="pb-0 !mt-0" suffix-icon="i-bi-search" :key-submit="true" :icon-submit="true"
                 wrapper-class="mt-0 min-w-60" name="search" placeholder="Search..." :standalone="true"
                 :modelValue="search" @update:modelValue="emit('search', $event)"
                 @submit="emit('search', $event)"></FormInput>

      <div class="flex items-center gap-2">
        <slot name="actions"></slot>
      </div>
    </div>

    <div>
      <div :class="styles({ class: props.class })">
        <TableRaw :class="tableClass">
          <TableHeader class="sticky top-0 bg-zinc-100 z-50">
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  :colspan="header.colSpan"
                  :style="{width: header.getSize() ? header.getSize() + 'px' : 'auto'}"
                  :class="[header.column.getCanSort() && 'cursor-pointer select-none']"
                  @click="header.column.getToggleSortingHandler()?.($event)"
              >
                <template v-if="!header.isPlaceholder">
                  <div class="flex items-center gap-3">
                    <FlexRender
                        :render="header.column.columnDef.header"
                        :props="header.getContext()"
                    />
                    <span
                        v-if="header.column.getCanSort() && header.column.getIsSorted() === 'asc'"
                        :class="['h-4 w-4', ascIcon]"
                    />
                    <span
                        v-else-if="header.column.getCanSort() && header.column.getIsSorted() === 'desc'"
                        :class="['h-4 w-4', descIcon]"
                    />
                    <span
                        v-else-if="header.column.getCanSort() && !header.column.getIsSorted()"
                        :class="['h-4 w-4', unsortedIcon]"
                    />
                  </div>
                </template>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableDraggableBody :rows="table.getRowModel().rows"></TableDraggableBody>
        </TableRaw>
      </div>
    </div>
  </div>
</template>