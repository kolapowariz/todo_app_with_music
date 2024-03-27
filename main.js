import './utilis/bling';
import './style.css';

function app(params) {
  // state
  let state = {id: 0, todos: []}
  // ui
  let ui = {
    input: $('input'),
    form: $('form')
  }

  // console.log(ui);
  
  return mk('div', {id: 'app'}, [
    mk('h1', null, ['Todo App: AltSchool Frontend Version']),
    (ui.form = mk('form', null, [
      (ui.input = mk('input', {className: 'todo', type: 'text', id: 'todo', placeholder: 'Enter a todo'})),
      mk('button', {type: 'submit', onclick: add}, ['Add Todo']),
    ])),
    (ui.todos = mk('ul', {id: 'todos'}, []))
  ]);

  function createTodo(todo) {
    let item, text, deleteBtn, editBtn;
    item = mk('li', {className: 'todo-items'}, [
      (text = mk('span', {}, [todo.text])),
      (deleteBtn = mk('button', {className: 'delete'}, ['Delete'])),
      (editBtn = mk('button', {className: 'edit'}, ['Edit']))
    ]);

    let audio = new Audio('./vvv-2.mp3');

    deleteBtn.on('click', () => {
      audio.play();
      state.todos = state.todos.filter(t => t.id !== todo.id);
      item.remove();
    });

    editBtn.on('click', () => {
      audio.play();
      let input = mk('input', {value: todo.text});
      item.prepend(input);
      input.focus();

      input.on('blur', () => {
        todo.text = input.value;
        text.textContent = input.value;
        input.remove();
      })

      input.on('keypress', (e)=> {
        if(e.key === 'Enter') {
          input.blur();
        }
      })

    })

    return item;
  }

  function add(e) {
    e.preventDefault();

    let text = ui.input.value;
    if(!text) return;

    const todo = { text, done: false, id: Date.now()};
    // console.log(todo);

    ui.input.value = '';

    state.todos.push(todo);
    // console.log(state.todos);
    

    ui?.todos.prepend(createTodo(todo));
  }
}



function render(params) {
  document.body.prepend(app());
}

render();

// add delete and update 