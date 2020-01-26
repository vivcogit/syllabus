import { ReactElement } from 'react';
import { Menu } from 'evergreen-ui';

interface IMyMenuGroupProps {
    title: string;
    children: React.ReactNode;
}

function MyMenuGroup(props: IMyMenuGroupProps): ReactElement {
    const { title, children } = props;

    return (
        <Menu.Group title={<>{title}</>}>
            {children}
        </Menu.Group>
    );
}

export default MyMenuGroup;
