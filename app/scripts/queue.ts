'use strict'

import * as React from 'react'
import * as ReactRouter from 'react-router'
import * as ReactDOM from 'react-dom'

//const h = require('react-hyperscript')
import {h} from 'react-markup'

import {Entry} from './queue_entry'

function handleCheckChange(id) {
    console.log('change', id);
}

const queue = [
    {
        id: 10, text: 'Hello'
    }
    , {
        id: 11, text: 'Hi'
    }
    , {
        id: 12, text: 'Bob'
    }
]

export class Main extends React.Component<{}, {}> {
    render() {
        return (
            h('div.hello',
                h('h1', 'Main Page'),
                h('h2', 'Test content' )
            )
        )
    }
}

ReactDOM.render(
    h('div',
        queue.map((entry) => {
            return h(Entry,
                {
                    key: entry.id,
                    id: entry.id,
                    selected: false,
                    onCheckChange: (id) => { console.log('change', id) }
                }, `${entry.text}`)
        })
        , h(Entry, { key: 1, id: 1, selected: false, onCheckChange: (id) => { console.log('change', id) } }, 'Literal html')
        , h(Entry, { key: 2, id: 2, selected: false, onCheckChange: (id) => { console.log('change', id) } }, 'Literal html')
        , h(Entry, { key: 3, id: 3, selected: false, onCheckChange: (id) => { console.log('change', id) } }, 'Literal html')
        , h(Entry, { key: 4, id: 4, selected: false, onCheckChange: (id) => { console.log('change', id) } }, 'Literal html')
        , h(Entry, { key: 5, id: 5, selected: false, onCheckChange: (id) => { console.log('change', id) } }, 'Literal html')
        , h(Entry, { key: 6, id: 6, selected: false, onCheckChange: (id) => { console.log('change', id) } }, 'Literal html')
        , h(Entry, { key: 7, id: 7, selected: false, onCheckChange: (id) => { console.log('change', id) } }, 'Literal html')
        , h(ReactRouter.Router, {history: ReactRouter.browserHistory},
            h(ReactRouter.Route, { path: '/', component: Entry }),
            h(ReactRouter.Route, { path: 'test', component: Main })
        )
    ),
    document.getElementById('content')
);