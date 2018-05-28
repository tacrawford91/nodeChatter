const expect = require('expect');
const {Users} = require('./users')

describe('Users', () => {
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Troy',
            room: 'testRoom1'
        },{
            id: '2',
            name: 'Anthony',
            room: 'testRoom2'
        },{
            id: '3',
            name: 'Crawfish',
            room: 'testRoom1'
        }]
    });
    //add user
    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Troy',
            room: 'Test test Test'
        };
        let resUser = users.addUser(user.id,user.name,user.room)
        expect(users.users).toEqual([user]);
    });
    // remove user
    it('should remove user', () => {
        var userId = '2'
        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    })
    it('should NOT remove user', () => {
        var userId = '99'
        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    })
    // find user
    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.name).toBe('Anthony');
    })
    it('should NOT find user', () => {
        var userId = '99';
        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    })
    // get users name in chatroom
    it('should return names for testRoom1', () =>{
        let userList = users.getUserList('testRoom1');
        expect(userList).toEqual(['Troy', 'Crawfish'])
    });
    // get users name in chatroom
    it('should return names for testRoom2', () =>{
        let userList = users.getUserList('testRoom2');
        expect(userList).toEqual(['Anthony']);
    });
})