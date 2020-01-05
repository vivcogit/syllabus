import { Pane, Heading, } from 'evergreen-ui';

import Menu from '../menu';

function Page(props) {
    const { children, title, menu } = props;
    
    return (
        <Pane
            display="flex"
            alignItems="baseline"
        >
            <Pane
                border="default"
                flexBasis="200px"
            >
                <Menu menu={menu} />
            </Pane>

            {children}
        </Pane>
    );
}

export default Page;