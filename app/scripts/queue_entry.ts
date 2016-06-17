'use strict'

import * as React from 'react'
import {Store, Action, ActionType} from './store'

// const h = require('react-markup')
import {h} from 'react-markup'

export interface EntryProps {
    id: number,
    checked?: boolean,
    onCheckChange: Function,
    text?: string
}

export interface EntryState {
    checked: boolean
}

export class Entry extends React.Component<EntryProps, EntryState> {
    state: EntryState = {
        checked: false
    }

    handleCheckChange = (event: Event) => {
        const id = this.props.id
        const checked = event.target.checked
        this.setState({ checked })
        this.props.onCheckChange(id)
        Store.dispatch({type: ActionType.SELECT, params: {id, checked}})
    }

    constructor(props: EntryProps) {
        super(props)
        this.state.checked = this.props.checked || false
    }

    rawMarkup() {
        const rawMarkup = (this.props.text || '').toString()
        return { __html: rawMarkup }
    }

    render() {
        return (
            h('div.todo',
                h('input', { type: 'checkbox', value: this.props.id, checked: this.state.checked, onChange: this.handleCheckChange }),
                h('span', {dangerouslySetInnerHTML: this.rawMarkup() } )
            )
        )
    }
}
