import { Pane } from 'evergreen-ui';

import MyMenu from '../MyMenu';
import { MenuData } from '../../types/menu';

export interface PageProps {
    children: React.ReactNode,
    menu: MenuData,
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