const fs = require('fs');
const inquirer = require('inquirer');

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

const isFile = (fileName) => fs.lstatSync(fileName).isFile()
const list = fs.readdirSync('./').filter(isFile);

inquirer.prompt([
    {
        name: 'logFile',
        type: 'list',
        message: 'File read',
        choices: list,
    },
    {
        name: 'IP_LIST',
        type: 'input',
        message: 'Search IP',

    }
]).then(({logFile, IP_LIST}) => {
    findLog(logFile, IP_LIST);
})