import { useEffect, ReactElement } from 'react';
import Router from 'next/router';
import { Spinner } from 'evergreen-ui';

function Index(): ReactElement {
    useEffect(() => {
        Router.push('/vocabulary');
    })

    return <Spinner />;
}

export default Index;
