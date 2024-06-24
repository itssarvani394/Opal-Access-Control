async function checkAccess(role) {
  const userId = prompt('Enter user ID:');
  try {
    const response = await fetch(`http://localhost:4000/${role}?user_id=${userId}`);
    console.log(response);
    if (response.ok) {
      const result = await response.text();
      document.getElementById('content').innerText = result;
    } else {
      throw new Error('Access Denied');
    }
  } catch (error) {
    console.error('Error:', error.message);
    document.getElementById('content').innerText = 'Error: ' + error.message;
  }
}
