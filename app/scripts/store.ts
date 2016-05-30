import {createStore} from 'redux'

interface QueueEntry {
    id: number,
    selected?: boolean,
    text: string
}
const queue: Array<QueueEntry> = [
    { id: 1, selected: true, text: 'Literal html' }
    , { id: 2, selected: true, text: 'Literal html' }
    , { id: 3, selected: true, text: 'Literal html' }
    , { id: 4, selected: true, text: 'Literal html' }
    , { id: 5, selected: true, text: 'Literal html' }
    , { id: 6, selected: true, text: 'Literal html' }
    , { id: 7, selected: true, text: 'Literal html' }
    , { id: 8, selected: true, text: 'Literal html' }
    , { id: 9, selected: true, text: 'Literal html' }
    , { id: 10, text: 'Hello' }
    , { id: 11, text: 'Hi' }
    , { id: 12, text: 'Bob' }
]

interface State {
    queue: Array<QueueEntry>
}

function QueueReducer(state: State = {queue:[]}, action) {
    switch(action.type) {
        case 0:
        return Object.assign( {}, state, {queue: state.queue.map( (q) => Object.assign({}, q, {selected:q.id===action.id?action.selected:q.selected}))} )
        default:
        return state
    }
}

class StateStore {
    private _store: Redux.Store
    constructor() {
        this._store = createStore(QueueReducer, {queue})
    }
    
    get queue(): Array<QueueEntry> {
        return this.getState().queue;
    }
    
    public dispatch(action: any) {
        return this._store.dispatch(action);
    }
    
    public subscribe(listener: Function) {
        return this._store.subscribe(listener)
    }
    
    private getState(): State {
        return this._store.getState()
    }
}
export const Store = new StateStore()
