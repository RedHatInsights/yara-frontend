import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from '../../Components/Loading/Loading';

const List = lazy(() => import(/* webpackChunkName: 'Signature List' */ './Signatures'));
const Details = lazy(() => import(/* webpackChunkName: "Signature Details" */ './Details'));

const SigRoutes = () => <React.Fragment>
    <Switch>
        <Route exact path='/signatures' component={() => <Suspense fallback={<Loading />}> <List /> </Suspense>} />
        <Route exact path='/signatures/:id' component={() => <Suspense fallback={<Loading />}> <Details /> </Suspense>} />
    </Switch>
</React.Fragment>;

export default SigRoutes;
