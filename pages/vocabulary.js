import { useState } from 'react';
import { Heading, Pane, Table } from 'evergreen-ui';

import apiProvider from '../providers/api';

function Vocabulary(props) {
    const { vocabulary } = props;
    const [ filter, setFilter ] = useState('');

    const usedVocabulary = vocabulary.filter((item) => (
        !filter
            || item.word.indexOf(filter) >= 0
            || item.translate.indexOf(filter) >= 0
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
                <Table.Head>
                    <Table.SearchHeaderCell
                        value={filter}
                        onChange={setFilter}
                    />

                    <Table.TextHeaderCell>
                        Translate
                    </Table.TextHeaderCell>
                    <Table.TextHeaderCell>
                        Example
                    </Table.TextHeaderCell>
                </Table.Head>

                <Table.Body>
                    {usedVocabulary.map((row) => (
                        <Table.Row key={row.word}>
                            <Table.TextCell>{row.word}</Table.TextCell>
                            <Table.TextCell>{row.translate}</Table.TextCell>
                            <Table.TextCell>{row.example}</Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </Pane>
    );
}

Vocabulary.getInitialProps = apiProvider.getVocabulary;

Vocabulary.defaultProps = {
    vocabulary: [],
};

export default Vocabulary;
