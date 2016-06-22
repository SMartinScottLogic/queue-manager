// import React from 'react';
import { render } from 'react-dom'
import {h} from 'react-markup'

import {Provider} from 'react-redux'

import { createStore } from 'redux'

import {List, Map} from 'immutable'

import { Reducer as reducer } from './reducer'
import { QueueList } from './containers'
import { QueueEntry2 } from './queue_entry'

const Hammer = require('react-hammerjs')

const store = createStore(reducer, (<any>window).devToolsExtension && (<any>window).devToolsExtension())

function handleTap() {
    console.log('tap', arguments)
}
function handleSwipe() {
    console.log('swipe', arguments)
}
function handlePan(event: any) {
    console.log('pan', arguments)

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
        h('div', h(QueueList(QueueEntry2)),
            h(Hammer, { onTap: handleTap, onSwipe: handleSwipe, onPan: handlePan, onPanEnd: handlePan },
                h('span', { style: { display: 'inline-block', transition: 'all .3s', '-webkit-transition': 'all .3s' } }, 'Tap Me')
            )
        )
    ),
    document.getElementById('app')
)