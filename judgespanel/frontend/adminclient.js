document.addEventListener('DOMContentLoaded', () => {
  //get refrence from the HTML elements 
  const addTeamForm = document.getElementById('add-team-form');
  const teamsList = document.getElementById('teams-list');
  const categorySelect = document.getElementById('category-select');
  const viewResultsButtons = document.querySelectorAll('.view-results-button');
  const resultsContainer = document.getElementById('results-container');

  // Initialize an object to store teams categorized by type
  
  const teamsByCategory = {
    'Jr. Champs': [],
    'Sr. Champs': [],
    'Master Champs': [],
  };

  // Event listener for adding a new team

  addTeamForm.addEventListener('submit', (event) => {
    event.preventDefault();
 // Extract values from input fields
    const teamNameInput = document.getElementById('team-name');
    const teamName = teamNameInput.value.trim();
    const selectedCategory = categorySelect.value;
   // Add team to the corresponding category
    if (teamName) {
      teamsByCategory[selectedCategory].push(teamName);
 // Update dropdown options and clear input
      updateDropdownOptions();
      teamNameInput.value = '';
    }
  });
  // Function to update dropdown options with teams
  function updateDropdownOptions() {
    const selectedCategory = categorySelect.value;
    const categoryTeams = teamsByCategory[selectedCategory];
// Clear existing team list and update with new teams
    teamsList.innerHTML = '';

    categoryTeams.forEach((teamName) => {
      const listItem = document.createElement('li');
      listItem.className = 'list-group-item';
      listItem.innerHTML = `
        <span class="team-name">${teamName}</span>
        <button class="edit-button">Edit</button>
        <button class="delete-button">Delete</button>
      `;

      teamsList.appendChild(listItem);
    });
  }
 // Event listener for edit and delete buttons
  teamsList.addEventListener('click', (event) => {
    const clickedItem = event.target;
  const listItem = clickedItem.parentElement;
 // Handle edit button click
  if (clickedItem.classList.contains('edit-button')) {
    const teamNameElement = listItem.querySelector('.team-name');
    const teamName = teamNameElement.textContent;

    const newTeamName = prompt('Edit team name:', teamName);
    if (newTeamName && newTeamName.trim() !== '') {
      const selectedCategory = categorySelect.value;
      const categoryTeams = teamsByCategory[selectedCategory];
      const teamIndex = categoryTeams.indexOf(teamName);

      if (teamIndex !== -1) {
        categoryTeams[teamIndex] = newTeamName;
        teamNameElement.textContent = newTeamName;
      }
    } // Handle delete button click
  } else if (clickedItem.classList.contains('delete-button')) {
    const teamNameElement = listItem.querySelector('.team-name');
    const teamName = teamNameElement.textContent;

    const confirmDelete = confirm(`Delete team "${teamName}"?`);
    if (confirmDelete) {
      const selectedCategory = categorySelect.value;
      const categoryTeams = teamsByCategory[selectedCategory];
      const teamIndex = categoryTeams.indexOf(teamName);

      if (teamIndex !== -1) {
        categoryTeams.splice(teamIndex, 1);
        listItem.remove();
      }
    }
  }
 
  });
  // Event listener for category selection change
  categorySelect.addEventListener('change', () => {
    updateDropdownOptions();
  });
// Event listener for viewing results
  viewResultsButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      const categoryTeams = teamsByCategory[category];
      showResults(categoryTeams);
    });
  });
  // Function to display results
  function showResults(categoryTeams) {
    resultsContainer.innerHTML = `
      <h3>Results</h3>
      <ul>
        ${categoryTeams.map((team) => `<li>${team} - Average Score: N/A</li>`).join('')}
      </ul>
    `;
  }
});
