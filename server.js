const http = require('http');
const fs = require('fs');
const { spawn } = require('child_process');
const express = require("express");
const cors = require('cors');

const port = 8000;

const app = express();

app.use(cors());
app.use(express.json());

console.log("server started");

function runPy(a, i) {
  return new Promise((resolve, reject) => {
    const py = spawn('python3', [a, i]);

    let output = '';
    let errorOutput = '';

    py.stdout.on('data', (data) => {
      output += data.toString();
    });

    py.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    py.on('close', (code) => {
      resolve([output, errorOutput]); // resolves only once the process is done (code totally not ai)
    });

    py.on('error', (err) => {
      reject(err); // handles cases where python3 itself fails to spawn
    });
  });
}
app.post('/proxy', async (req, res) => {
  console.log(
    "recieved a post request from " + req.ip +
    " with " + req.body.content
  );

  const [output, error] = await runPy(
    "proxy/main.py",
    req.body.content
  );

  console.log(error);

  res.send(output || error);
});
app.listen(port, () => {
  console.log("listening on " + port.toString());
});
