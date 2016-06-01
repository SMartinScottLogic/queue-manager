'use strict'

import {h} from 'react-markup'

export function QueueEntry(props) {
  const { todo } = props;

  if(todo.isDone) {
    return h('strike', todo.text)
  } else {
    return h('span', todo.text)
  }
}