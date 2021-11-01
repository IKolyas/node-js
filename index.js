const fs = require('fs');

const ACCESS_LOG = './access.log'
const IP_LIST = ['89.123.1.41', '34.48.240.111']

function writeLogFile(logName, log) {
    const writeStream = fs.createWriteStream('./logs/' + logName + '_requests.log', { flags: 'a', encoding: 'utf8' });
    writeStream.write(log);
}

function findLog(logFile, logList) {
    const readStream = fs.createReadStream(logFile, 'utf-8')
    readStream.on('data', (chunk) => {
        const logToArray = chunk.split('\n');
        logToArray.forEach((log) => {
            let ipLog = log.split(' ')[0];
            if (logList.indexOf(ipLog) !== -1) {
                writeLogFile(ipLog, log)
            }
        })
    });
}

findLog(ACCESS_LOG, IP_LIST);

