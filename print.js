const process = require('process');
const os = require('os');

/**
 * @typedef {Object} StreamObject
 * @prop {string} filename
 * @prop {() => import('fs').WriteStream} ws - function to create a writable stream
 * @prop {boolean} keepOpen - keep the stream open after writing to it
 * @prop {number} maxLines - the maximum number of lines in the log file
 */

function convertToString(o) {
  switch(typeof o) {
  case 'object':
    try {
      if(o instanceof Error) {
        return o['stack'];
      } else return Object.getPrototypeOf(o).constructor.name + ' ' + JSON.stringify(o);
    } catch(err) {
      if(err.message.startsWith('Converting circular structure to JSON')) {
        return '<circular>';
      } else throw err;
    }
  case 'string':
    return o.split(os.EOL).join(os.EOL);
  default:
    return String(o);
  }
}

/**
 * @typedef {('stdout'|'stderr')} NamedStream
 * @typedef {(StreamObject|NamedStream)} Stream
 * prints args to a given WriteStream
 * @param {Stream} stream
 * @param  {...any} args 
 */
function print(stream, ...args) {
  if(typeof stream === 'string') {
    if(stream == 'stdout') stream = process.stdout;
    if(stream == 'stderr') stream = process.stderr;
  }

  if(typeof stream === 'object' && typeof stream.ws === 'function') {
    let ws = stream.ws();
    ws.write(args.map(arg => convertToString(arg)).join(' '), (err) => {
      if(err) console.error('An Error occured writing to stream.', err);
    });
    if(!stream.keepOpen) ws.close();
    return;
  }

  for(let i = 0; i < args.length; i++) {
    stream.write(convertToString(args[i]));
  }
}

/**
 * prints args to a given WriteStream and appends os.EOL
 * @param {Stream} stream 
 * @param  {...any} args 
 */
function println(stream, ...args) {
  if(typeof stream === 'string') {
    if(stream === 'stdout') console.log(...args);
    if(stream === 'stderr') console.log(...args);
    return;
  }

  print(stream, ...(args.concat(os.EOL)));
}

/**
 * prints args to stdout
 * @param  {...any} args 
 */
function printStdout(...args) {
  print(process.stdout, ...args);
}

/**
 * prints args to stdout and appends os.EOL
 * @param  {...any} args 
 */
function printlnStdout(...args) {
  println(process.stdout, ...args);
}

/**
 * prints args to stderr
 * @param  {...any} args 
 */
function printStderr(...args) {
  print(process.stderr, ...args);
}

/**
 * prints args to stderr and appends os.EOL
 * @param  {...any} args 
 */
function printlnStderr(...args) {
  println(process.stderr, ...args);
}

/**
 * fills an entire line with a given sequence and appends os.EOL
 * @param {import('fs').WriteStream} stream 
 * @param {string} seq 
 */
function fill(stream, seq) {
  if(typeof stream.columns === 'number') {
    print(stream, seq.repeat(Math.trunc(stream.columns/seq.length)) + seq.substr(0, stream.columns%seq.length));
  } else {
    print(stream, seq);
  }
  print(os.EOL);
}

/**
 * fills an entire line with a given sequence and appends os.EOL
 * @param {string} seq 
 */
function fillStdout(seq) {
  fill(process.stdout, seq);
}

/**
 * fills an entire line with a given sequence and appends os.EOL
 * @param {string} seq
 */
function fillStderr(seq) {
  fill(process.stderr, seq);
}

module.exports = {
  print,
  println,
  printStdout,
  printlnStdout,
  printStderr,
  printlnStderr,
  fill,
  fillStdout,
  fillStderr
};
