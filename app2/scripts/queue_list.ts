'use strict'

import {h} from 'react-markup'
const Hammer = require('react-hammerjs')

export function QueueList(T: any) {
    return function QueueList(props) {
        const { todos, toggleTodo, addTodo } = props;

        const onSubmit = (event: Event) => {
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
        const handleTap = (event: any) => {
            console.log('tap', event)
        }
        const handleSwipe = (event: any) => {
            console.log('swipe', event)
        }

        return h('div.todo',
            h('input', { type: 'text', placeholder: 'Add todo', onKeyDown: onSubmit }),
            h('ul.todo__list', todos.map((t: any) => {
                const todo = t.toJS()
                console.log('todo', todo)

                return h(Hammer, { onTap: handleTap, onSwipe: handleSwipe },
                    h('li.todo__item', { key: todo.id/*, onClick: toggleClick(todo.id)*/ },
                        h(T, { todo })
                    )
                )
            }
            ).toArray())
        )
    }
}
