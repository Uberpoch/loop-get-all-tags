const axios = require('axios');
const fs = require('fs');
const commandLineArgs = require('command-line-args');

const { loop } = require('./utils/loop');
// const { get } = require('./utils/data');
const { createFile } = require('./utils/write');

const auth = async (key, secret) => {
    return axios.post('https://v2.api.uberflip.com/authorize', {
        grant_type:	'client_credentials',
        client_id: key,
        client_secret: secret
    })
    .catch(function (error) {
        console.log(error);
        })
    .then(function (response) {
        // tokenType = response.data.token_type;
         const token = response.data.access_token;
        // console.log(token);
        return token;
    })

}

const run = async(argv) => {
    const optionDefinitions = [
      { name: 'nocommit', type: Boolean },
      {
        name: 'key',
        type: String,
      },
      {
        name: 'sec',
        type: String,
      },
      {
        name: 'file',
        type: Number,
      },
    ];
  
    // defining commandline variables
    const options = commandLineArgs(optionDefinitions, { argv });
    let apiKey = options.key; //--key
    let apiSecret = options.sec; //--sec
    const file = options.file; //--hub

    console.log(options);
    // warning for missing commandline arguments
    if (options.nocommit) {
      console.warn('--nocommit was supplied.');
    }
  
    if (apiKey === undefined ) {
      console.error('no apikey was supplied please follow this format $node index.js run --key ENTERAPIKEY --sec ENTERFEEDURL. --hub ENTERHUBID');
      return;
    }
    if (apiSecret === undefined ) {
        console.error('no apikey was supplied please follow this format $node index.js run --key ENTERAPIKEY --sec ENTERFEEDURL. --hub ENTERHUBID');
        return;
    }
    if (file === undefined ) {
        console.error('no apikey was supplied please follow this format $node index.js run --key ENTERAPIKEY --sec ENTERFEEDURL. --hub ENTERHUBID');
    return;
    }
  
    // get all tags
    const token = await auth(apiKey, apiSecret);
    const loopResult = await loop(token);
    // const dataResult = await dataExample(loopResult);
    await createFile(loopResult, file);

  };

const main = () => {
    // These first few lines are just configuration
    const mainOptionDefinitions = [{ name: 'command', defaultOption: true }];
    const mainOptions = commandLineArgs(mainOptionDefinitions, {
      stopAtFirstUnknown: true,
    });
    const commandOptions = mainOptions._unknown || [];
    // Creates cases for the different commands you might pass
    switch (mainOptions.command) {
      // The case here refers to the COMMAND you pass after the file name
      case 'run':
        return run(commandOptions);
      default:
        // Will notify that no command was provided
        console.error(`Unknown command '${mainOptions.command}'.`);
        return null;
    }
  };
  
  main();