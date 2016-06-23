import 'isomorphic-fetch'

const uid = (): string => Math.random().toString(34).slice(2)

export interface TogglePayload {
    id: string
}
export interface TodoPayload {
    id: string,
    isDone: boolean,
    text: string,
    pos: number
};
export interface ModePayload {
    id: string,
    mode: number,
    pos: number
};
export interface Action {
    type: string,
    payload: TogglePayload | TodoPayload | ModePayload
};
export function addTodo(text: string): Action {
    return {
        type: 'ADD_TODO',
        payload: {
            text,
            id: uid(),
            isDone: false,
            pos: 0
        }
    }
}

export function toggleTodo(id: string): Action {
    return {
        type: 'TOGGLE_TODO',
        payload: { id }
    }
}

export function deleteTodo(id: string): Action {
    return {
        type: 'DELETE_TODO',
        payload: { id }
    }
}

export function setMode(id: string, mode: number, pos: number): Action {
    return {
        type: 'SET_MODE',
        payload: { id, mode, pos }
    }
}

export const fetchPosts = (subreddit: string) => (dispatch: Function) => {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch(addTodo(subreddit))

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch(`http://localhost:3000/api/queue`)
        .then(response => response.json())
        .then(json =>
            // We can dispatch many times!
            // Here, we update the app state with the results of the API call.
            setTimeout( () => dispatch(addTodo(JSON.stringify(json))), 1000)
        )

    // In a real world app, you also want to
    // catch any error in the network call.
}