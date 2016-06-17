import {createStore} from 'redux'

interface QueueEntry {
    id: number,
    checked?: boolean,
    text: string
}
const queue: Array<QueueEntry> = [
    { id: 1, checked: true, text: 'Literal html' }
    , { id: 2, checked: true, text: 'Literal html' }
    , { id: 3, checked: true, text: 'Literal html' }
    , { id: 4, checked: true, text: 'Literal html' }
    , { id: 5, checked: true, text: 'Literal html' }
    , { id: 6, checked: true, text: 'Literal html' }
    , { id: 7, checked: true, text: 'Literal html' }
    , { id: 8, checked: true, text: 'Literal html' }
    , { id: 9, checked: true, text: 'Literal html' }
    , { id: 10, text: 'Hello' }
    , { id: 11, text: 'Hi' }
    , { id: 12, text: 'Bob' }
]

interface State {
    queue: Array<QueueEntry>
}

export enum ActionType {
    SELECT
}
export interface Action {
    type: ActionType,
    params: any
}

function QueueReducer(state: State = { queue: [] }, action: Action) {
    switch (action.type) {
        case ActionType.SELECT:
            return Object.assign({}, state, { queue: state.queue.map((q) => Object.assign({}, q, { checked: q.id === action.params.id ? action.params.checked : q.checked })) })
        default:
            return state
    }
}

class StateStore {
    private _store: Redux.Store
    constructor() {
        this._store = createStore(QueueReducer, { queue }, (<any>window).devToolsExtension && (<any>window).devToolsExtension())
    }

    get queue(): Array<QueueEntry> {
        return this.getState().queue
    }

    public dispatch(action: Action) {
        return this._store.dispatch(action)
    }

    public subscribe(listener: Function) {
        return this._store.subscribe(listener)
    }

    private getState(): State {
        return this._store.getState()
    }
}
export const Store = new StateStore()
