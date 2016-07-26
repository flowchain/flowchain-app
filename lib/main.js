/**
 *
 * The MIT License (MIT)
 *
 * Flowchain Open Source Project
 * 
 * Copyright (c) 2016-present, Jollen. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
var program = require('commander');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync(__dirname + '/../package.json'));

var chalk = require('chalk');
var elegantSpinner = require('elegant-spinner');
var logUpdate = require('log-update');
var frame = elegantSpinner();
require('shelljs/global');

var devify = require('devify-server');

/** All available components **/
var components =[
  require('../components/io.flowchain.fs').getComponent(),
  require('../components/io.flowchain.sms').getComponent(),
  require('../components/io.flowchain.console').getComponent()
];

program
.version(config.version);

program
.command('start <file>')
.description('Load a graph and start the server')
.action(function(file) {
  var graph = JSON.parse(fs.readFileSync(__dirname + '/../' + file));
  var server = devify[graph.type];

  if (typeof server === 'undefined') {
    console.log(chalk.red('[devify] server type not found: ' + server));
    exit(-1);
  }

  console.log(chalk.red('[devify] Starting ' + graph.type + ' server...'));

  server.start({
    graph: graph,
    components: components
  });
}).on('--help', function() {
  console.log('  Examples:');
  console.log();
  console.log('    $ devify-graph start graphs/hello-fs.json');
  console.log();
});

program
.parse(process.argv);