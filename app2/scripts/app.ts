//import React from 'react';
import { render } from 'react-dom';
import {h} from 'react-markup'
import { Reducer as reducer } from './reducer'
import { createStore } from 'redux'
import {List, Map} from 'immutable'
import { QueueList } from './containers';
import {Provider} from 'react-redux'

const store = createStore(reducer, (<any>window).devToolsExtension && (<any>window).devToolsExtension())

render(
    h(Provider, { store },
        h(QueueList)
    ),
    document.getElementById('app')
);