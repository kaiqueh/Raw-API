let user = require("../mocks/User");

module.exports = {
    listUsers(request, response) {
        const { order } = request.query;

        const sortdUser = user.sort((a,b) => {
        if (order === 'desc'){
            return a.id < b.id ? 1 : -1;
        }
            return a.id > b.id ? 1 : -1;
        })
        response.send(200, sortdUser);
    },
    getUserById(request, response) {
        const { id } = request.params;

        const users = user.find((user) => user.id === Number(id));

        if (!users) {
            response.send(400, { error: "User not found" });
            return;
        }else{
            response.send(200, users);
        }

    },
    CreateUser(request, response) {
        const {body} = request
        const lastUserId = user[user.length - 1].id;
        const newUser = {
            id: lastUserId + 1,
            name: body.name,
        };
        user.push(newUser);
        response.send(200, newUser) 
    },
    upgradeUser(request, response) {
        let { id } = request.params;
        const { name } = request.body;

        id = Number(id);

        const userExists = user.find((user) => user.id === id);

        if (!userExists) {
            return response.send(400, { error: "User not found" });
        }

        user = user.map((user) => {
            if (user.id === id) {
                return {
                    ...user,
                    name,
                };
            }
            return user;
        });
        response.send(200, { id, name });
    },

    deleteuser(request, response) {
        let { id } = request.params;
        id = Number(id);

        user = user.filter((user) => user.id !== id);

        response.send(200, { deleted: true });
    }

    
}
