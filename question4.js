//task array to store all tasks
let tasks = [];

//initial task id
let taskId = 1;

//model of tasks
class Task {
    constructor(id, name, description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

//function to create add a new task
const addTask = (name, description) => {
    const newTask = new Task(taskId++, name, description);
    tasks.push(newTask); 
    return `Task added: ${newTask.name}`;
}

//function to read view all tasks
const viewTasks = () => {
    if (tasks.length === 0) {
        return 'No tasks available.';
    }
    
    let output = 'Tasks List:';
    tasks.forEach(task => {
        output += `\nID: ${task.id}, Name: ${task.name}, Description: ${task.description}`;
    });
    return output;
}

//function to update a task by ID
const updateTask = (id, newName, newDescription) => {
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return 'Task not found.';
    }
    
    task.name = newName;
    task.description = newDescription;
    return `Task ID: ${task.id} successfully updated`;
}

//function to delete a task by ID
const deleteTask = (id) => {
    const index = tasks.findIndex(task => task.id === id);
    if (index === -1) {
        return 'Task not found.';
    }
    
    const deletedTask = tasks[index];
    tasks.splice(index, 1);
    return `Task ID: ${id} successfully deleted`;
}

//test the functions
console.log(viewTasks());
console.log(addTask('Task1', 'Task Added Successfully'));
console.log(viewTasks());
console.log(updateTask(1, 'Task2', 'Task Updated Successfully'));
console.log(viewTasks());
console.log(deleteTask(1));
console.log(viewTasks());