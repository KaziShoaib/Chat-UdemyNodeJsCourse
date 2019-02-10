class Users{
  constructor(){
    this.users = [];
  }
  addUser(id, name, room){
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser(id){
    let removedUser = this.users.filter(user=>user.id===id)[0];
    this.users = this.users.filter(user=>user.id!==id);
    return removedUser;
  }
  getUser(id){
    let user = this.users.filter(user=>user.id===id)[0];
    return user;
  }
  getUserList(room){
    let users = this.users.filter(user=>user.room===room);
    let namesArray = users.map(user => user.name);
    return namesArray;
  }
}

module.exports = {Users};
