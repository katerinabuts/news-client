const CONSTANTS = require('../constants');
export class FollowsService {

    static follow (user_id) {
        const loggedId = JSON.parse(localStorage.getItem("user")).id;
        return fetch(CONSTANTS.MAPS.follows+ `/${user_id}`, {
            method: 'PUT',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static unFollow (user_id) {
        const loggedId = JSON.parse(localStorage.getItem("user")).id;
        return fetch(CONSTANTS.MAPS.follows + `/${user_id}`, {
            method: 'DELETE',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }
}