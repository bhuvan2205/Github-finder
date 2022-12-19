import { createContext, useReducer } from "react";

export const AlertContext = createContext();

const alertReducer = (state, action) => {

    switch (action.type) {

        case "SET_ALERT":
            return action.payload;

            case "REMOVE_ALERT":
                return null;

        default:
            return state;
    }
}

export const AlertContextProvider = ({ children }) => {

    const initialState = null;
    const [state, dispatch] = useReducer(alertReducer, initialState);

    // create Alert
    const setAlert = (msg, type) => {

        dispatch({
            type: 'SET_ALERT',
            payload: { msg, type }
        });

        setTimeout(() => {

            dispatch({
                type: 'REMOVE_ALERT'
            });
        }, 3000);
    }

    return (
        <AlertContext.Provider value={{ alert: state, setAlert }}>
            {children}
        </AlertContext.Provider>
    )
}


