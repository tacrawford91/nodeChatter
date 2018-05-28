[{
    id: '33131321',
    name: 'Troy',
    room: 'ChatterRoom1'
}]

//addUser (id, name, room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users {
    constructor () {
        this.users = []
    }
    addUser (id, name, room) {
        let user = {id,name,room}
        this.users.push(user)
        return user;
    }
    removeUser(id) {
        //return user that was removed
        var user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user) => user.id !==id); 
        } 
        return user
    }
    getUser(id) {
        //return user
        return this.users.filter((user)=> user.id === id)[0];
    }
    getUserList(room){
        //return user array
        //find all user objects with in room (parameter)
        let users = this.users.filter((user)=> user.room === room);
        //create array of just names from objects
        var namesArray = users.map((user)=> user.name); 
        return namesArray;
    }
}

module.exports = {Users};