import { useEffect } from 'react';
import Router from 'next/router';
import { Spinner } from 'evergreen-ui';

function Index() {
    useEffect(() => {
        Router.push('/vocabulary');
    })

    return <Spinner />;
}

export default Index;
