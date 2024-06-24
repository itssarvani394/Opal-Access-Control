// Function to fetch permissions (simulated with hardcoded permissions)
async function fetchPermissions(userId) {
    // Simulate fetching permissions from an API
    return {
        'create-product': true,  // Change to false to simulate no permission
        'edit-product': true,
        'delete-product': false,
        'view-product': true
    };
}

// Function to initialize the application
async function initApp(userId) {
    const permissions = await fetchPermissions(userId);

    const createProductBtn = document.getElementById('create-product-btn');
    const noPermissionMsg = document.getElementById('no-permission-msg');

    if (permissions['create-product']) {
        createProductBtn.style.display = 'block';
    } else {
        noPermissionMsg.style.display = 'block';
    }
}

// Start the application on page load
document.addEventListener('DOMContentLoaded', function() {
    const userId = 'your_user_id_here'; // Replace with actual user ID
    initApp(userId);
});
