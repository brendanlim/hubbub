#!/usr/bin/env node
var program = require('commander');
var co = require('co');
var prompt = require('co-prompt');
var moment = require('moment');

// future:
//   .option('-n, --num <num>', 'The number of events to generate', parseInt, 1)

var option = "nextweek"
var location = "TBD in San Francisco"
program
  .command('events <option> <location>')
  .action(function (givenOption, givenLocation) {
    console.log('arg: %s', argList);
    option = givenOption || option;
    location = givenLocation || location;
  })
  .parse(process.argv)

console.log('generating event...');

var eventTime = moment();
if (option == "nextlunch") {
  var nextNoon = new Date();
  if (nextNoon.getHours()>=12) nextNoon.setDate(nextNoon.getDate()+1)
  nextNoon.setHours(12,0,0,0);
  eventTime = nextNoon;
} else {
  // lunch next week
  eventTime = moment(12, "HH").add(7, 'days').toDate();
}

var id = moment(eventTime).format("YYYYMMDD-HH");
event = {
    "location": location,
    "name": "Coder Lunch",
    "startAt": Number(eventTime)/1000,
    "endAt": Number(moment(eventTime).add(1, 'hour'))/1000,
    "state":"open"
}
console.log('event', event);
console.log('--------------------');
var sys = require('util');
var exec = require('child_process').exec;

eventBashArg = JSON.stringify(event)
  .replace(/"/g, '\\"');

exec(`echo "${eventBashArg}" | firebase database:set /events/${id} -y`,
  function (error, stdout, stderr) {      // one easy function to capture data/errors
    if (stdout) console.log('stdout: ' + stdout);
    if (stderr) console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  }
);



