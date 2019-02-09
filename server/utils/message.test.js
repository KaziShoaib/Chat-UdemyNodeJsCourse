let expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage',()=>{
  it('should generate correct location object', ()=>{
    let res = generateLocationMessage('shuvo',345,567);
    expect(typeof res.createdAt).toBe('number');
    expect(res).toMatchObject({
      from:'shuvo',
      url:`https://www.google.com/maps?q=345,567`
    });
  });
});
