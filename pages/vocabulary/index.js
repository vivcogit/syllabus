import { useState, useEffect } from 'react';
import {
    Heading, Pane, Table, TextInput, Button,
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
    const [ data, setData ] = useState([]);

    useEffect(() => {
        setData(vocabulary);
    }, true);

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

Vocabulary.getInitialProps = ({req}) => apiProvider.getVocabulary(req);

Vocabulary.defaultProps = {
    vocabulary: [],
};

export default Vocabulary;
