async function getAllTasks() {

        const url = "http://192.168.3.103:3000/tasks/all";
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const tasks = await response.json();
            
            // tasks = JSON.parse(json);

            tasks.forEach(element => {
                console.log(element);
            });

        } catch (error) {
            console.error(error.message);
        }
}

function createTask() {

}

function updateTask() {

}

function deleteTask() {

}

document.addEventListener("DOMContentLoaded", () => {

    getAllTasks();

});