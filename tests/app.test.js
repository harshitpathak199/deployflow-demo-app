const test = require("node:test");

const assert = require("node:assert/strict");

const app = require("../src/app");

// Helper function to start the test server
async function startTestServer() {
  const server = app.listen(0, "127.0.0.1");

  await new Promise((resolve) => {
    server.once("listening", resolve);
  });

  return server;
}

// Helper function to stop the test server
async function stopTestServer(server) {
  await new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

// TEST 1: Health endpoint
test("Health endpoint returns healthy status", async () => {
  const server = await startTestServer();

  try {
    const port = server.address().port;

    const response = await fetch(
      `http://127.0.0.1:${port}/health`
    );

    assert.equal(response.status, 200);

    const data = await response.json();

    assert.equal(data.status, "healthy");

    assert.equal(
      data.application,
      "deployflow-demo-app"
    );
  } finally {
    await stopTestServer(server);
  }
});

// TEST 2: Application information
test("Application information endpoint works", async () => {
  const server = await startTestServer();

  try {
    const port = server.address().port;

    const response = await fetch(
      `http://127.0.0.1:${port}/api/info`
    );

    assert.equal(response.status, 200);

    const data = await response.json();

    assert.equal(
      data.name,
      "DeployFlow Demo Application"
    );

    assert.equal(data.status, "running");

    assert.ok(data.version);
  } finally {
    await stopTestServer(server);
  }
});
