import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

import Loading from '../../Components/Loading/Loading';

const List = lazy(() => import(/* webpackChunkName: 'System List' */ './Systems'));
const Details = lazy(() => import(/* webpackChunkName: "System Details" */ './Details'));

const SysRoutes = () => <React.Fragment>
    <Switch>
        <Route exact path='/systems' component={() => <Suspense fallback={<Loading />}> <List /> </Suspense>} />
        <Route exact path='/systems/:id' component={() => <Suspense fallback={<Loading />}> <Details /> </Suspense>} />
    </Switch>
</React.Fragment>;

export default SysRoutes;
