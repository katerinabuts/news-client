const CONSTANTS = require('../constants');
export class NewsService {

    static createNews(news) {
        console.log(news);
        return fetch(require('../constants').MAPS.news, {
            method: 'POST',
            headers: CONSTANTS.GetHeadersWithAuth(),
            body: JSON.stringify(news.toJSON())
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static updateNews(news) {
        console.log(news);
        return fetch(require('../constants').MAPS.news+`/${news.id}`, {
            method: 'PUT',
            headers: CONSTANTS.GetHeadersWithAuth(),
            body: JSON.stringify(news.toJSON())
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static fetchNewsById(id) {
        return fetch(require('../constants').MAPS.news + `/${id}`, {
            method: 'GET',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static fetchFeed () {
        return fetch(require('../constants').MAPS.feed, {
            method: 'GET',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }

    static fetchOtherFeed (user_id) {
        return fetch(require('../constants').MAPS.feed, {
            method: 'GET',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }
    static repost (news_id) {
        return fetch(`${require('../constants').MAPS.repost}/${news_id}`, {
            method: 'POST',
            headers: CONSTANTS.GetHeadersWithAuth()
        })
        .then((response) => response.json())
        .catch((error) => {
            console.error(error);
        });
    }
    static removeRepost (news_id) {
    return fetch(`${require('../constants').MAPS.repost}/${news_id}`, {
        method: 'DELETE',
        headers: CONSTANTS.GetHeadersWithAuth()
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
    }
    static remove (news_id) {
    return fetch(`${require('../constants').MAPS.news}/${news_id}`, {
        method: 'DELETE',
        headers: CONSTANTS.GetHeadersWithAuth()
    })
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
    }
}