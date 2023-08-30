document.addEventListener('DOMContentLoaded', () => {
  const teamList = document.querySelector('.team-list');
  const submitButton = document.getElementById('submit-results-button');
  const logoutButton = document.getElementById('logout-button');

  // Example data for teams
  const teams = [
    { name: 'Team A', criteriaScores: [0, 0, 0, 0, 0, 0] },
    { name: 'Team B', criteriaScores: [0, 0, 0, 0, 0, 0] },
    // ... add more teams
  ];

  // Display teams and scoring boxes
  teams.forEach((team) => {
    const teamElement = document.createElement('div');
    teamElement.classList.add('team');
    teamElement.innerHTML = `
      <span>${team.name}</span>
      ${team.criteriaScores.map(() => '<input class="scoring-box" type="number" min="0" max="10">').join('')}
    `;
    teamList.appendChild(teamElement);
  });

  // Handle submit button click
  submitButton.addEventListener('click', () => {
    // Gather scores and submit logic
    // ...

    // Example alert for demonstration
    alert('Results submitted successfully!');
  });

  // Handle logout button click
  logoutButton.addEventListener('click', () => {
    // Handle logout logic
    // ...
  });
});
