'use strict'

import { List, Map } from 'immutable'
import { Action, TogglePayload, TodoPayload, ModePayload } from './actions'

const init: List<Map<{}, {}>> = List([])

export function Reducer(todos = init, action: Action): any {
    if (!action || !action.payload || !action.payload.id) return todos
    const id_filter = update_id(action.payload.id)
    switch (action.type) {
        case 'ADD_TODO':
            {
                let payload = <TodoPayload>action.payload
                return todos.push(Map(payload))
            }
        case 'TOGGLE_TODO':
            {
                return todos.map( id_filter( (t) => t.update('isDone', isDone => !isDone)) )
            }
        case 'SET_MODE':
            {
                let payload = <ModePayload>action.payload
                return todos.map( id_filter( (t) => t.update('mode', () => payload.mode).update('pos', () => payload.pos)) )
            }
        case 'DELETE_TODO':
            {
                return todos.filter((t) => t.get('id') !== action.payload.id)
            }
        default:
            {
                return todos
            }
    }
}

const update_id = (id: string) => (updator: (t: Map<{}, {}>) => Map<{}, {}> ) => (t: Map<{}, {}>) => {
    if (t.get('id') === id) {
        return updator(t)
    } else {
        return t
    }
}