import { ReactElement } from 'react';

import MyMenu from '../MyMenu';
import { IMenuData } from '../../types/menu';

import './page.scss';

interface IPageProps {
    children: React.ReactNode;
    menu: IMenuData;
}

function Page(props: IPageProps): ReactElement {
    const { children, menu } = props;
    
    return (
        <div className="page">
            <div className="page-menu">
                <MyMenu menu={menu} />
            </div>

            {children}
        </div>
    );
}

export default Page;