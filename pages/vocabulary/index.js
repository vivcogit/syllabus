import { useState, useEffect, useCallback } from 'react';
import {
    Heading, Pane, Table, TextInput, Button, toaster,
} from 'evergreen-ui';

import apiProvider from '../../providers/api';
import AddItemRow from '../../components/vocabulary/AddItemRow';
import TableHead from '../../components/vocabulary/TableHead';

function Vocabulary(props) {
    const { vocabulary } = props;

    const [ filter, setFilter ] = useState('');
    const [ word, setWord ] = useState('');
    const [ translation, setTranslation ] = useState('');
    const [ example, setExample ] = useState('');
    const [ isPenging, setIsPending ] = useState(false);
    const [ data, setData ] = useState([]);

    useEffect(() => {
        setData(vocabulary);
    }, []);

    const addItem = useCallback(async () => {
        setIsPending(true);
        const newItem = {
            translation,
            word,
            example,
        };
        
        try {
            console.log(newItem);
            const result = await apiProvider.postVocabularyItem(newItem);
            
            console.log(result);
            toaster.success('Word was created successfully');
            setWord('');
            setTranslation('');
            setExample('');
        } catch (error) {
            console.error(error);
            toaster.danger('Something went wrong trying to create new rule');
        }
        setIsPending(false);
    });

    const usedVocabulary = data.filter((item) => (
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
                        isPenging={isPenging}
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

Vocabulary.getInitialProps = async ({ req }) => ({
    vocabulary: await apiProvider.getVocabulary(req),
});

Vocabulary.defaultProps = {
    vocabulary: [],
};

export default Vocabulary;
