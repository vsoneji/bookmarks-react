const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

// Create upload directory if it doesn't exist
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
}

// Delete existing zip file if it exists
const zipPath = path.join(distDir, 'sonejifamily-dist.zip');
if (fs.existsSync(zipPath)) {
    fs.unlinkSync(zipPath);
    console.log('Deleted existing zip file');
}

// Create a write stream for our zip file
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level
});

// Listen for all archive data to be written
output.on('close', () => {
    console.log(`Archive created successfully. Total bytes: ${archive.pointer()}`);
});

// Handle warnings and errors
archive.on('warning', (err) => {
    if (err.code === 'ENOENT') {
        console.warn(err);
    } else {
        throw err;
    }
});

archive.on('error', (err) => {
    throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Add the contents of the build directory to the zip
archive.directory(path.join(__dirname, '..', 'build'), false);

// Finalize the archive
archive.finalize();
