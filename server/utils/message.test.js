let expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage',()=>{
  it('should generate the correct message object',()=>{
    let res = generateMessage('shuvo', 'hi');
    // expect(res.from).toBe('shuvo');
    // expect(res.text).toBe('hi');
    expect(typeof res.createdAt).toBe('number');
    expect(res).toMatchObject({
      from:'shuvo',
      text: 'hi'
    });
  });
});
