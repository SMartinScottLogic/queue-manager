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
        payload: {id}
    }
}

export function deleteTodo(id: string): Action {
    return {
        type: 'DELETE_TODO',
        payload: {id}
    }
}

export function setMode(id: string, mode: number, pos: number): Action {
    return {
        type: 'SET_MODE',
        payload: { id, mode, pos }
    }
}