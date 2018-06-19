require('ts-node/register');
const {
    Application
} = require('./src/main');

class CommandArgvParser {
    constructor() {
        this.commands = [
            'port',
            'https',
            'dev',
            'prod',
            'help',
            'version'
        ];
        this.simplifideCommands = {
            'h': 'help',
            'v': 'version',
            'p': 'port',
            's': 'https'
        };
        this.commandArgValueMap = [];
        this.projectVersion = require('./package.json').version;
        this.projectName = require('./package.json').name;

        const error = this.commandArgs();
        if (error) {
            console.log(error);
            this.commandHelp();
            process.exit();
        } else if (this.hasCommand('help')) {
            this.commandHelp();
            process.exit();
        } else if (this.hasCommand('version')) {
            this.versionInfo();
            process.exit();
        }
    }

    hasCommand(name) {
        for (let arg of this.commandArgValueMap) {
            const formatName = arg.name.replace(/--?/, '');
            if (formatName === name || this.simplifideCommands[formatName] === name) return true;
        }
        return false;
    }

    parseCommandArgs() {
        const commandArgs = process.argv.slice(2);
        for (let i = 0; i < commandArgs.length; i++) {
            if (commandArgs[i].indexOf('-') > 0) return 'Unknown command: ' + commandArgs[i];
            if (commandArgs[i].indexOf('--') > 0) return 'Unknown command: ' + commandArgs[i];
            else if (commandArgs[i].indexOf('--') < 0 && commandArgs[i].indexOf('-') < 0) {
                if (
                    !commandArgs[i - 1] ||
                    commandArgs[i - 1].indexOf('--') !== 0 ||
                    commandArgs[i - 1].indexOf('-') !== 0
                ) return 'Unknown value: ' + commandArgs[i];

                const hasArgValue = this.commandArgValueMap.find(argValue => argValue.name === commandArgs[i - 1]);
                if (hasArgValue) {
                    hasArgValue.value = commandArgs[i];
                } else {
                    this.commandArgValueMap.push({
                        name: commandArgs[i - 1],
                        value: commandArgs[i]
                    });
                }
            } else if (commandArgs[i].indexOf('-') === 0) {
                this.commandArgValueMap.push({
                    name: commandArgs[i]
                });
            }
        }
        return;
    }

    commandArgs() {
        const error = this.parseCommandArgs();
        if (error) return error;

        for (let argValue of this.commandArgValueMap) {
            let arg = this.commands.find(argType => argValue.name === `--${argType}`);
            if (!arg) arg = this.simplifideCommands[argValue.name.replace(/^-/, '')];
            if (!arg) return 'Unknown command: ' + argValue.name;
        }
        return;
    }

    commandHelp() {
        console.log('Command line: node [option] <value>');
        console.log('--https [-s]\t\tto enable server to launch with ssl certificate. certificate file is saved in .\\certificate');
        console.log('--port [-p] <number>\tto customise port, default port is 3000 in dev mode');
        console.log('--dev\t\t\tto launch sever in dev mode, port will be 3000 in default');
        console.log('--prod\t\t\tto launch server in prod mode, port will be 80 in default, 443 with https server');
        console.log('--help [-h]\t\tto get command help');
        console.log('--version [-v]\t\tto get project version');
    }

    get(name) {
        const findArg = this.commandArgValueMap.find(arg => arg.name === `--${name}`);
        if (!findArg) return null;
        return findArg.value || true;
    }

    versionInfo() {
        console.log(this.projectName + ' v' + this.projectVersion);
    }
}

const commandArgs = new CommandArgvParser();
let isDevMode = commandArgs.get('dev') || !commandArgs.get('prod');
new Application(isDevMode ? 'dev': 'prod', commandArgs.get('https'), commandArgs.get('port'));