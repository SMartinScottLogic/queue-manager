import { connect } from 'react-redux'
import { QueueList as components_QueueList } from './queue_list'
import { addTodo, toggleTodo } from './actions'

export const QueueList = connect(
    function mapStateToProps(state) {
        return {todos: state}
    },
    function mapDispatchToProps(dispatch) {
        return {
            addTodo: (text:string) => dispatch(addTodo(text)),
            toggleTodo: (id:string) => dispatch(toggleTodo(id))
        }
    }
)(components_QueueList)