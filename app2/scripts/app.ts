// import React from 'react';
import { render } from 'react-dom'
import {h} from 'react-markup'
import { Reducer as reducer } from './reducer'
import { createStore } from 'redux'
import {List, Map} from 'immutable'
import { QueueList } from './containers'
import { QueueEntry2 } from './queue_entry'
import {Provider} from 'react-redux'

const Hammer = require('react-hammerjs')

const store = createStore(reducer, (<any>window).devToolsExtension && (<any>window).devToolsExtension())

function handleTap() {
    console.log('tap', arguments)
}
function handleSwipe() {
    console.log('swipe', arguments)
}
render(
    h(Provider, { store },
        h('div', h(QueueList(QueueEntry2)),
            h(Hammer, { onTap: handleTap, onSwipe: handleSwipe },
                h('div', 'Tap Me')
            )
        )
    ),
    document.getElementById('app')
)