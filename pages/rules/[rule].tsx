import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Pane } from 'evergreen-ui';

import Editor from '@react-page/editor';
import '@react-page/core/lib/index.css';
import '@react-page/ui/lib/index.css';

import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';
import background from '@react-page/plugins-background';
import '@react-page/plugins-background/lib/index.css';

import apiProvider from '../../providers/api';

const plugins = {
    content: [slate()],
    layout: [background({ defaultPlugin: slate(), imageUpload: null, })],
};

function RulePage() {
    const [ rule, setRule ] = useState();
    const router = useRouter();
    const ruleHref = router.query.rule;

    useEffect(() => {
        async function fetchData() {
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

                        <Editor
                            plugins={plugins}
                            value={rule.content}
                            defaultPlugin={slate()}
                            readOnly
                        />
                    </>
                )
            }
        </Pane>
    );
}

export default RulePage;
