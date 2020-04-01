import React, { ReactElement } from 'react';
import {
    TextInput, Table, Spinner,
} from 'evergreen-ui';
import Button from '../Button';
import { VocabularyItem } from '../../entities/Vocabulary';

interface AddItemRowProps {
    word: VocabularyItem['word'];
    onChangeWord: (value: VocabularyItem['word']) => void;
    translation: VocabularyItem['translation'];
    onChangeTranslation: (value: VocabularyItem['translation']) => void;
    example: VocabularyItem['example'];
    onChangeExample: (value: VocabularyItem['example']) => void;
    onAdd: () => void;
    isPending: boolean;
}

function AddItemRow(props: AddItemRowProps): ReactElement {
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