import { useState, useCallback } from 'react';
import { Pane, TextInput, Button } from 'evergreen-ui';

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
    layout: [background({ defaultPlugin: slate(), })],
};

function NewRulePage(props) {
    const [ editorValue, setEditorValue ] = useState();
    const [ title, setTitle ] = useState('');

    const saveRule = useCallback(async () => {
        await apiProvider.postRule({
            content: editorValue,
            title,
            href: title.toLowerCase().replace(/ /g, '_'),
        });
    });

    return (
        <Pane padding="2em" minHeight="50em">
            <Pane
                marginBottom="2em"
                width="100%"
            >
                <TextInput
                    placeholder="Input title here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                value={editorValue}
                onChange={setEditorValue}
                defaultPlugin={slate()}
            />
        </Pane>
    );
}

NewRulePage.getInitialProps = async () => {
    console.log('getInitialProps')
}

export default NewRulePage;
