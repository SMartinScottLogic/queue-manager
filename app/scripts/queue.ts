'use strict'

import * as React from 'react'
import * as ReactRouter from 'react-router'
import * as ReactDOM from 'react-dom'

//const h = require('react-hyperscript')
import {h} from 'react-markup'

import {Entry} from './queue_entry'

function handleCheckChange(id) {
    console.log('change', id);
    ReactRouter.browserHistory.push(`/test/${id}`)
}

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

interface HistoryProps {
    history: HistoryModule.HistoryQueries
}
export class Main extends React.Component<HistoryProps, {}> {
    render() {
        return (
            h('div.hello',
                h('h1', 'Main Page'),
                h('h2', 'Test content'),
                h(ReactRouter.Link, { to: '/test' }, 'main')
            )
        )
    }
}
export class Test extends React.Component<HistoryProps, {}> {
    render() {
        return (
            h('div.hello',
                h('h1', 'Test Page'),
                h('h2', 'Test content'),
                h('ul',
                    h('li', h(ReactRouter.Link, { to: '/' }, 'main')),
                    h('li', h(ReactRouter.Link, { to: 'b' }, 'b')),
                    h('li', h(ReactRouter.Link, { to: 'test/a/b/c'}, 'deeper page'))
                )
            )
        )
    }
}
ReactDOM.render(
    h('div',
        h(ReactRouter.Router, { history: ReactRouter.browserHistory },
            h(ReactRouter.Route, { path: '/', component: Main }),
            h(ReactRouter.Route, { path: '/test', component: Test })
        )
        , queue.map((entry) => {
            return h(Entry,
                {
                    key: entry.id,
                    id: entry.id,
                    selected: entry.selected || false,
                    onCheckChange: (id) => handleCheckChange(id)
                }, `${entry.text}`)
        })
    ),
    document.getElementById('content')
);