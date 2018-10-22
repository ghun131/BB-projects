class ToDo {
    constructor(id, data) {
        this.data = []
        this.el = document.getElementById(id)
        this.el.innerHTML = this.constructor.template
        this.form = this.el.querySelector('.form')
        this.taskList = this.el.querySelector('.task-list')
        this.addTaskButton = this.el.querySelector('.add-task-button')
        this.title = this.el.querySelector('.title')
        this.initialize() // DOM events
        this.render()
    }

    initialize() {
        this.el.onclick = (e) => {this.onButtOnClicks(e)};
        this.el.onchange = e => {this.onChangeEvents(e)};
        this.addTaskButton.onclick = (item) => {this.addItem(item)};
    }

    onButtOnClicks(e) {
        if(e.target.matches('.x-button')) {
            const index = e.target.parentNode.dataset.index;
            this.removeItem(index);
        } else if (e.target.matches('.plus')) {
            this.form.style.display = 'block';
        } else if (e.target.matches('.cancel')) {
            this.title.value = '';
        }
    }

    onChangeEvents(e) {
        if (e.target.matches('input[type="checkbox"]')) {
            const parent = e.target.parentNode.parentNode
            const index = parseInt(parent.dataset.index)            
            this.data[index].done = e.target.checked
        } else if (e.target.matches('select[name="priority"]')) {
            const parent = e.target.parentNode;
            let index = parseInt(parent.dataset.index)
            this.data[index].priority = parseInt(e.target.value);
            this.organize();
            this.index = this.data[index].priority;
            this.render();
        }
    }

    organize() {
        this.data.sort((a,b) => {
            return b.priority - a.priority
        })
    }

    addItem(item) {
        item = this.title.value;
        this.data.push({ title: item, done: false, priority: 2})
        this.form.style.display = ''
        this.render()
    }

    removeItem(index) {
        this.data.splice(index, 1)
        this.render()
    }

    render() {
        this.taskList.innerHTML = ''
        this.data.forEach((item, index) => {
            let taskCard = `<div class='card-wrapper'>
                                <div class='task-card' data-index="${index}">
                                    <div>
                                        <input type="checkbox" ${item.done ? 'checked' : ''} />
                                        <span>${item.title}</span>
                                    </div>
                                    <select name="priority" id="priority" class="priority">
                                        <option value="3" ${item.priority == 3 ? 'selected':''}>High</option>
                                        <option value="2" ${item.priority == 2 ? 'selected':''}>Normal</option>
                                        <option value="1" ${item.priority == 1 ? 'selected':''}>Low</option>
                                    </select>
                                </div>
                                <div data-index="${index}"><i class="far fa-times-circle x-button"></i></div>
                            </div>`
            let div = document.createElement('div');
            div.innerHTML = taskCard;
            this.taskList.appendChild(div);
        })
    }
}
ToDo.template = `
    <header class="banner">
    <h1>To-do List</h1>
    </header>
    <section id="add-task">
    <div class="task-list"></div>
    <div class='form'>
        <input class="title" type='text' name='task'>
        <button class="add-task-button">Add task</button>
        <button class='cancel'>Cancel</button>
    </div>
    <div class="plus-holder">
        <div id="plus-wrapper"><i class="fas fa-plus plus"></i></div>
        <span id="three-dots"><strong>...</strong></span>
    </div>
    </section>
`

new ToDo('app')
new ToDo('app2')
new ToDo('app3')
new ToDo('app4')