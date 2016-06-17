'use strict'

import { List, Map } from 'immutable'
import { Action } from './actions'

const init: List<Map<{}, {}>> = List([])

export function Reducer(todos = init, action: Action) {
    switch (action.type) {
        case 'ADD_TODO':
            return todos.push(Map(action.payload))
        case 'TOGGLE_TODO':
            return todos.map((t) => t.get('id') === action.payload ? t.update('isDone', isDone => !isDone) : t)
        case 'DELETE_TODO':
            return todos.filter((t) => t.get('id') !== action.payload)
        default: return todos
    }
}
