'use strict'

import {h} from 'react-markup'

export function QueueEntry(props) {
  const { todo } = props;

  if (todo.isDone) {
    return h('strike', todo.text)
  } else {
    return h('span', todo.text)
  }
}

function rawMarkup(text) {
  return { __html: (text || '').toString()}
}
export function QueueEntry2(props) {
  const { todo } = props;

  if (todo.isDone) {
    return h('strike', h('span', { dangerouslySetInnerHTML: rawMarkup(todo.text) }), 'strike')
  } else {
    return h('span', h('span', { dangerouslySetInnerHTML: rawMarkup(todo.text) }), 'span')
  }
}