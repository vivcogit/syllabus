import { Pane } from 'evergreen-ui';

import MyMenu, { MenuDataType } from '../MyMenu';

export interface PageProps {
    children: React.ReactNode,
    menu: MenuDataType,
};

function Page(props) {
    const { children, menu } = props;
    
    return (
        <Pane
            display="flex"
            alignItems="baseline"
        >
            <Pane
                border="default"
                flexBasis="200px"
            >
                <MyMenu menu={menu} />
            </Pane>

            {children}
        </Pane>
    );
}

export default Page;