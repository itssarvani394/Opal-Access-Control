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
    },
  });

  // Create Users and Assign Roles
  await permit.api.createUser({
    key: 'admin_user',
    email: 'admin@example.com',
    roles: {
      'account': 'admin',
      'product': 'admin',
      'post': 'admin'
    },
  });

  await permit.api.createUser({
    key: 'manager_user',
    email: 'manager@example.com',
    roles: {
      'account': 'manager',
      'product': 'manager',
      'post': 'manager'
    },
  });

  await permit.api.createUser({
    key: 'customer_user',
    email: 'customer@example.com',
    roles: {
      'account': 'customer',
      'product': 'customer',
      'post': 'customer'
    },
  });

  await permit.api.createUser({
    key: 'guest_user',
    email: 'guest@example.com',
    roles: {
      'account': 'guest',
      'product': 'guest',
      'post': 'guest'
    },
  });
}

setupPermissions().catch(console.error);
