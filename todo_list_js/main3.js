const data = [];

// VIEW
// // Click the plus sign and input box 
addTaskButton.onclick = () => {addItem()};

document.body.addEventListener('change', e => {
    if (e.target.matches('input[type="checkbox"]')) {
        const parent = e.target.parentNode.parentNode
        const index = parseInt(parent.dataset.index)
        data[index].done = e.target.checked
    } else if (e.target.matches('select[name="priority"]')) {
        const parent = e.target.parentNode;
        let index = parseInt(parent.dataset.index)
        data[index].priority = parseInt(e.target.value);
        organize();
        index = data[index].priority;
        render();
    }
})

document.body.onclick = (e) => {
    if(e.target.matches('.x-button')) {
        const index = e.target.parentNode.dataset.index;
        removeItem(index);
    } else if (e.target.matches('#plus')) {
        form.style.display = 'block';
    } else if (e.target.matches('#cancel')) {
        title.value = '';
    }
}

function render() {
    taskList.innerHTML = '';
    data.forEach((item, index) => {
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
        taskList.appendChild(div);
    })
}

// controller
function addItem(item) {
    item = title.value;
    data.push({ title: item, done: false, priority: 2})
    form.style.display = ''
    render()
}
function removeItem(index) {
    data.splice(index, 1)
    render()
}
function organize() {
    data.sort((a,b) => {
        return b.priority - a.priority
    })
}