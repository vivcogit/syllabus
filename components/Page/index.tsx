import { Pane } from 'evergreen-ui';

import MyMenu from '../MyMenu';
import { IMenuData } from '../../types/menu';
import { ReactElement } from 'react';

interface IPageProps {
    children: React.ReactNode;
    menu: IMenuData;
}

function Page(props: IPageProps): ReactElement {
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