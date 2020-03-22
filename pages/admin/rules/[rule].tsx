import { useState, useCallback, ReactElement } from 'react';
import { Pane, TextInput, toaster } from 'evergreen-ui';
import ReactMarkdown from 'react-markdown';

import apiProvider from '../../../providers/api';
import { IRule } from '../../../types/rule';
import { NextPageContext } from 'next';
import { Textarea } from '../../../components/Textarea';
import Button from '../../../components/Button';

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

        const isUpdateExisted = !!rule?._id;
 
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
                    className="adminRule-submit"
                    disabled={!title}
                    onClick={saveRule}
                >
                    Save rule
                </Button>
            </Pane>

            <Textarea
                placeholder="Input content here..."
                value={content}
                onChange={setContent}
            />

            <ReactMarkdown
                source={content}
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
    return { rule: { title: '', content: '', href: '' } };
}

export default AdminRulePage;
