'use strict'

import {h} from 'react-markup'

export function QueueList(T) {
    return function QueueList(props) {
        const { todos, toggleTodo, addTodo } = props;

        const onSubmit = (event) => {
            const input = event.target
            const text = input.value
            const isEnterKey = (event.which == 13)
            const isLongEnough = text.length > 0

            if (isEnterKey && isLongEnough) {
                input.value = ''
                addTodo(text)
            }
        }

        const toggleClick = (id) => (event) => toggleTodo(id);

        return h('div.todo',
            h('input', { type: 'text', placeholder: 'Add todo', onKeyDown: onSubmit }),
            h('ul.todo__list', todos.map((t) => {
                const todo = t.toJS()
                console.log('todo', todo)
                return h('li.todo__item', { key: todo.id, onClick: toggleClick(todo.id) }, h(T, { todo }))
            }
            ).toArray())
        )
    }
}