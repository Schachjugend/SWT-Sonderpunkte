module.exports = change;

var swtparser = require('swtparser');

function change(opts, callback) {
  if (typeof opts.input === 'object') {
    if (require('buffer').Buffer.isBuffer(opts.input)) {
      fromBuffer(opts, callback);
    }
    else if (opts.input instanceof DataView) {
      fromDataView(opts, callback);
    }
  }
  else if (typeof opts.input === 'string') {
    fromFile(opts, callback);
  }
}

function fromFile(opts, callback) {
  require('fs').readFile(opts.input, function(err, buffer) {
    if (err) return callback(err);
    opts.input = buffer
    fromBuffer(opts, callback);
  });
}

function fromBuffer(opts, callback) {
  var arrayBuffer = bufferToArrayBuffer(opts.input);
  var view = new DataView(arrayBuffer);
  opts.input = view

  fromDataView(opts, callback);
}

function bufferToArrayBuffer(buffer) {
  // see http://stackoverflow.com/questions/8609289/convert-a-binary-nodejs-buffer-to-javascript-arraybuffer
  var ab = new ArrayBuffer(buffer.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i];
  }
  return ab;
}

function arrayBufferToBuffer(ab) {
  var buffer = new Buffer(ab.byteLength);
  for (var i = 0; i < buffer.length; ++i) {
      buffer[i] = ab[i];
  }
  return buffer;
}


function fromDataView(opts, callback) {
  var dataView = opts.input
  var start = opts.from || 1
  var value = opts.value || 0

  var tnmt = swtparser(dataView, function(err, tnmt) {
    if (err)
      return callback(err);

    var end = opts.to || tnmt.general[4]

    var Structure = require('swtparser/lib/structure.json');

    var playerOffset = parseInt(Structure.parameters['start:fixtures_players'])

    if (tnmt.general[3]) {
      // at least one round paired
      playerOffset += (tnmt.general[4] * tnmt.general[1] * parseInt(Structure.parameters['length:pairing']))
      playerOffset += (tnmt.general[80] * tnmt.general[1] * parseInt(Structure.parameters['length:pairing']))
    }

    var sonderPunkteOffset = Structure.structures.player[2029];
    var offset

    // loop through players
    for (var i = (start-1); i < tnmt.general[4] && i < end; i++) {
      offset = playerOffset + i * parseInt(Structure.parameters['length:player'])

      // manipulate 'sonderPunkte' field
      dataView.setInt8(offset+sonderPunkteOffset.where, value*2)
    }

    var buffer = arrayBufferToBuffer(dataView);
    callback(null, buffer);
  });
}