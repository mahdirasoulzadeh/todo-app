// انتخاب المنت‌ها
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const categorySelect = document.getElementById('category-select');
const filterButtons = document.querySelectorAll('.filters button');
const themeToggle = document.getElementById('theme-toggle');

// آرایه کارها
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// ذخیره در localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// رندر کردن کارها
function renderTodos(filter = 'all') {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        if (filter === 'completed' && !todo.completed) return;
        if (filter === 'uncompleted' && todo.completed) return;

        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';

        const span = document.createElement('span');
        span.textContent = `${todo.text} [${todo.category}]`;
        span.style.cursor = 'pointer';
        span.addEventListener('click', () => toggleTodo(index));

        const dateSpan = document.createElement('span');
        dateSpan.textContent = todo.date;

        const delBtn = document.createElement('button');
        delBtn.textContent = 'حذف';
        delBtn.addEventListener('click', () => deleteTodo(index));

        li.appendChild(span);
        li.appendChild(dateSpan);
        li.appendChild(delBtn);
        todoList.appendChild(li);
    });
}

// اضافه کردن کار
function addTodo() {
    const text = input.value.trim();
    const category = categorySelect.value;
    if (!text) return;
    todos.push({ text, completed: false, category, date: new Date().toLocaleString() });
    saveTodos();
    renderTodos(document.querySelector('.filters button.active').dataset.filter);
    input.value = '';
}

// حذف کار
function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos(document.querySelector('.filters button.active').dataset.filter);
}

// تیک زدن انجام شده
function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos(document.querySelector('.filters button.active').dataset.filter);
}

// لیسنرها
addBtn.addEventListener('click', addTodo);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') addTodo(); });

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTodos(btn.dataset.filter);
    });
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// رندر اولیه
renderTodos();
