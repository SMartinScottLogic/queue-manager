'use strict'

import * as React from 'react'
import * as ReactRouter from 'react-router'
import * as ReactDOM from 'react-dom'

//const h = require('react-hyperscript')
import {h} from 'react-markup'

import {Store} from './store'
import {Entry} from './queue_entry'

function handleCheckChange(id) {
    console.log('change', id);
    ReactRouter.browserHistory.push(`/test/${id}`)
}

const Main = () =>
    h('div.hello',
        h('h1', 'Main Page'),
        h('h2', 'Test content'),
        h(ReactRouter.Link, { to: '/test' }, 'main')
    )

const Test = () =>
    h('div.hello',
        h('h1', 'Test Page'),
        h('h2', 'Test content'),
        h('ul',
            h('li', h(ReactRouter.Link, { to: '/' }, 'main')),
            h('li', h(ReactRouter.Link, { to: 'b' }, 'b')),
            h('li', h(ReactRouter.Link, { to: 'test/a/b/c' }, 'deeper page'))
        )
    )

class QueueList extends React.Component<{}, {}> {
    constructor(props) {
        super(props)
        Store.subscribe(() => {
            console.log(Store.queue)
        })
    }

    render() {
        return (
            h('div', Store.queue.map((entry) => h(Entry,
                {
                    key: entry.id,
                    id: entry.id,
                    selected: entry.selected || false,
                    onCheckChange: (id) => handleCheckChange(id),
                    text: `${entry.text}`
                }
            ))
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
        , h(QueueList)
    ),
    document.getElementById('content')
);