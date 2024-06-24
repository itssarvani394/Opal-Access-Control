const { Permit } = require('permitio');
require('dotenv').config();

const permit = new Permit({
  token: process.env.PERMIT_API_KEY,
});

async function setupPermissions() {
  // Define Account Resource
  await permit.api.createResource({
    key: 'account',
    name: 'Account',
    actions: {
      'invite-member': {},
      'list-members': {},
      'remove-member': {},
    },
    roles: {
      admin: {
        name: 'Admin',
        permissions: [
          'invite-member',
          'list-members',
          'remove-member',
        ],
      },
      manager: {
        name: 'Manager',
        permissions: [
          'list-members',
        ],
      },
      customer: {
        name: 'Customer',
        permissions: [
          'list-members',
        ],
      },
      guest: {
        name: 'Guest',
        permissions: [],
      },
      developer: {
        name: 'Developer',
        permissions: [
          'invite-member',
          'list-members',
        ],
      },
    },
  });

  // Define Product Resource
  await permit.api.createResource({
    key: 'product',
    name: 'Product',
    actions: {
      'create-product': {},
      'edit-product': {},
      'delete-product': {},
      'view-product': {},
    },
    roles: {
      admin: {
        name: 'Admin',
        permissions: [
          'create-product',
          'edit-product',
          'delete-product',
          'view-product',
        ],
      },
      manager: {
        name: 'Manager',
        permissions: [
          'create-product',
          'edit-product',
          'view-product',
        ],
      },
      customer: {
        name: 'Customer',
        permissions: [
          'view-product',
        ],
      },
      guest: {
        name: 'Guest',
        permissions: [
          'view-product',
        ],
      },
      developer: {
        name: 'Developer',
        permissions: [
          'create-product',
          'edit-product',
          'view-product',
        ],
      },
    },
  });

  // Define Post Resource
  await permit.api.createResource({
    key: 'post',
    name: 'Post',
    actions: {
      'create-post': {},
      'edit-post': {},
      'delete-post': {},
      'view-post': {},
    },
    roles: {
      admin: {
        name: 'Admin',
        permissions: [
          'create-post',
          'edit-post',
          'delete-post',
          'view-post',
        ],
      },
      manager: {
        name: 'Manager',
        permissions: [
          'create-post',
          'edit-post',
          'view-post',
        ],
      },
      customer: {
        name: 'Customer',
        permissions: [
          'create-post',
          'view-post',
        ],
      },
      guest: {
        name: 'Guest',
        permissions: [
          'view-post',
        ],
      },
      developer: {
        name: 'Developer',
        permissions: [
          'create-post',
          'edit-post',
          'view-post',
        ],
      },
    },
  });

  // Create Users and Assign Roles with correct resource_instance format
  await permit.api.syncUser({ key: 'admin_user' });
  await permit.api.syncUser({ key: 'manager_user' });
  await permit.api.syncUser({ key: 'customer_user' });
  await permit.api.syncUser({ key: 'guest_user' });
  await permit.api.syncUser({ key: 'developer_user' });

  await permit.api.roleAssignments.assign({
    user: 'admin_user',
    role: 'admin',
    resource_instance: 'account:default',
  });
  await permit.api.roleAssignments.assign({
    user: 'manager_user',
    role: 'manager',
    resource_instance: 'account:default',
  });
  await permit.api.roleAssignments.assign({
    user: 'customer_user',
    role: 'customer',
    resource_instance: 'account:default',
  });
  await permit.api.roleAssignments.assign({
    user: 'guest_user',
    role: 'guest',
    resource_instance: 'account:default',
  });
  await permit.api.roleAssignments.assign({
    user: 'developer_user',
    role: 'developer',
    resource_instance: 'account:default',
  });

  console.log("Permissions setup complete");
}

setupPermissions().catch(console.error);
