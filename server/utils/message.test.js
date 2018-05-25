var expect = require('expect')
var {generateMessage} = require('./message')

describe('generateMessage', () => {
  it('should generate correct message object', () => {

    // store res in var
    var from = 'Jen'
    var text = 'Some message'
    var message = generateMessage(from, text)

    //assert from match
    expect(message.createdAt).toBeAn('number');
    expect(message).toInclude({from, text});


  })
})
