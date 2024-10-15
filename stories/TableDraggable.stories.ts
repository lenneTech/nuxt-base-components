import type {Meta, StoryObj} from '@storybook/vue3'
import {fn} from "@storybook/test";
import type {ColumnDef} from "@tanstack/vue-table";
import TableDraggable from "~/components/TableDraggable/TableDraggable.vue";

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const ActionsData = {
    onReady: fn(),
    onSearch: fn(),
};

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
    {accessorKey: "amount", header: "Amount"},
    {accessorKey: "email", header: "Email"},
    {accessorKey: "status", header: "Status"},
    {
        accessorKey: "actions",
        header: "",
        size: 80,
    },
];

/**
 * The 'TableDraggable' component is a table that allows you to drag and drop rows to reorder them.
 *
 * ## Installation
 * ```sh
 * npx @lenne.tech/cli components add TableDraggable
 * ```
 */
const meta = {
    title: 'TableDraggable',
    component: TableDraggable,
    tags: ['autodocs'],
    argTypes: {
        data: {
            description: 'Data to be displayed in the table.',
        },
        columns: {
            description: 'Columns to be displayed in the table.',
        },
        search: {
            description: 'Default search value.',
        },
        ...ActionsData,
    },
    args: {
        columns: columns,
        data: data,
        class: 'mt-5 max-h-[344px] menu-container',
    },
    parameters: {
        design: {
            type: 'figma',
            url: 'https://www.figma.com/design/ouMLQ7sXlavL934Fw17PsR/Desktop-Komponenten?node-id=500-9179&t=sQtnkQtHAtOsMV6c-4',
        },
    },
} satisfies Meta<typeof TableDraggable>

export default meta
type Story = StoryObj<typeof TableDraggable>

export const Default: Story = {
    args: {
        ...ActionsData,
    },
}
