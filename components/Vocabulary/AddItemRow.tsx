import React from 'react';
import {
    TextInput, Table, Button, Spinner,
} from 'evergreen-ui';

export interface AddItemRowProps {
    word: string,
    onChangeWord: (value: string) => void,
    translation: string,
    onChangeTranslation: (value: string) => void,
    example: string,
    onChangeExample: (value: string) => void,
    onAdd: () => void,
    isPending: boolean,
};

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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeWord(e.target.value)}
                />
            </Table.Cell>

            <Table.Cell>
                <TextInput
                    placeholder="Translation"
                    value={translation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeTranslation(e.target.value)}
                />
            </Table.Cell>

            <Table.Cell>
                <TextInput
                    placeholder="Example"
                    value={example}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeExample(e.target.value)}
                />
            </Table.Cell>

            <Table.Cell>
                <Button
                    onClick={isPending ? null : onAdd}
                    disabled={isPending || !word || !translation}
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