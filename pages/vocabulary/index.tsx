import {
    useState, useEffect, useCallback, ReactElement,
} from 'react';
import {
    Table, toaster,
} from 'evergreen-ui';

import apiProvider from '../../providers/api';
import AddItemRow from '../../components/Vocabulary/AddItemRow';
import TableHead from '../../components/Vocabulary/TableHead';
import { NextPageContext } from 'next';
import { VocabularyItem } from '../../entities/Vocabulary';

import styles from './vocabulary.module.css';

interface VocabularyProps {
    vocabulary: Array<VocabularyItem>;
}

function Vocabulary(props: VocabularyProps): ReactElement {
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

        const newItem: VocabularyItem = {
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

    const usedVocabulary: Array<VocabularyItem> = data.filter((item) => (
        !filter
            || item.word.indexOf(filter) >= 0
            || item.translation.indexOf(filter) >= 0
    ));

    return (
        <div className={styles.page}>
            <h1 className={styles.header}>
                Vocabulary
            </h1>

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
                        <Table.Row key={row.id}>
                            <Table.TextCell>{row.word}</Table.TextCell>
                            <Table.TextCell>{row.translation}</Table.TextCell>
                            <Table.TextCell>{row.example}</Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

Vocabulary.getInitialProps = async ({ req }: NextPageContext): Promise<VocabularyProps> => ({
    vocabulary: await apiProvider.getVocabulary(req),
});

Vocabulary.defaultProps = {
    vocabulary: [],
};

export default Vocabulary;
