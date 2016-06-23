// import React from 'react';
import { render } from 'react-dom'
import {h} from 'react-markup'

import {Provider} from 'react-redux'

import { createStore, applyMiddleware, compose } from 'redux'

import {List, Map} from 'immutable'

import { fetchPosts } from './actions'
import { Reducer as reducer } from './reducer'
import { QueueList } from './containers'
import { QueueEntry2 } from './queue_entry'

import thunkMiddleware from 'redux-thunk'

const Hammer = require('react-hammerjs')

const store = createStore(reducer, compose(applyMiddleware(thunkMiddleware), (<any>window).devToolsExtension ? (<any>window).devToolsExtension() : (f: any) => f))

function handleTap() {
    console.log('tap', arguments)
    fetchPosts('queue')(store.dispatch)
}
function handleSwipe() {
    console.log('swipe', arguments)
}
function handlePan(event: any) {
    console.log('pan2', arguments)

    let pos = event.deltaX
    if (event.type === 'panend') {
        pos = 0
    }
    event.target.style.transform = `translate3d(${pos}px, 0, 0)`
    event.target.style.mozTransform = `translate3d(${pos}px, 0, 0)`
    event.target.style.webkitTransform = `translate3d(${pos}px, 0, 0)`
}
render(
    h(Provider, { store },
        h('div',
            h(QueueList(QueueEntry2)),
            h(Hammer, { onTap: handleTap, onSwipe: handleSwipe, onPan: handlePan, onPanEnd: handlePan },
                h('span', { style: { display: 'inline-block', transition: 'all .3s', WebkitTransition: 'all .3s' } }, 'Tap Me')
            )
        )
    ),
    document.getElementById('app')
)