const uid = ():string => Math.random().toString(34).slice(2)

type TogglePayload = string;
interface TodoPayload {
    id: string,
    isDone: boolean,
    text: string
}
export interface Action {
    type: string,
    payload: TogglePayload | TodoPayload
}
export function addTodo(text:string): Action {
    return {
        type: 'ADD_TODO',
        payload: {
            id: uid(),
            isDone: false,
            text
        }
    }
}

export function toggleTodo(id: string): Action {
    return {
        type: 'TOGGLE_TODO',
        payload: id
    }
}