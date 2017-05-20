const BASE_URL = "http://localhost:3001/";
const MAPS = {
    user: `${BASE_URL}users`,
    login: `${BASE_URL}users/login`,
    news: `${BASE_URL}news`,
    repost: `${BASE_URL}news/repost`,
    feed: `${BASE_URL}news/feed`,
    follows: `${BASE_URL}follows`,
    followers: `${BASE_URL}users/followers`,
};
const GetDefaultHeaders = () => {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
};

const GetHeadersWithAuth = () => {
    let res = GetDefaultHeaders();
    res.Authorization = `Bearer ${localStorage.getItem("auth")}`;
    return res;
}


export {
    BASE_URL,
    MAPS,
    GetHeadersWithAuth,
    GetDefaultHeaders
}