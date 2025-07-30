const form = document.getElementById('task-form')
const noTask = document.getElementById('no-tasks-message')
const input  = document.getElementById('task-input')
const task_list = document.getElementById("task-list");
let tasks = [];

function saveTasksToLocalStorage() {
    // tasks array ko JSON string mein badlein, kyunki localStorage sirf strings store karta hai
    localStorage.setItem('myTodoList', JSON.stringify(tasks)); // 'myTodoList' key use ki hai
}


//2nd
// Tasks ko localStorage se load karein
function loadTasksFromLocalStorage() {
    const storedTasks = localStorage.getItem('myTodoList');
    if (storedTasks) {
        // Agar data mila to JSON string ko wapas JavaScript array mein badlein
        tasks = JSON.parse(storedTasks);
    }
    renderTasks(); // Load hone ke baad tasks ko UI par dikhayein
}
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Form ko page reload hone se rokein

    const taskText = input.value.trim(); // Input field se task ka text nikalen

    if (taskText === "") {
        alert("Please enter a task");
    } else {
        const newTask = taskText;
        tasks.push(newTask); // Naye task ko 'tasks' array mein add karein
        saveTasksToLocalStorage(); // Tasks ko localStorage mein save karein
        renderTasks(); // UI ko update karein taake naya task dikhe
        input.value = ""; // Input field ko khali karein
    }
});


function NoTasksMessage() {
    if (tasks.length === 0) {
        noTask.style.display = 'block'; 
    } else {
        noTask.style.display = 'none';
    }
}

//3rd
function renderTasks() {
task_list.innerHTML = "";
     if (tasks.length === 0) {
        noTask.style.display = 'block'; 
    } else {
        noTask.style.display = 'none';
    }

    tasks.forEach((task,index) => {
  let newTask = document.createElement("li");
newTask.className = "task-item border rounded-lg py-2 pl-3 flex justify-between text-lg my-2 bg-gray-900" ;
newTask.innerHTML =`
 <span class="task-text">${task}</span>
<button class="delete-btn text-red-400 hover:bg-red-700 hover:text-white rounded px-2 text-lg border border-red-500 mr-4">x</button>
`;
newTask.dataset.index = index;
task_list.appendChild(newTask);
    })  
    NoTasksMessage();

} 

task_list.addEventListener('click' , function (e){
    const clickedTask = e.target;

    if(clickedTask.classList.contains('delete-btn'))
        {
const Task_item = clickedTask.closest('.task-item');

 if (Task_item) {
              
    const indexToDelete = parseInt(Task_item.dataset.index);

                
                tasks.splice(indexToDelete, 1); 

                saveTasksToLocalStorage(); // Changes ko localStorage mein save karein
                renderTasks(); // UI ko update karein taake delete hua task gayab ho jaye
            }
    }
})

//1st
document.addEventListener('DOMContentLoaded', loadTasksFromLocalStorage);
