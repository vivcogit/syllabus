import Link from 'next/link';
import { Menu, Link as LinkUI, } from 'evergreen-ui';
import { ReactElement } from 'react';

interface MyMenuLinkProps {
    title: string;
    href: string;
}

function MyMenuLink(props: MyMenuLinkProps): ReactElement {
    const { title, href } = props;

    return (
        <Menu.Item>
            <Link href={href}>
                <LinkUI>{title}</LinkUI>
            </Link>
        </Menu.Item>
    );
}

export default MyMenuLink;
