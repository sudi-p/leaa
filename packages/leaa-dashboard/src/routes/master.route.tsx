import _ from 'lodash';
import React, { ReactNode } from 'react';
import { Route } from 'react-router-dom';

import { IRouteItem, IPage } from '@leaa/dashboard/interfaces';
import { MasterLayout } from '@leaa/dashboard/components/MasterLayout';
import { SuspenseFallback } from '@leaa/dashboard/components/SuspenseFallback';
import { ALLOW_PERMISSION } from '@leaa/dashboard/constants';

export const masterRoutes: IRouteItem[] = [
  {
    name: 'Playground',
    namei18n: '_route:playground',
    permission: 'playground.root',
    path: '_group',
    icon: 'folder',
    children: [
      {
        name: 'Show Store',
        namei18n: '_route:showStore',
        permission: ALLOW_PERMISSION,
        path: '/show-store',
        icon: 'deployment-unit',
        LazyComponent: React.lazy(() =>
          import(/* webpackChunkName: 'ShowStore' */ '../pages/Playground/ShowStore/ShowStore'),
        ),
        exact: true,
      },
      {
        name: 'Test Apollo',
        namei18n: '_route:testApollo',
        permission: ALLOW_PERMISSION,
        path: '/test-apollo',
        icon: 'experiment',
        LazyComponent: React.lazy(() =>
          import(/* webpackChunkName: 'TestApollo' */ '../pages/Playground/TestApollo/TestApollo'),
        ),
        exact: true,
      },
    ],
  },
  //
  //
  //
  //
  {
    name: 'Create User',
    namei18n: '_route:createUser',
    permission: 'user.create',
    path: '/users/create',
    icon: 'user',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'CreateUser' */ '../pages/User/CreateUser/CreateUser')),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit User',
    namei18n: '_route:editUser',
    permission: 'user.item',
    path: '/users/:id(\\d+)',
    icon: 'user',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'EditUser' */ '../pages/User/EditUser/EditUser')),
    exact: true,
  },
  {
    name: 'User',
    namei18n: '_route:user',
    permission: 'user.list',
    path: '/users',
    icon: 'user',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'UserList' */ '../pages/User/UserList/UserList')),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Role',
    namei18n: '_route:createRole',
    permission: 'role.create',
    path: '/roles/create',
    icon: 'crown',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'CreateRole' */ '../pages/Role/CreateRole/CreateRole')),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Role',
    namei18n: '_route:editRole',
    permission: 'role.item',
    path: '/roles/:id(\\d+)',
    icon: 'crown',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'EditRole' */ '../pages/Role/EditRole/EditRole')),
    exact: true,
  },
  {
    name: 'Role',
    namei18n: '_route:role',
    permission: 'role.list',
    path: '/roles',
    icon: 'crown',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'RoleList' */ '../pages/Role/RoleList/RoleList')),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Permission',
    namei18n: '_route:createPermission',
    permission: 'permission.create',
    path: '/permissions/create',
    icon: 'key',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'CreatePermission' */ '../pages/Permission/CreatePermission/CreatePermission'),
    ),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Permission',
    namei18n: '_route:editPermission',
    permission: 'permission.item',
    path: '/permissions/:id(\\d+)',
    icon: 'key',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'EditPermission' */ '../pages/Permission/EditPermission/EditPermission'),
    ),
    exact: true,
  },
  {
    name: 'Permission',
    namei18n: '_route:permission',
    permission: 'permission.list',
    path: '/permissions',
    icon: 'key',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'PermissionList' */ '../pages/Permission/PermissionList/PermissionList'),
    ),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Category',
    namei18n: '_route:createCategory',
    permission: 'category.create',
    path: '/categories/create',
    icon: 'apartment',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'CreateCategory' */ '../pages/Category/CreateCategory/CreateCategory'),
    ),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Category',
    namei18n: '_route:editCategory',
    permission: 'category.item',
    path: '/categories/:id(\\d+)',
    icon: 'apartment',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'EditCategory' */ '../pages/Category/EditCategory/EditCategory'),
    ),
    exact: true,
  },
  {
    name: 'Category',
    namei18n: '_route:category',
    permission: 'category.list',
    path: '/categories',
    icon: 'apartment',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'CategoryList' */ '../pages/Category/CategoryList/CategoryList'),
    ),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Article',
    namei18n: '_route:createArticle',
    permission: 'article.create',
    path: '/articles/create',
    icon: 'container',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'CreateArticle' */ '../pages/Article/CreateArticle/CreateArticle'),
    ),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Article',
    namei18n: '_route:editArticle',
    permission: 'article.item',
    path: '/articles/:id(\\d+)',
    icon: 'container',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'EditArticle' */ '../pages/Article/EditArticle/EditArticle'),
    ),
    exact: true,
  },
  {
    name: 'Article',
    namei18n: '_route:article',
    permission: 'article.list',
    path: '/articles',
    icon: 'container',
    LazyComponent: React.lazy(() =>
      import(/* webpackChunkName: 'ArticleList' */ '../pages/Article/ArticleList/ArticleList'),
    ),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'Create Ax',
    namei18n: '_route:createAx',
    permission: 'ax.create',
    path: '/axs/create',
    icon: 'star',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'CreateAx' */ '../pages/Ax/CreateAx/CreateAx')),
    exact: true,
    isCreate: true,
  },
  {
    name: 'Edit Ax',
    namei18n: '_route:editAx',
    permission: 'ax.item',
    path: '/axs/:id(\\d+)',
    icon: 'star',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'EditAx' */ '../pages/Ax/EditAx/EditAx')),
    exact: true,
  },
  {
    name: 'Ax',
    namei18n: '_route:ax',
    permission: 'ax.list',
    path: '/axs',
    icon: 'star',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'AxList' */ '../pages/Ax/AxList/AxList')),
    canCreate: true,
    exact: true,
  },
  //
  //
  //
  //
  {
    name: 'HOME',
    namei18n: '_route:home',
    permission: ALLOW_PERMISSION,
    path: '/',
    LazyComponent: React.lazy(() => import(/* webpackChunkName: 'Home' */ '../pages/Playground/ShowStore/ShowStore')),
    exact: true,
  },
];

const routerDom: ReactNode[] = [];
const parseRoutes = (routeList: IRouteItem[]) => {
  routeList.forEach(item => {
    if (item.children) {
      parseRoutes(item.children);
    }

    routerDom.push(
      <Route key={item.children ? `group-${item.name}` : item.path} exact={item.exact} path={item.path}>
        <MasterLayout
          route={item}
          component={(matchProps: IPage) => (
            <React.Suspense fallback={<SuspenseFallback />}>
              {item.LazyComponent && <item.LazyComponent {...matchProps} />}
            </React.Suspense>
          )}
        />
      </Route>,
    );
  });

  return routerDom;
};

const flateRoutes: IRouteItem[] = [];
const parseFlatRoutes = (routeList: IRouteItem[], groupName?: string) => {
  routeList.forEach(item => {
    const nextItem = _.omit(item, 'LazyComponent');

    if (nextItem.children) {
      parseFlatRoutes(nextItem.children, nextItem.path);
    }

    // loop for children groupName
    if (groupName) {
      nextItem.groupName = groupName;
    }

    flateRoutes.push(nextItem);
  });

  return flateRoutes;
};

export const masterRoute = parseRoutes(masterRoutes);
export const flateMasterRoutes = parseFlatRoutes(masterRoutes);
