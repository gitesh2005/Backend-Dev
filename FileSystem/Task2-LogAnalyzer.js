const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, 'server.log');
const reportFile = path.join(__dirname, 'summary_report.txt');

async function analyzeLog() {
    return new Promise((resolve, reject) => {
        const stream = fs.createReadStream(logFile, { encoding: 'utf8' });

        let total = 0;
        let errorCount = 0;
        let warnCount = 0;
        let infoCount = 0;

        let leftover = '';

        stream.on('data', chunk => {
            const lines = (leftover + chunk).split('\n');
            leftover = lines.pop();

            for (let line of lines) {
                total++;

                if (line.includes('ERROR')) errorCount++;
                else if (line.includes('WARNING')) warnCount++;
                else if (line.includes('INFO')) infoCount++;
            }
        });

        stream.on('end', () => {
            if (leftover) {
                total++;
                if (leftover.includes('ERROR')) errorCount++;
                else if (leftover.includes('WARNING')) warnCount++;
                else if (leftover.includes('INFO')) infoCount++;
            }

            resolve({ total, errorCount, warnCount, infoCount });
        });

        stream.on('error', err => reject(err));
    });
}

async function writeReport(result) {
    const report = `
Log Summary Report
-------------------------
Total Lines: ${result.total}
ERROR: ${result.errorCount}
WARNING: ${result.warnCount}
INFO: ${result.infoCount}
Generated at: ${new Date().toLocaleString()}
    `.trim() + '\n';

    fs.writeFileSync(reportFile, report);
}

(async function main() {
    try {
        const result = await analyzeLog();
        await writeReport(result);
        console.log('Log analysis completed.');
    } catch (err) {
        console.log('Failed to analyze log:', err.message);
    }
})();
