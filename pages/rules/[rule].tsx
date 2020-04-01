import { useEffect, useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

import apiProvider from '../../providers/api';
import { Rule } from '../../entities/Rule';

import styles from './rule.module.css';

const emptyRule: Rule = { title: '', href: '', };

function RulePage(): ReactElement {
    const [ rule, setRule ] = useState(emptyRule);
    const router = useRouter();
    const ruleHref = Array.isArray(router.query.rule)
        ? router.query.rule[0]
        : router.query.rule;

    useEffect(() => {
        async function fetchData(): Promise<void> {
            const data = await apiProvider.getRule(ruleHref);

            setRule(data);
        }

        fetchData();
    }, [ruleHref]);

    return (
        <div className={styles.page}>
            {!rule
                ? <h2>Pending of data</h2>
                : (
                    <>
                        <h2>{rule.title}</h2>

                        <ReactMarkdown
                            source={rule.content}
                        />
                    </>
                )
            }
        </div>
    );
}

export default RulePage;
