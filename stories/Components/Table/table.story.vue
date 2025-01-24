<script lang="ts" setup>
import type {ColumnDef} from "@tanstack/vue-table";
import Table from "../../../components/Table/Table.vue";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "ujmovto@tezotu.bb",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "gi@po.tz",
  },
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "ujmovto@tezotu.bb",
  },
];
const columns: ColumnDef<Payment>[] = [
  {accessorKey: "id", header: "ID"},
  {accessorKey: "amount", header: "Amount", enableHiding: true},
  {accessorKey: "email", header: "Email", enableHiding: true},
  {accessorKey: "status", header: "Status", enableHiding: true},
  {
    accessorKey: "actions",
    header: "",
    size: 80,
    enableSorting: false,
    enableHiding: false,
    // cell: ({ row }) => {
    //     return h(resolveComponent("ThreeDotMenu"), { items: menuItems }, () => [
    //         row.original.status,
    //     ]);
    // },
  },
];
</script>

<template>
  <Story :layout="{ type: 'single', iframe: false }"
         title="Components/Table/Table"
  >
    <Variant title="Default">
      <Table :columns="columns" :data="data" class="mt-5 max-h-[344px] menu-container"></Table>
    </Variant>
    <Variant title="With checkboxes">
      <Table :columns="columns" :data="data" class="mt-5 max-h-[344px] menu-container" show-select></Table>
    </Variant>
  </Story>
</template>
