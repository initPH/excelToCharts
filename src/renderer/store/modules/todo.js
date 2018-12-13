const state = {
  todos: [
    { id: 1, text: '...', done: true },
    { id: 2, text: '...', done: false }
  ]
}

const getters = {
  doneTodos: (state) => {
    return state.todos.filter(todo => todo.done)
  }
}

export default {
  state,
  getters
}
