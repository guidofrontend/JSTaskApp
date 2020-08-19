document.getElementById('form').addEventListener('submit', saveTask);

function saveTask(event){
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let task = {
        title,
        description
    }
    if(localStorage.getItem('tasks')===null){
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    else{
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    getTasks();
    document.getElementById('form').reset();
    event.preventDefault();
}

function deleteTask(title){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i=0; i<tasks.length;i++){
        if(tasks[i].title==title){
            tasks.splice(i,1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

function getTasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasksContainer')
    tasksView.innerHTML='';
    if(tasks!==null){
        for(let i=0;i<tasks.length;i++){
            let title = tasks[i].title;
            let description = tasks[i].description;
    
            tasksView.innerHTML += `<div class="cards">
                <div class="card-body">
                    <p>${title} - ${description}
                    <a href="#" onclick="deleteTask('${title}')" class="btn-red">Delete</a>
                    </p>
                </div>
            </div>`;
        }
    }
}

getTasks();