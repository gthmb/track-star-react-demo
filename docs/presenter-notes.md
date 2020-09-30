# Presenter's Notes

This document contains notes and steps I follow when I teach this workshop. Hopefully you find it helpful!

# Section 1: Initialized Project, Added Parcel [(commit link)](https://github.com/gthmb/track-star-react-demo/tree/6f6c5fb2d6f25cf4e30da7cfb15752d5d14682d2)

Create a directory, enter it, and run: `yarn init -y`.

Create a `src` folder and enter it.

Create `index.html` and add the app div and script tag to the body:

```
<div id="root">This is where the app will go</div>
<script src="./App.js"></script>
```

Create `App.js` with a basic `console` statement

Add Pacrel to the project with: `yarn add parcel-bundler --dev`.

Open the `package.json` file and update the `browserList` to enable ES6 and `async/await`:

```json
"browserslist": [
    "last 2 Chrome versions"
]
```

also add the parcel dev command

```json
"scripts": {
    "dev": "parcel src/index.html",
  }
```

Copy over the final version of `src/styles.css`

Add the style sheet and fonts to the `head`:

```html
<link rel="stylesheet" href="./style.css" />
<link
    href="https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap"
    rel="stylesheet"
/>
```

# Section 2: Adding React and making the App Component [(commit link)](https://github.com/gthmb/track-star-react-demo/tree/c975054637b5a3763eccea27d640cc04fe878ef6)

Open `App.js` and add React and ReactDOM

```javascript
import React from 'react';
import ReactDom from 'react-dom';
```

We are using Functional Components in React today

Create the App component:

```javascript
const App = () => {
    return (
        <div>
            <header>
                <h1>Track Star</h1>
                <div>Hello!</div>
            </header>
        </div>
    );
};
```

No need to export this, as we are going to tell ReactDOM to render it into `#root`

# Section 3: Linting and Formatting Tools [(commit)](https://github.com/gthmb/track-star-react-demo/commit/8a7b79e35c49a04cc464ac91564dcace326daeb9)

Add `eslint` and `prettier`.

`eslint` will help us catch bugs and bad practives.

`prettier` makes sure we will have consistly formatted code.

Add them to our project:

```javascript
yarn add -D eslint eslint-config-prettier eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks prettier
```

Copy over `.eslintrc`.

Enable the Prettier and Eslint plugins in vscode

# Section 4: Adding the UserList

Add a `app-content` div to the `App` component below the header that references the `UserList` component:

```javascript
<div className="app-content">
    <UserList />
</div>
```

Create a `UserList` component in the same file:

```javascript
const UserList = () => {
    return (
        <div className="user-list">
            <p>This is a user list!</p>
            <ul>
                <li>this is user 1</li>
                <li>this is user 2</li>
            </ul>
        </div>
    );
};
```

Extract `UserList` to its own file

Create `UserListItem` file and component with hardcoded values:

```javascript
const UserListItem = () => {
    return (
        <li>
            <h3>Jonathan Greene</h3>
            <div className="stats">
                <p>Company: Pixability</p>
                <p>Status: Active</p>
            </div>
        </li>
    );
};
```

Use `UserListItem` in `UserList`

Refactor `UserListItem` with `props`.

`props` are like `attributes` of HTML tags. They are accessible in React Function Components through the components arguments, aka: `(props)`

# Section 5: Render UserList based on API results [(commit)](https://github.com/gthmb/track-star-react-demo/commit/c258778b6480a7bfe8bcc80315eac9d166b5a237)

## Setting up the API for use in our dev env

Install `json-server`:

```javascript
yarn add json-server
```

Copy over `api/db.json` and `src/ApiService.js`

Update `package.json` with new script:

```javascript
"start:api": "json-server api/db.json"
```

Run `yarn start:api` in a seperate terminal instance

## Back to the workshop!

We only want to load the users when the UserList is first rendered, not each time the component is renderer.

Using 2 hooks, `useEffect` and `useState`

`useEffect` allows us to execute a callback function when certain criteria are met

`useState` allows us to manage mutable values our components rely on

Show `useState` and mock in a value:

```javascript
const [users, updateUsers] = React.useState([]);
```

Show `useEffect` to load and set `users`

```javascript
React.useEffect(() => {
    getUsers().then(updateUsers);
}, []);
```

Use `map` to render the `UserListItems`:

```javascript
{
    users.map((user) => (
        <UserListItem
            key={user.id}
            firstName={user.firstName}
            lastName={user.lastName}
            company={user.company}
            status={user.status}
        />
    ));
}
```

The use the `rest` operator to make it easier

```javascript
{
    users.map((user) => <UserListItem key={user.id} {...user} />);
}
```

# Section 6: De-structuring props and adding StatusIndicator [(commit)](https://github.com/gthmb/track-star-react-demo/commit/6372f67ff7468a36b6f8d463920c7951bdc2a289)

De-structuring is a l33t tip to feel extra cool:

```javascript
const UserListItem = ({ firstName, lastName, company, status }) => {
```

Add `StatusIndicator` to the `UserListItem`'s `h3`:

```javascript
<StatusIndicator status={status} />
```

Create `StatusIndicator.js`:

```javascript
import React from 'react';

const StatusIndicator = ({ status }) => (
    <div title={status} className={`status-indicator ${status}`}></div>
);

export default StatusIndicator;
```

# Section 7: Add Detail Routing [(commit)](https://github.com/gthmb/track-star-react-demo/commit/a4082e83e99275c16f4aa3218c59c53084bfed64)

Import Reach Router into App.js:

```javascript
import { Router } from '@reach/router';
```

Add the Router component (replace `<UserList />`):

```javascript
<Router>
    <UserList path="/" />
    <UserDetail path="/user/:id" />
</Router>
```

> We wrap the `UserList` with a `Router` component so we can use the router to conditionally render our component based on the URL path of our application. The `path` property is used for components inside a `Router` instance.
>
> We are also adding a `UserDetail` component with a special path containing a 'route paramter'. Route paramters are prefixed with a `:` and will be available as a `prop` in the component when it's renderered
>
> We will define the UserDetail component shortly!

Add the Link Component to the header (replace current `h1`):

```javascript
<Link to="/">
    <h1>Track Star</h1>
</Link>
```

> We are adding a `Link` component around our `h1` tag. `Link` component work like `a` tags (links in `html`), but they will update our URL without reloading our application. We use the `to` property to tell the `Link` what to update the URL to.

Create `UserDetail`:

```javascript
import React from 'react';

const UserDetail = ({ id }) => {
    return <p>this is a user with an id of: {id}</p>;
};

export default UserDetail;
```

Add `Link` to the `UserListLitem`, right after the `<li>` tag:

```javascript
<Link to={`/user/${id}`}>
```

Flesh out the UserDetail to load data and display the JSON:

```javascript
import React, { useState, useEffect } from 'react';
import { getUserDetail } from './ApiService';
import { navigate } from '@reach/router';

const UserDetail = ({ id }) => {
    const [user, updateUser] = useState(null);

    useEffect(() => {
        getUserDetail(id).then(updateUser);
    }, []);

    if (user === false) {
        navigate('/');
    }

    return <div className="user-detail">{user && <pre>{JSON.stringify(user, null, 4)}</pre>}</div>;
};

export default UserDetail;
```

> We are going to use the combination of an Effect and State to load and render data from our API about a user with a matching id. We'll implement the Effect first, and then store it in state.
>
> We will also handle the case where we cant find data for a user id by sending them back to the base route using `navigate`. `navigate` is an imperative form updating the router, whereas `Link` are declarative. The `@reach` router supports both!

> REINFORCE: getUserDetail returns a Promise, so we use `then` to pass the promised data to another function (`console.log` or `updateUser`)

# Section 8: Build out UserDetail; Add punch in and out [(commit)](https://github.com/gthmb/track-star-react-demo/commit/e68e47c7807bd0c66a3907cb5f18cca799d78b66)

Add some mark-up to the `UserDetail`:

```javascript
return (
    <div className="user-detail">
        {user && (
            <>
                <div className="user-detail-header">
                    <h1>
                        {user.firstName} {user.lastName}
                    </h1>
                    <p>{user.company}</p>
                </div>
                <div className="user-actions">
                    <StatusIndicator status={user.status} />
                </div>
            </>
        )}
    </div>
);
```

> Next we are going to add the buttons to punch a user in and out, then we will implement a time to show the time entries for a user

Add buttons to `UserDetail`

```javascript
<div className="user-actions">
    <StatusIndicator status={user.status} />
    {user.status === 'away' && <button>Punch In</button>}
    {user.status === 'active' && <button className="light-grey">Punch Out</button>}
</div>
```

> Here we are stick JS code directly in our JSX. JS is surrounded by brackets. We use the logical `&&` to conditionally render a JSX element if the preceeding condition is true

Add the onClick handler props to the buttons:

```javascript
{
    user.status === 'away' && <button onClick={handlePunchIn}>Punch In</button>;
}
{
    user.status === 'active' && (
        <button className="light-grey" onClick={handlePunchOut}>
            Punch Out
        </button>
    );
}
```

Define the handler functions:

```javascript
const handlePunchIn = () => {
    punchUserIn(id).then(updateUser);
};

const handlePunchOut = () => {
    punchUserOut(user.activeEntry).then(updateUser);
};
```

Now to handle the time entries. Let's look at the data in the console:

```javascript
console.log(user?.['time-entries']);
```

> Note: the `?.` is a null-safe check of a property

> We are working with an array, so we are going to want to use `Array.map` to map the the elements of the array into list items.
>
> Also, if a user doesn't have any time-entries, we want to display 'No Time Entries'

Add the `ul` below right before the `<div class="user-actions">`

```javascript
<ul>
    {user['time-entries'].length > 0 ? (
        user['time-entries'].map((entry) => (
            <li key={entry.id}>
                start: {entry.start}, end: {entry.end}
            </li>
        ))
    ) : (
        <li>No Time Entries</li>
    )}
</ul>
```

Next, let's create a component to render the time entries

Create `TimeEntry.js`:

```javascript
import React from 'react';
import { formatDistance, format } from 'date-fns';

const formatDate = (date) => format(date, 'MMM do h:mm a');

const TimeEntry = ({ start, end }) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    const elapsed = formatDistance(endDate, startDate);

    return (
        <li>
            <div>
                {formatDate(startDate)} - {end ? formatDate(endDate) : 'Present'} ({elapsed})
            </div>
        </li>
    );
};

export default TimeEntry;
```

Use `TimeEntry` in `UserDetail` by replacing the `ul` with:

```javascript
<TimeEntry key={entry.id} {...entry} />
```

Walk-through the code for `TimeEntry` and talk about the `date-fns` and the methods we are using.

> `MMM`: (Sep), `do`: (6th), `h:mm`: (6:13), `a`: (PM)
>
> `formatDistance`: English approximation: (about 6 hours)

# Section 9: Add a Loading Indicator [(commit)](https://github.com/gthmb/track-star-react-demo/commit/16d5a7b41081ed003e89ed9c7b0ebd0214bd13a8)

We will add 2 new state hooks for tracking loading status in `UserDetail`. One for tracking the user detail endpoint, another for tracking the status of a punch-in or punch-out request.

Add the hooks to `UserDetail` right below the `user` state hook:

```javascript
const [isLoading, updateLoading] = useState(false);
const [isPunching, updatePunching] = useState(false);
```

## Implement the `isLoading`

Call `updateLoading(true)` in the effect, and set it to false in the `finally`:

```javascript
useEffect(() => {
    getUserDetail(id).then(updateUser);
    updateLoading(true);
    getUserDetail(id)
        .then(updateUser)
        .finally(() => updateLoading(false));
}, []);
```

Import the `LoadingIndicator`

```javascript
import LoadingIndicator from './LoadingIndicator';
```

Add a conditional to the JSX right below the `user-detail` div:

```html
{ isLoading && <LoadingIndicator />; }
```

> Stop the API, add a new command to start the API with forced latency

```json
"scripts": {
    ...
    "start:api-slow": "json-server -d 2000 api/db.json"
}
```

Run:

```
yarn start:api-slow
```

## Implement the `isPunching`

Add the `updatePunching` calls to the handlers:

```javascript
const handlePunchIn = () => {
    updatePunching(true);
    punchUserIn(id)
        .then(updateUser)
        .finally(() => updatePunching(false));
};

const handlePunchOut = () => {
    updatePunching(true);
    punchUserOut(user.activeEntry)
        .then(updateUser)
        .finally(() => updatePunching(false));
};
```

Update the JSX to conditionally show the loader in place of the buttons if `isPunching` is true:

```html
{
    isPunching ? <LoadingIndicator size={30} /> : <></>
}
```

## Add the loader to the `UserList`

```javascript
import LoadingIndicator from './LoadingIndicator';
```

```javascript
const [isLoading, updateLoading] = useState(false);
```

```javascript
useEffect(() => {
    updateLoading(true);
    getUsers()
        .then(updateUsers)
        .catch(() => {
            updateUsers([]);
        })
        .finally(() => updateLoading(false));
}, []);
```

```javascript
{
    isLoading && <LoadingIndicator />;
}
```

# Section 10: Login [(commit)](https://github.com/gthmb/track-star-react-demo/commit/efd9641d11f61af9912af51af26249f651224b40)

> Note: Might want to restart the API server without `slow`

## Add the `activeUser` state to App.js

```javascript
const [activeUser, updateActiveUser] = React.useState(null);

React.useEffect(() => {
    getActiveUser().then(updateActiveUser);
}, []);

console.log('activeUser', activeUser);
```

> Note: we can also add some helper methods to the `window` object to allow us to test
>
> ```
> // remove me before releasing!
> window.login = login;
> window.logout = logout;
> window.getActiveUser = getActiveUser;
> ```

### Update the `header` based on the logged in status

Add a `Link` to the `Header` to change the route for clicking on the logo

```javascript
<Link to={activeUser ? '/' : '/login'}>
    <h1>Track Star</h1>
</Link>
```

Show the user's name if they are logged in. Replace `<div>Hello</div>` with:

```javascript
{
    activeUser ? (
        <div>
            Hello, {activeUser.firstName} {activeUser.lastName}!
        </div>
    ) : (
        <div>Hello!</div>
    );
}
```

Add a Logout button with it's click handler:

```html
<button className="logout-button" onClick="{handleLogout}">Logout</button>
```

```javascript
const handleLogout = () => {
    logout();
    updateActiveUser(false);
};
```

Add logic to route the user to the login page is they are not logged in:

```javascript
if (activeUser === false) {
    navigate('/login');
}
```

Test this out by using the `window.login`/`window.logout` methods in the console. See the redirect if you are logged out and visit the homepage.

> Notice the error in the console: `Warning: Can't perform a React state update on an unmounted component.`
>
> This is because the effect that requests data is resolving after the redirect to the `login` page occurs. The best way to address this is to not render other content if the user is not logged in:

```javascript
<Router>
    {activeUser && (
        <>
            <UserList path="/" />
            <UserDetail path="/user/:id" />
        </>
    )}
</Router>
```

## Create a dummy `Login` component and route to it

```javascript
import React from 'react';

const Login = () => {
    return <p>login page</p>;
};

export default Login;
```

Add the `Login` component to the `Router` in `App`:

```javascript
<Router>
    <Login path="/login" />
    {activeUser && (
        <>
            <UserList path="/" />
            <UserDetail path="/user/:id" />
        </>
    )}
</Router>
```

> Test the route by visiting the `/login` route in the browser.

## Convert the `Login` component to a form

Build out the form UI in `Login`:

```javascript
const Login = () => {
    return (
        <div className="login">
            <form>
                <label htmlFor="location">
                    Username
                    <input id="username" placeholder="Username" />
                </label>
                <label htmlFor="password">
                    Password
                    <input id="password" type="password" placeholder="Password" />
                </label>
                <button>Login</button>
            </form>
        </div>
    );
};
```

> Clicking the button with auto post the form!

Prevent the default form action on submission:

```javascript
<form
    onSubmit={(e) => {
        e.preventDefault();
    }}
>
```

> Now we need a way to track the values a user types into the form fields. We need `state`!

Set up the state hooks:

```javascript
const [username, updateUsername] = React.useState('');
const [password, updatePassword] = React.useState('');
```

Add `value` and `onChange` props to the username...

```javascript
<input
    id="username"
    value={username}
    placeholder="Username"
    onChange={(e) => updateUsername(e.target.value)}
/>
```

... and the password

```javascript
<input
    id="password"
    type="password"
    value={password}
    placeholder="Password"
    onChange={(e) => updatePassword(e.target.value)}
/>
```

Add a console statement to check the values of the username and password:

```javascript
console.log(username, password);
```

> We can now disable/enable the submit button based on if we have a valid `username` and `password`:

```javascript
<button disabled={!username || !password}>Login</button>
```

> Before we implement the `login` on submission, we are going to need a way for this login component to store store our user object in a place where our App can access it. We could add a prop to the `Login` component (eg `onLoginComplete`) that would let Login update the `activeUser` in `App`, but let's explore another important part of React: Context.

## Context Overview

Context is like `state` but it let us provide some values to entire sections of our application without having to 'prop-drill'. User state is a common use of `context` in react applications.

A Context in react has two component types:, a `Provider` and a `Consumer`. The Provider will wrap a part of out application (like how the `Router` wraps components in `App`) and will allow any of its children to access it's data via a `Consumer`. The `Provider` is in chared of setting the value of the context.

## Make the `ActiveUserContext`

Our first step is going to be to create a context to manage our activeUser data. Make `ActiveUserContext.js`:

```javascript
import { createContext } from 'react';

const ActiveUserContext = createContext([null, () => {}]);

export default ActiveUserContext;
```

> `createContext` is the React function we use to make a new context. we can pass any type of object to a context (`string`, `number`, `object`, `array`, `function`, etc.)
>
> In this case, we are getting a little fancy and setting a `React.useState` hook as the context value.
>
> Doing this will make both the value and update function available via out context object.

## Declare an `ActiveUserContext.Provider` in `App`

Now that we have the context defined, let's declare a provider in `App.js` that wraps the entire JSX tree:

```javascript
<ActiveUserContext.Provider value={[activeUser, updateActiveUser]}></ActiveUserContext.Provider>
```

## Use `React.useContext` to consume the context in `Login`

```javascript
const [activeUser, updateActiveUser] = useContext(ActiveUserContext);
```

Import `login` from the API, call it on submit, and store the `activeUser` via the context:

```javascript
<form
    onSubmit={(e) => {
        e.preventDefault();
        login(username, password)
            .then(updateActiveUser)
            .catch(() => updateActiveUser(false));
    }}
>
```

Add a little logic to redirect to the base route if we are logged in:

```javascript
if (activeUser) {
    navigate('/');
}
```
