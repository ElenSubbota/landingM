const fs = require('fs');
const { exec } = require('child_process');
const chokidar = require('fs');

// Установите chokidar если нет
// npm install chokidar

const watcher = chokidar.watch('./styles/**/*.scss', {
  persistent: true,
  ignoreInitial: true
});

watcher
  .on('change', path => {
    console.log(`File ${path} changed. Compiling...`);
    exec('sass styles/main.scss styles/main.css', (err, stdout, stderr) => {
      if (err) {
        console.error('Error:', stderr);
      } else {
        console.log('Successfully compiled:', stdout);
      }
    });
  })
  .on('error', error => console.error('Watcher error:', error));

console.log('Watching for SCSS changes...');