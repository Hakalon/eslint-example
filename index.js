const express = require('express');
const alexa = require('alexa-app');
const fs = require('fs');
const reqSender = require('request-promise-native');
const bodyParser = require('body-parser');
const https = require('https');
const pad = require('left-pad');

const expressApp = express();

// Set the server address at https://.../demo
// ESLint: new-cap, requires all new operators to be called with uppercase-started functions
const app = new alexa.app('emo');

// Express server's Cert.
const SERVER_CONFIG = {
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('cert.pem'),
  ca: fs.readFileSync('chain.pem'),
};


function reqErrHandler(err) {
  return new Promise((resolve, reject) => {
    console.log('reqErrHandler');
    if (err.error && typeof (err.error) === 'string') {
      // ESLint: no-parm-reassing, 禁止賦值給函式給予的變數('body'為函式給予的變數)
      // But in here I just ignore it, because that is what I mean to do.
      err = JSON.parse(err.error).error;
      err.name = 'RequestError';
      return reject(err);
    }
    return reject(new Error('err is undefined'));
  });
}

function checkResp(count = 0) {
  return new Promise((resolve, reject) => {
    console.log('checkResp');
    reqSender.get('https://openhab.ntust.ml/rest/items/ResponseEchoMessage')
      .then(body => {
        // ESLint: no-param-reassign, 禁止賦值給函式給予的變數('body'為函式給予的變數)
        // 但這邊會讓它通過，因為在這Promise中我只是將body重新轉化為Json格式
        if (body && typeof (body) === 'string') { body = JSON.parse(body); }
        if (body.state) { return resolve(body.state); }
        if (count > 10) {
          const err = new Error('checkResp recurs too much times!');
          err.name = 'checkResp';
          return reject(err);
        }
        console.log(`checkResp recurs ${count + 1} times`);
        // ESLint: no-param-reassign, 禁止賦值給函式給予的變數('body'為函式給予的變數)
        // Same here.
        count++;
        return resolve(checkResp(count));
      })
      .catch(reqErrHandler);
  });
}

function cleanResp(resp) {
  // ESLint: no-used-vars
  return new Promise((resolve, reject) => {
    console.log('cleanResp');
    reqSender.post({
      url: 'https://openhab.ntust.ml/rest/items/ResponseEchoMessage',
      body: '',
    })
      .then(() => resolve(resp))
      .catch(reqErrHandler)
    // no-used-vars fixed
      .then(() => reject());
  });
}

function finalErrHandler(err) {
  console.log('finalErrHandler');
  console.log(`Error name : ${err.name}`);
  console.log(`Error message : ${err.message}`);
  return Promise.resolve('Sorry, It seems something goes wrong. Please check the server log.');
}


app.intent('HelloWorld', (request, response) => {
  console.log('HelloWorld intent called');
  response.say('Hello World');
});

app.intent('Airconditioner', (request, response) => {
  console.log('Airconditioner Intent Called');

  return reqSender.post({
    url: 'https://openhab.ntust.ml/rest/items/ReceivedEchoMessage',
    body: 'Airconditioner',
  })
    .catch(reqErrHandler)
    .then(checkResp)
    .then(cleanResp)
    .catch(finalErrHandler)
    // 下方這段Code會因 ESLint: arrow-body-style 而報錯，正確修改後為下方註解程式碼
    // 但因此段Promise回傳在alexa-app函式內，故需加上return關鍵字(理論上確實下方註解才是最好的寫法，但實際測試卻不work)
    .then(resp => {
      return response.say(resp);
    });
  // .then(resp => response.say(resp));
});

app.intent('ACCondition', (request, response) => {
  console.log('ACCondition Intent Called');

  return reqSender.post({
    url: 'https://openhab.ntust.ml/rest/items/ReceivedEchoMessage',
    body: 'ACCondition'
  })
    .catch(reqErrHandler)
    .then(checkResp)
    .then(cleanResp)
    .catch(finalErrHandler)
    .then(resp => {
      return response.say(resp);
    });
});


// attach app with Express server
app.express({
  expressApp,
});

expressApp.use(bodyParser.json());

expressApp.get('/', (req, resp) => {
  console.log('index.js is called');
  resp.status(200).json({
    STATUS: 'OK'
  });
});

expressApp.get('/test', (req, resp) => {
  resp.status(200).json({
    STATUS: 'test'
  });
});

/**
 * Handle Alexa request
 */
expressApp.post('/ask', (req, resp) => {
  /**
   * Verifirer (undone)
   */
  // if(req.body.session.application.applicationId != )

  const intentName = req.body.request.intent.name;
  console.log(`${intentName} is called`);

  /**
   * Custom Response
   */
  resp.json({
    version: '1.0',
    response: {
      outputSpeech: {
        type: 'SSML',
        ssml: '<speak> Alexa is a bad girl. </speak>'
      },
      shouldEndSession: true
    },
    sessionAttributes: {}
  });
});

https.createServer(SERVER_CONFIG, expressApp)
  .listen(443, () => {
    console.log('========================================');
    console.log(pad('HTTPS sever 啟動', 25));
    console.log('========================================');
  });
