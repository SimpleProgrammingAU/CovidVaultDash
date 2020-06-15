import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-user"></i>}
            title="Account"
            to="/apps/account-edit" exact />
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-pencil"></i>}
            title="Manual Add"
            to="/apps/manual-add" exact />
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-line-chart"></i>}
            title="Analytics"
            to="/dashboards/analytics" exact />
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-cubes"></i>}
            title="Data Request"
            to="/dashboards/data" exact />
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-sign-out"></i>}
            title="Sign Out"
            to="/pages/login" />
    </SidebarMenu >
);
