// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    
    // Load tasks from Local Storage when page loads
    loadTasks();
    
    // Create the addTask Function with Local Storage support
    function addTask(taskText = null, saveToStorage = true) {
        let textToUse = taskText;
        
        // If no taskText provided, get it from input field
        if (taskText === null) {
            textToUse = taskInput.value.trim();
        }
        
        // Check if taskText is not empty
        if (textToUse === "") {
            if (taskText === null) {
                alert("Please enter a task");
            }
            return;
        }
        
        // Task Creation and Removal
        // Create a new li element
        const li = document.createElement('li');
        li.textContent = textToUse;
        
        // Create a new button element for removing the task
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = 'remove-btn';
        
        // Assign onclick event to the remove button
        removeBtn.onclick = function() {
            taskList.removeChild(li);
            
            // Remove from Local Storage
            if (saveToStorage) {
                const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
                const updatedTasks = storedTasks.filter(task => task !== textToUse);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            }
        };
        
        // Append the remove button to the li element
        li.appendChild(removeBtn);
        
        // Append the li to taskList
        taskList.appendChild(li);
        
        // Save to Local Storage if needed
        if (saveToStorage && taskText === null) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(textToUse);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
            // Clear the task input field
            taskInput.value = "";
        }
    }
    
    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTask(taskText, false); // false indicates not to save again to Local Storage
        });
    }
    
    // Attach Event Listeners
    // Add event listener to addButton
    addButton.addEventListener('click', addTask);
    
    // Add event listener to taskInput for 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});