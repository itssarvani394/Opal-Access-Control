const { Permit } = require('permitio'); // Correctly importing Permit class

const permit = new Permit({
  pdp: 'https://api.permit.io',
  token: 'B7CHT6u2r6uqhQ94vYZpDACr6M7UnK6CHjQjHFRcBXMUSveDVJiggKNcs8QKczL52DuWG2kIuXM6ma5MkIZjVR' // Replace with your actual Permit API token
});

const resources = [
  {
    key: 'product',
    name: 'Product',
    actions: {
      'create-product': {},
      'edit-product': {},
      'delete-product': {},
      'view-product': {}
    },
    roles: {
      admin: {
        name: 'Admin',
        permissions: ['create-product', 'edit-product', 'delete-product', 'view-product']
      },
      manager: {
        name: 'Manager',
        permissions: ['edit-product', 'view-product']
      },
      customer: {
        name: 'Customer',
        permissions: ['view-product']
      },
      guest: {
        name: 'Guest',
        permissions: []
      },
      developer: {
        name: 'Developer',
        permissions: ['create-product', 'edit-product', 'view-product']
      }
    }
  },
  {
    key: 'account',
    name: 'Account',
    actions: {
      'invite-member': {},
      'list-members': {},
      'remove-member': {}
    },
    roles: {
      admin: {
        name: 'Admin',
        permissions: ['invite-member', 'list-members', 'remove-member']
      },
      manager: {
        name: 'Manager',
        permissions: ['list-members']
      },
      customer: {
        name: 'Customer',
        permissions: ['list-members']
      },
      guest: {
        name: 'Guest',
        permissions: []
      },
      developer: {
        name: 'Developer',
        permissions: ['invite-member', 'list-members']
      }
    }
  },
  {
    key: 'post',
    name: 'Post',
    actions: {
      'create-post': {},
      'edit-post': {},
      'delete-post': {},
      'view-post': {}
    },
    roles: {
      admin: {
        name: 'Admin',
        permissions: ['create-post', 'edit-post', 'delete-post', 'view-post']
      },
      manager: {
        name: 'Manager',
        permissions: ['edit-post', 'view-post']
      },
      customer: {
        name: 'Customer',
        permissions: ['view-post']
      },
      guest: {
        name: 'Guest',
        permissions: ['view-post']
      },
      developer: {
        name: 'Developer',
        permissions: ['create-post', 'edit-post', 'view-post']
      }
    }
  }
];

async function createOrUpdateResource(resource) {
  try {
    await permit.api.createResource(resource);
    console.log(`Resource ${resource.key} created successfully`);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error_code === 'DUPLICATE_ENTITY') {
      console.log(`Resource ${resource.key} already exists. Updating resource.`);
      
      const updateData = {
        name: resource.name,
        actions: resource.actions,
      };

      await permit.api.updateResource(resource.key, updateData);
      console.log(`Resource ${resource.key} updated successfully`);
    } else {
      console.error(`Failed to create or update resource ${resource.key}:`, error.message);
    }
  }
}

async function setupPermissions() {
  for (const resource of resources) {
    await createOrUpdateResource(resource);
  }
}

setupPermissions().catch(console.error);
