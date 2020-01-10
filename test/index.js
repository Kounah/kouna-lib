#!/usr/bin/env node
'use strict';

const process = require('process');
const {spawn} = require('child_process');
const path = require('path');
const parseArgs = require('../fn/parse-args');
const discoverDir = require('../fn/discover-dir');
const Queue = require('../cls/queue.class');

let args = parseArgs(process.argv);

if(typeof args.all === 'boolean' && args.all === true) {  

  /**@type {Array.<string>} */
  let items = [];
  let q = new Queue(items, async item => {
    let name = path.relative(__dirname, item);
    let count = 0;

    function stamp() {
      return `[${new Date().toUTCString()}][${name}][${count++}] `;
    }

    /**
     * 
     * @param {Buffer} chunk 
     * @param {string} pre 
     */
    function formatChunk(chunk, pre) {
      let fill = ' '.repeat(pre.length);
      let str = chunk.toString('utf-8').trim();
      return pre + str.split('\n').join('\n' + fill);
    }

    return await new Promise(resolve => {
      let p = spawn(args.__args[0], [item]);
      
      p.stdout.on('data', chunk => {
        let s = stamp();
        console.log(formatChunk(chunk, s));
      });

      p.stderr.on('data', chunk => {
        let s = stamp();
        console.error(formatChunk(chunk, s));
      });

      p.on('error', err => {
        let s = stamp();
        console.error(s + err.stack.trim()
          .split('\n')
          .join('\n' + ' '.repeat(s.length)));  
      });

      p.on('exit', code => {
        console.log(`${stamp()}process exited with code ${code}`);
      });

      p.on('disconnect', () => {
        console.log(`${stamp()}disconnnected`);
        resolve();
      });
    });
  });

  discoverDir(__dirname, {
    excludes: [
      /^\..*$/gm,
      /^index.*$/gm
    ],
    noResult: true,
    onFile: (file) => {
      q.add(file);
    }
  }).then(() => q.once('done', () => q.terminate()));
} else {
  throw new Error('Not Implemented');
}