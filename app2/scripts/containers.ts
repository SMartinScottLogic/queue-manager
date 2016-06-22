import { connect } from 'react-redux'
import { QueueList as components_QueueList } from './queue_list'
import { addTodo, toggleTodo, deleteTodo, setMode } from './actions'

export function QueueList(T: any) {
    return connect(
        function mapStateToProps(state) {
            return { todos: state }
        },
        function mapDispatchToProps(dispatch) {
            return {
                addTodo: (text: string) => dispatch(addTodo(text)),
                toggleTodo: (id: string) => dispatch(toggleTodo(id)),
                deleteTodo: (id: string) => dispatch(deleteTodo(id)),
                setMode: (id: string, mode: number, pos: number) => dispatch(setMode(id, mode, pos))
            }
        }
    )(components_QueueList(T))
}