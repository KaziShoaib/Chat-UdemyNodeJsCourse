const expect = require('expect');

const {Users} = require('./users');

describe('Users', ()=>{
  let users;

  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id:'1',
      name: 'Kazi',
      room: 'node course'
    },{
      id:'2',
      name: 'shoaib',
      room: 'ml course'
    },{
      id:'3',
      name: 'muhammad',
      room: 'node course'
    }];
  });

  it('should add new user',()=>{
    let users = new Users();
    let user = {
      id:'123',
      name: 'shuvo',
      room: 'dl course'
    };
    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', ()=>{
    let userList = users.getUserList('node course');
    expect(userList).toEqual(['Kazi','muhammad']);
  });

  it('should return names for ml course', ()=>{
    let userList = users.getUserList('ml course');
    expect(userList).toEqual(['shoaib']);
  });

  it('should remove a user',()=>{
    let removedUser = users.removeUser('1');
    expect(removedUser).toEqual({
      id:'1',
      name: 'Kazi',
      room: 'node course'
    });
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user',()=>{
    let removedUser = users.removeUser('232');
    expect(removedUser).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find a user',()=>{
    let foundUser = users.getUser('1');
    expect(foundUser).toEqual({
      id:'1',
      name: 'Kazi',
      room: 'node course'
    });
  });

  it('should not find a user',()=>{
    let foundUser = users.getUser('321');
    expect(foundUser).toBeFalsy();
  });

});
