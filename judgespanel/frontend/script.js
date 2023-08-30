// Admin Login Form
const adminLoginForm = document.getElementById('admin-login-form');
const judgeLoginForm = document.getElementById('judge-login-form');
const errorMessage = document.getElementById('error-message');

// Event listener for admin login form
adminLoginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Extract input values
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  // Send admin login data to the server
  const response = await fetch('/admin-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  // Handle server response
  const data = await response.json();
  if (data.success) {
    window.location.href = data.redirectUrl;
  } else {
    showError(data.message);
  }
});

// Event listener for judge login form
judgeLoginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Extract input values
  const id = document.getElementById('judge-id').value;
  const password = document.getElementById('judge-password').value;
  const category = document.getElementById('judge-category').value;

  // Send judge login data to the server
  const response = await fetch('/judge-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, password, category }),
  });

  // Handle server response
  const data = await response.json();
  if (data.success) {
    window.location.href = data.redirectUrl;
  } else {
    showError(data.message);
  }
});

// Function to show error message
function showError(message) {
  errorMessage.innerText = message;
  // Clear error message after 5 seconds
  setTimeout(() => {
    errorMessage.innerText = '';
  }, 5000);
}

// Document ready event
document.addEventListener('DOMContentLoaded', () => {
  const createTeamForm = document.getElementById('create-team-form');
  const teamList = document.getElementById('team-list');

  // Event listener for team creation form
  createTeamForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Extract input values
    const teamName = document.getElementById('team-name').value;
    const teamCategory = document.getElementById('team-category').value;

    // Send team creation data to the server
    const response = await fetch('/create-team', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teamName, teamCategory }),
    });

    // Handle server response
    const data = await response.json();
    if (data.success) {
      // Display the newly created team in the list
      const teamListItem = document.createElement('li');
      teamListItem.textContent = `${teamName} - ${teamCategory}`;
      teamList.appendChild(teamListItem);
    } else {
      // Handle error
      console.error('Failed to create team:', data.message);
    }
  });
});
