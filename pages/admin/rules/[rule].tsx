import { useState, useCallback, ReactElement } from 'react';
import { Pane, TextInput, Button, toaster } from 'evergreen-ui';

import Editor from '@react-page/editor';
import '@react-page/core/lib/index.css';
import '@react-page/ui/lib/index.css';

import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';
import background from '@react-page/plugins-background';
import '@react-page/plugins-background/lib/index.css';

import apiProvider from '../../../providers/api';
import { IRule } from '../../../types/rule';
import { NextPageContext } from 'next';

const plugins = {
    content: [slate()],
    layout: [background({ defaultPlugin: slate(), imageUpload: null })],
};

interface IAdminRulePageProps {
    rule: IRule;
}

function AdminRulePage(props: IAdminRulePageProps): ReactElement {
    const { rule } = props;

    const [ content, setContent ] = useState(rule?.content);
    const [ title, setTitle ] = useState(rule?.title || '');

    const saveRule = useCallback(async () => {
        const ruleForSave: IRule = {
            content,
            title,
            href: title.toLowerCase().replace(/ /g, '_'),
        };

        const isUpdateExisted = !!rule._id;
 
        try {
            let result;

            if (isUpdateExisted) {
                result = await apiProvider.putRule({ ...rule, ...ruleForSave });
            } else {
                result = await apiProvider.postRule(ruleForSave);
            }

            console.log(result);
            toaster.success(`Rule was ${isUpdateExisted ? 'updated' : 'created'} successfully`);
        } catch (error) {
            console.error(error);
            toaster.danger(`Something went wrong trying to ${isUpdateExisted ? 'update' : 'create new'} rule`);
        }
    }, [content, title]);

    return (
        <Pane padding="2em" minHeight="50em">
            <Pane
                marginBottom="2em"
                width="100%"
            >
                <TextInput
                    placeholder="Input title here..."
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setTitle(e.target.value)}
                />

                <Button
                    marginLeft="1em"
                    appearance="primary"
                    intent="success"
                    disabled={!title}
                    onClick={saveRule}
                >
                    Save rule
                </Button>
            </Pane>

            <Editor
                plugins={plugins}
                value={content}
                onChange={setContent}
                defaultPlugin={slate()}
            />
        </Pane>
    );
}

AdminRulePage.getInitialProps = async ({ query, req }: NextPageContext): Promise<IAdminRulePageProps> => {
    if (query.rule !== 'new') {
        const ruleHref = Array.isArray(query.rule) ? query.rule[0] : query.rule;
        const rule = await apiProvider.getRule(ruleHref, req);
        return { rule };
    }
}

export default AdminRulePage;
