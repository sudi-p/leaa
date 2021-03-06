import { Controller, UseGuards } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { Permissions } from '@leaa/api/src/decorators';
import { ActionCreateOneReq, ActionUpdateOneReq } from '@leaa/api/src/dtos/action';
import { JwtGuard, PermissionsGuard } from '@leaa/api/src/guards';
import { Action } from '@leaa/api/src/entrys';

import { ActionService } from './action.service';

@Crud({
  model: {
    type: Action,
  },
  query: {
    maxLimit: 1000,
    alwaysPaginate: true,
  },
  routes: {
    exclude: ['createManyBase'],
    getManyBase: { decorators: [UseGuards(JwtGuard, PermissionsGuard), Permissions('action.list-read')] },
    getOneBase: { decorators: [UseGuards(JwtGuard, PermissionsGuard), Permissions('action.item-read')] },
    createOneBase: { decorators: [UseGuards(JwtGuard, PermissionsGuard), Permissions('action.item-create')] },
    deleteOneBase: {
      decorators: [UseGuards(JwtGuard, PermissionsGuard), Permissions('action.item-delete')],
      returnDeleted: true,
    },
  },
  dto: {
    create: ActionCreateOneReq,
    update: ActionUpdateOneReq,
    replace: Action,
  },
})
@Controller('/v1/actions')
export class ActionController implements CrudController<Action> {
  constructor(public service: ActionService) {}
}
