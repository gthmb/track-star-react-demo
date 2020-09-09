const storeLocal = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

const getLocal = (key) => JSON.parse(window.localStorage.getItem(key));

export const getUsers = async () => {
    const response = await fetch('http://localhost:3000/users');
    const users = response.json();
    return users;
};

export const login = async () => {
    const response = await fetch('http://localhost:3000/users/19b83e7');
    const user = await response.json();
    storeLocal('user', user);
    return user;
};

export const logout = () => {
    window.localStorage.setItem('user', null);
};

export const getActiveUser = () => getLocal('user');
