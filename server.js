// server.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = 3000;

app.get('*.js|*.css|*.svg', (req, res) => {
    res.sendFile(__dirname + '/dist/' + req.url);
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
