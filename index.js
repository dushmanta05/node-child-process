const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const NODE20_PATH = process.env.NODE20_PATH;

app.get('/start-child', (_, res) => {
  const child = spawn(NODE20_PATH, [path.join(__dirname, 'child-process/index.js')], {
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  let output = '';

  child.stdout.on('data', (data) => {
    const msg = data.toString();
    console.log('[Child STDOUT]', msg);
    output += msg;
  });

  child.stderr.on('data', (data) => {
    const err = data.toString();
    console.error('[Child STDERR]', err);
    output += err;
  });

  child.on('close', (code) => {
    console.log(`[Child process exited with code ${code}]`);
    res.send({
      status: code === 0 ? 'success' : 'failed',
      exitCode: code,
      output: output,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
