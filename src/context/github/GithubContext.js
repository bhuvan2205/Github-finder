import { createContext, useReducer } from "react";

export const GithubContext = createContext();

const githubUrl = process.env.REACT_APP_GITHUB_URL;
const githubToken = process.env.REACT_APP_GITHUB_TOKEN;

const githubReducer = (state, action) => {

    switch (action.type) {

        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false
            }

        case "GET_SINGLE_USER":
            return {
                ...state,
                user: action.payload,
                loading: false
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true
            }

        case 'GET_USERS_REPO':
            return {
                ...state,
                repos: action.payload
            }

        case 'CLEAR_USERS':
            return {
                ...state,
                users: [],
                loading: false
            }

        default:
            return state;
    }
}


export const GitHubContextProvider = ({ children }) => {

    const initialState = {
        users: [],
        loading: false,
        user: {},
        repos: [],
    }

    const [state, dispatch] = useReducer(githubReducer, initialState);

    const setLoading = () => dispatch({ type: 'SET_LOADING' });

    // Fetch all the users

    const fetchUsers = async (text) => {

        setLoading();

        const params = new URLSearchParams({ q: text });
        console.log("Params: ", params);

        const url = `${githubUrl}/search/users?${params}`;
        console.log('URL: ', url)

        const res = await fetch(url, {
            headers: {
                "Content-Type": "aplication/json",
                'Authorization': `Bearer ${githubToken}`
            }
        });

        const { items } = await res.json();

        dispatch({ type: 'GET_USERS', payload: items });
    }

    // Fetch single user Profile

    const fetchUser = async (login) => {

        setLoading();

        const url = `${githubUrl}/users/${login}`;

        console.log('URL: ', url);

        const res = await fetch(url, {
            headers: {
                "Content-Type": "aplication/json",
                'Authorization': `Bearer ${githubToken}`
            }
        });

        if (res.status === 404) {

            return window.location = '/notFound';
        }

        const data = await res.json();

        dispatch({ type: 'GET_SINGLE_USER', payload: data });
    }

    // Fetch User repos

    const fetchUserRepos = async (login) => {

        setLoading();

        const url = `${githubUrl}/users/${login}/repos`;

        console.log('URL: ', url);

        const res = await fetch(url, {
            headers: {
                "Content-Type": "aplication/json",
                'Authorization': `Bearer ${githubToken}`
            }
        });

        const data = await res.json();

        dispatch({ type: 'GET_USERS_REPO', payload: data });
    }


    // Remove all the users
    const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

    return (
        <GithubContext.Provider value={{ users: state.users, user: state.user, repos: state.repos, loading: state.loading, fetchUsers, clearUsers, fetchUser, fetchUserRepos }}>
            {children}
        </GithubContext.Provider>
    )
}

