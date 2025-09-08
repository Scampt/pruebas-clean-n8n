const fs = require("fs");
const path = require("path");

// Ensure n8n data directory exists in Render's persistent disk
const dataDir = "/opt/render/.n8n";
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
  console.log("Created n8n data directory:", dataDir);
}

// Copy existing SQLite database if it exists in the repository
const sourceDb = path.join(__dirname, "n8n.sqlite");
const targetDb = path.join(dataDir, "n8n.sqlite");

if (fs.existsSync(sourceDb) && !fs.existsSync(targetDb)) {
  fs.copyFileSync(sourceDb, targetDb);
  console.log("Copied existing n8n database to persistent storage");
}

console.log("Persistence setup completed");
