'use strict'

import * as React from 'react'

//const h = require('react-markup')
import {h} from 'react-markup'

export interface EntryProps {
    id: number,
    selected?: boolean,
    onCheckChange: Function
}

export interface EntryState {
    checked: boolean
}

export class Entry extends React.Component<EntryProps, EntryState> {
    state: EntryState = {
        checked: false
    }

    handleCheckChange = (event) => {
        this.setState({ checked: event.target.checked })
        this.props.onCheckChange(this.props.id)
    }

    constructor(props) {
        super(props);
        this.state.checked = this.props.selected || false
    }

    rawMarkup() {
        var rawMarkup = (this.props.children || '').toString()
        return { __html: rawMarkup }
    }

    render() {
        return (
            h('div.todo',
                h('input', { type: "checkbox", value: this.props.id, checked: this.state.checked, onChange: this.handleCheckChange }),
                h('span', {dangerouslySetInnerHTML: this.rawMarkup() } )
            )
        )
    }
}
