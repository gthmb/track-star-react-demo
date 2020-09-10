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
    const response = await fetch('http://localhost:3000/users');
    const users = await response.json();
    return users;
};

export const getUserDetail = async (id, embedTime = true) => {
    try {
        const response = await fetch(
            `http://localhost:3000/users/${id}${embedTime ? '?_embed=time-entries' : ''}`
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
    const entryResponse = await post('http://localhost:3000/time-entries', {
        userId,
        start: new Date().toISOString(),
    });
    const timeEntry = await entryResponse.json();
    await put(`http://localhost:3000/users/${userId}`, {
        status: 'active',
        activeEntry: timeEntry.id,
    });
    return getUserDetail(userId);
};

export const punchUserOut = async (entryId) => {
    const entryResponse = await put(`http://localhost:3000/time-entries/${entryId}`, {
        end: new Date().toISOString(),
    });
    const entry = await entryResponse.json();
    const { userId } = entry;

    await put(`http://localhost:3000/users/${userId}`, {
        status: 'away',
        activeEntry: null,
    });

    return getUserDetail(userId);
};

export const login = async () => {
    const response = await fetch('http://localhost:3000/users/19b83e7');
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
