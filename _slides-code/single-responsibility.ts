// This function does THREE things
function handleUserData(userId) {
  // 1. Fetches data
  fetch(`https://example.com{userId}`)
    .then((response) => response.json())
    .then((user) => {
      // 2. Processes data
      const fullName = `${user.firstName} ${user.lastName}`;

      // 3. Updates the UI
      document.getElementById("user-name").textContent = fullName;
    });
}

// 1. Only fetches data
async function fetchUserData(userId) {
  const response = await fetch(`https://example.com{userId}`);
  return response.json();
}

// 2. Only formats data
function formatUserName(user) {
  return `${user.firstName} ${user.lastName}`;
}

// 3. Only updates the UI
function updateNameDisplay(name) {
  document.getElementById("user-name").textContent = name;
}

// Orchestrator function that connects the pieces
async function initializeUserProfile(userId) {
  const user = await fetchUserData(userId);
  const fullName = formatUserName(user);
  updateNameDisplay(fullName);
}
