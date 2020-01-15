import React from 'react';
import {
    TextInput, Table, Button, Spinner,
} from 'evergreen-ui';

function AddItemRow(props) {
    const {
        word, onChangeWord,
        translation, onChangeTranslation,
        example, onChangeExample,
        onAdd, isPending,
    } = props;

    return (
        <Table.Row>
            <Table.Cell>
                <TextInput
                    placeholder="Word"
                    value={word}
                    onChange={(e) => onChangeWord(e.target.value)}
                    />
            </Table.Cell>

            <Table.Cell>
                <TextInput
                    placeholder="Translation"
                    value={translation}
                    onChange={(e) => onChangeTranslation(e.target.value)}
                    />
            </Table.Cell>

            <Table.Cell>
                <TextInput
                    placeholder="Example"
                    value={example}
                    onChange={(e) => onChangeExample(e.target.value)}
                />
            </Table.Cell>

            <Table.Cell>
                <Button
                    onClick={isPending ? null : onAdd}
                    disabled={isPending}
                >
                    {isPending
                        ? <Spinner size={16} />
                        : 'Add'
                    }
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}

export default AddItemRow;