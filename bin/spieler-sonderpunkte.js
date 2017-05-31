var fs = require('fs');
var change = require('../lib/index');

var opts = require('nomnom')
   .option('input', {
      abbr: 'i',
      flag: false,
      help: 'SWT file',
      required: true
   })
   .option('output', {
      abbr: 'o',
      flag: false,
      help: 'SWT file output',
      required: true
   })
   .option('value', {
      help: 'numeric value',
      required: false,
      default: 0
   })
   .option('from', {
      help: 'starting player number',
      required: false
   })
   .option('to', {
      help: 'ending player number',
      required: false
   })
   .option('version', {
      flag: true,
      help: 'print version and exit',
      callback: function() {
         return require('../package.json').version;
      }
   })
   .parse();

opts.value = parseFloat(opts.value)

change(opts, function(err, out) {
  if (err)
    throw err;

  fs.writeFileSync(opts.output, out);
});