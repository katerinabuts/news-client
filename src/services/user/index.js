const CONSTANTS = require('../constants');
export class UsersService {

    static createUser (user) {
        return fetch(CONSTANTS.MAPS.user, {
            method: 'POST',
            headers: CONSTANTS.GetDefaultHeaders(),
            body: JSON.stringify(user.toJSON())
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static login (user) {
        console.log(JSON.stringify(user))
        return fetch(require('../constants').MAPS.login, {
            method: 'POST',
            headers: CONSTANTS.GetDefaultHeaders(),
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static search (searchString) {
        return fetch(require('../constants').MAPS.user+`/search/?searchString=${searchString}`, {
            method: 'GET',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static following () {
        return fetch(require('../constants').MAPS.followers, {
            method: 'GET',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static getUser (user_id) {
        return fetch(require('../constants').MAPS.user + `/${user_id}`, {
            method: 'GET',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }
}