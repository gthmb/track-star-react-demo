const host =
    window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://track-star-api.herokuapp.com';
// : 'https://my-json-server.typicode.com/gthmb/track-star-json-server';

const Urls = {
    Users: `${host}/users/`,
    TimeEntries: `${host}/time-entries/`,
};

const storeLocal = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

const getLocal = (key) => JSON.parse(window.localStorage.getItem(key));

const write = (url, method, data) =>
    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

const put = async (url, data) => {
    const detailRespone = await fetch(url);
    const detail = await detailRespone.json();
    const { id, ...rest } = detail;
    return write(url, 'PUT', { ...rest, ...data, id });
};

const post = (url, data) => write(url, 'POST', data);

export const getUsers = async () => {
    const response = await fetch(Urls.Users);
    const users = await response.json();
    return users;
};

export const getUserDetail = async (id, embedTime = true) => {
    try {
        console.log(`${Urls.Users}${id}${embedTime ? '?_embed=time-entries' : ''}`);
        const response = await fetch(
            `${Urls.Users}${id}${embedTime ? '?_embed=time-entries' : ''}`
        );
        const user = await response.json();
        if (Object.keys(user).length === 0) {
            throw new Error('no-user-found');
        }
        return user;
    } catch (e) {
        return false;
    }
};

export const punchUserIn = async (userId) => {
    const entryResponse = await post(Urls.TimeEntries, {
        userId,
        start: new Date().toISOString(),
    });
    const timeEntry = await entryResponse.json();
    await put(`${Urls.Users}${userId}`, {
        status: 'active',
        activeEntry: timeEntry.id,
    });
    return getUserDetail(userId);
};

export const punchUserOut = async (entryId) => {
    const entryResponse = await put(`${Urls.TimeEntries}${entryId}`, {
        end: new Date().toISOString(),
    });
    const entry = await entryResponse.json();
    const { userId } = entry;

    await put(`${Urls.Users}${userId}`, {
        status: 'away',
        activeEntry: null,
    });

    return getUserDetail(userId);
};

export const login = async () => {
    const response = await fetch(`${Urls.Users}19b83e7`);
    const user = await response.json();
    storeLocal('user', user.id);
    return user;
};

export const logout = () => {
    window.localStorage.setItem('user', null);
};

export const getActiveUser = async () => {
    const userId = getLocal('user');

    if (!userId) {
        return Promise.resolve(false);
    }

    return getUserDetail(userId, false);
};
