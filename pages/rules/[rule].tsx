import { useEffect, useState, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Pane } from 'evergreen-ui';
import ReactMarkdown from 'react-markdown';

import apiProvider from '../../providers/api';

function RulePage(): ReactElement {
    const [ rule, setRule ] = useState();
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
        <Pane
            paddingLeft="2em"
            paddingBottom="2em"
        >
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
        </Pane>
    );
}

export default RulePage;
