const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

const VERSION = process.env.APP_VERSION || "1.1.1";

const COMMIT = process.env.GIT_SHA || "local";

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    application: "DeployFlow Demo App",
    message: "Application is running successfully",
    version: VERSION,
    commit: COMMIT,
    environment: process.env.NODE_ENV || "development"
  });
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    application: "deployflow-demo-app",
    version: VERSION,
    commit: COMMIT
  });
});

// Application information route
app.get("/api/info", (req, res) => {
  res.status(200).json({
    name: "DeployFlow Demo Application",
    version: VERSION,
    commit: COMMIT,
    status: "running"
  });
});

// Start the server only when executed directly
if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log("-----------------------------------");
    console.log("DeployFlow Demo Application");
    console.log(`Server: http://localhost:${PORT}`);
    console.log(`Version: ${VERSION}`);
    console.log(`Commit: ${COMMIT}`);
    console.log("-----------------------------------");
  });
}

module.exports = app;
