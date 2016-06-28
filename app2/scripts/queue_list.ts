'use strict'

import {h} from 'react-markup'
const Hammer = require('react-hammerjs')
import { List, Map } from 'immutable'

export function QueueList(T: any) {
    return function QueueList(props: { todos: Map<{}, {}>, toggleTodo: Function, deleteTodo: Function, addTodo: Function, setMode: Function }) {
        const { todos, toggleTodo, deleteTodo, addTodo, setMode }: { todos: Map<{}, {}>, toggleTodo: Function, deleteTodo: Function, addTodo: Function, setMode: Function } = props

        const onSubmit = (event: Event & any) => {
            console.log(event)
            const input = event.target
            const text = input.value
            const isEnterKey = (event.which === 13)
            const isLongEnough = text.length > 0

            if (isEnterKey && isLongEnough) {
                input.value = ''
                addTodo(text)
            }
        }

        const toggleClick = (id: number) => (event: Event) => toggleTodo(id)
        const handleTap = (id: number) => (event: any) => {
            console.log('tap', id, event)
            toggleTodo(id)
        }
        /*
        const handleSwipe = (id: number) => (event: any) => {
            console.log('swipe', id, event)
            deleteTodo(id)
        }
        */
        const handlePan = (id: number) => (event: any) => {
            console.log('pan', id, event)

            let mode = 0
            let pos = event.deltaX
            if (event.type === 'panend') {
                pos = 0
                mode = 1
            }
            setMode(id, mode, pos)
        }

        return h('div.todo',
            h('input', { type: 'text', placeholder: 'Add todo', onKeyDown: onSubmit }),
            h('ul.todo__list', todos.take(5).map((t: any) => {
                const todo = t.toJS()
                console.log('todo', todo)

                return h(Hammer, { key: todo.id, onTap: handleTap(todo.id), /*onSwipe: handleSwipe(todo.id), */onPan: handlePan(todo.id), onPanEnd: handlePan(todo.id) },
                    h('li.todo__item', { style: { background: todo.mode === 0 ? 'red' : 'transparent' } },
                        // { key: todo.id/*, onClick: toggleClick(todo.id)*/ },
                        h('span.card', {style: { transform: `translate3d(${todo.pos}px, 0, 0)`}},
                            h(T, { todo })
                        )
                    )
                )
            }
            ).toArray())
        )
    }
}
