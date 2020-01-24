import { Menu } from 'evergreen-ui';

export interface MyMenuGroupProps {
    title: string,
    children: React.ReactNode,
};

function MyMenuGroup(props) {
    const { title, children } = props;

    return (
        <Menu.Group title={title}>
            {children}
        </Menu.Group>
    );
}

export default MyMenuGroup;
