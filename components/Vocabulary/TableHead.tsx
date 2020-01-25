import React from 'react';
import { Table } from 'evergreen-ui';

interface TableHeadProps {
    filter: string,
    onChangeFilter: (value: string) => void,
};

function TableHead(props: TableHeadProps) {
    const { filter, onChangeFilter } = props;

    return (
        <Table.Head>
            <Table.SearchHeaderCell
                value={filter}
                onChange={onChangeFilter}
            />

            <Table.TextHeaderCell>
                Translation
            </Table.TextHeaderCell>

            <Table.TextHeaderCell>
                Example
            </Table.TextHeaderCell>

            <Table.TextHeaderCell>
            </Table.TextHeaderCell>
        </Table.Head>
    );
}

export default TableHead;
