const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');
const backupDir = path.join(__dirname, 'backup');
const logFile = path.join(__dirname, 'backup.log');

async function ensureDir(dir) {
    try {
        await fs.promises.access(dir);
    } catch (err) {
        await fs.promises.mkdir(dir, { recursive: true });
    }
}

async function backupFiles() {
    await ensureDir(uploadsDir);
    await ensureDir(backupDir);

    const files = await fs.promises.readdir(uploadsDir);

    for (let file of files) {
        const filePath = path.join(uploadsDir, file);

        try {
            const stats = await fs.promises.stat(filePath);
            if (stats.isFile()) {
                const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
                const backupFileName = `${timeStamp}-${file}`;
                const destPath = path.join(backupDir, backupFileName);

                await fs.promises.copyFile(filePath, destPath);
                log(`Backed up: ${file} → ${backupFileName}`);
            }
        } catch (err) {
            log(`Error backing up ${file}: ${err.message}`);
        }
    }
}

async function cleanupOldFiles() {
    const files = await fs.promises.readdir(backupDir);
    const now = Date.now();
    const sevenDays = 7 * 24 * 60 * 60 * 1000;

    for (let file of files) {
        const filePath = path.join(backupDir, file);

        try {
            const stats = await fs.promises.stat(filePath);
            const age = now - stats.mtimeMs;

            if (age > sevenDays) {
                await fs.promises.rm(filePath);
                log(`Deleted old backup: ${file}`);
            }
        } catch (err) {
            log(`Error deleting ${file}: ${err.message}`);
        }
    }
}

function log(msg) {
    const line = `[${new Date().toLocaleString()}] ${msg}\n`;
    fs.appendFileSync(logFile, line);
}

async function run() {
    await backupFiles();
    await cleanupOldFiles();
    console.log("Backup & cleanup finished.");
}

run().catch(err => {
    log(`Fatal error: ${err.message}`);
});
