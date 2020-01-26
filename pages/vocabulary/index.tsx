import { useState, useEffect, useCallback } from 'react';
import {
    Heading, Pane, Table, TextInput, Button, toaster,
} from 'evergreen-ui';

import apiProvider from '../../providers/api';
import AddItemRow from '../../components/Vocabulary/AddItemRow';
import TableHead from '../../components/Vocabulary/TableHead';
import { IVocabulary } from '../../types/vocabulary';
import { NextPageContext } from 'next';

interface VocabularyProps {
    vocabulary: IVocabulary,
};

function Vocabulary(props: VocabularyProps) {
    const { vocabulary } = props;

    const [ filter, setFilter ] = useState('');
    const [ word, setWord ] = useState('');
    const [ translation, setTranslation ] = useState('');
    const [ example, setExample ] = useState('');
    const [ isPending, setIsPending ] = useState(false);
    const [ data, setData ] = useState([]);

    useEffect((): void => {
        setData(vocabulary);
    }, []);

    const addItem: () => void = useCallback(async () => {
        setIsPending(true);

        const newItem = {
            translation,
            word,
            example,
        };
        
        try {
            await apiProvider.postVocabularyItem(newItem);
            
            toaster.success('Word was created successfully');
            setWord('');
            setTranslation('');
            setExample('');
        } catch (error) {
            console.error(error);
            toaster.danger('Something went wrong trying to create new rule');
        }
        setIsPending(false);
    }, [translation, word, example]);

    const usedVocabulary: IVocabulary = data.filter((item) => (
        !filter
            || item.word.indexOf(filter) >= 0
            || item.translation.indexOf(filter) >= 0
    ));

    return (
        <Pane
            padding="1em"
            flexGrow={1}
        >
            <Heading
                as="h1"
                size={900}
                marginBottom="2em"
            >
                Vocabulary
            </Heading>

            <Table maxWidth="50em">
                <TableHead
                    filter={filter}
                    onChangeFilter={setFilter}
                />

                <Table.Body>
                    <AddItemRow
                        word={word}
                        example={example}
                        translation={translation}
                        onChangeWord={setWord}
                        onChangeTranslation={setTranslation}
                        onChangeExample={setExample}
                        onAdd={addItem}
                        isPending={isPending}
                    />

                    {usedVocabulary.map((row) => (
                        <Table.Row key={row.word}>
                            <Table.TextCell>{row.word}</Table.TextCell>
                            <Table.TextCell>{row.translation}</Table.TextCell>
                            <Table.TextCell>{row.example}</Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Pane>
    );
}

Vocabulary.getInitialProps = async ({ req }: NextPageContext) => ({
    vocabulary: await apiProvider.getVocabulary(req),
});

Vocabulary.defaultProps = {
    vocabulary: [],
};

export default Vocabulary;
