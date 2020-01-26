import React, { ReactElement } from 'react';
import {
    TextInput, Table, Button, Spinner,
} from 'evergreen-ui';
import { IVocabularyItem } from '../../types/vocabulary';

interface IAddItemRowProps {
    word: IVocabularyItem['word'];
    onChangeWord: (value: IVocabularyItem['word']) => void;
    translation: IVocabularyItem['translation'];
    onChangeTranslation: (value: IVocabularyItem['translation']) => void;
    example: IVocabularyItem['example'];
    onChangeExample: (value: IVocabularyItem['example']) => void;
    onAdd: () => void;
    isPending: boolean;
}

function AddItemRow(props: IAddItemRowProps): ReactElement {
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChangeWord(e.target.value)}
                />
            </Table.Cell>

            <Table.Cell>
                <TextInput
                    placeholder="Translation"
                    value={translation}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChangeTranslation(e.target.value)}
                />
            </Table.Cell>

            <Table.Cell>
                <TextInput
                    placeholder="Example"
                    value={example}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => onChangeExample(e.target.value)}
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