export const permissionsSeed = [
  { name: 'Role List', slug: 'role.list' },
  { name: 'Role Item', slug: 'role.item' },
  { name: 'Permission List', slug: 'permission.list' },
  { name: 'Permission Item', slug: 'permission.item' },
  { name: 'User List', slug: 'user.list' },
  { name: 'User Item', slug: 'user.item' },
  { name: 'User Create', slug: 'user.create' },
  { name: 'User Update', slug: 'user.update' },
  { name: 'User Delete', slug: 'user.delete' },
  { name: 'Permission Create', slug: 'permission.create' },
  { name: 'Permission Update', slug: 'permission.update' },
  { name: 'Permission Delete', slug: 'permission.delete' },
  { name: 'Role Create', slug: 'role.create' },
  { name: 'Role Update', slug: 'role.update' },
  { name: 'Role Delete', slug: 'role.delete' },
];

// prettier-ignore
export const rolesSeed = [
  { name: 'Admin', slug: 'admin' },
  { name: 'Staff', slug: 'staff' },
];

// prettier-ignore
export const usersSeed = [
  { email: 'admin@admin.com', name: 'admin', password: 'h8Hx9qvPKoHMLQgj', status: 1 },
  { email: 'staff@staff.com', name: 'staff', password: '7PkQGjvHMMkoo4RZ', status: 1 },
  { email: 'disabled@disabled.com', name: 'disabled', password: 'uUB3YGrdL3gJZYij', status: -1 },
];