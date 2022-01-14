const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');

var input = {
    language: 'Solidity',
    sources: {
        'Inbox.sol' : {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': [ '*' ]
            }
        }
    }
};


var compiled = solc.compile(JSON.stringify(input));
module.exports.output = JSON.parse(compiled);
