async function getAllTasks() {

        const url = "http://192.168.3.103:3000/tasks/all";
        
        const allTasksDiv = document.getElementById("tasks");
        
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const tasks = await response.json();

            allTasksDiv.innerHTML = "";

            tasks.forEach(element => {
                allTasksDiv.innerHTML += `
                    <div class="task">
                        <p class="title">${element.title}</p>
                        <p class="Description">${element.description}</p>
                        <p class="createDate">${element.creationDate}</p>
                        <p class="expireDate">${element.expireDate}</p>
                        <button class="deleteButton" id="delButton" >Deletar</button>
                        <button class="editButton" id="edButton">Editar</button>
                    </div>
                `;
            });

        } catch (error) {
            console.error(error.message);
        }
}

function createTask() {
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", async () => {
        const title = document.getElementById("titleInput").value;
        const description = document.getElementById("descriptionInput").value;
        const expireDate = document.getElementById("dateInput").value;
        const url = "http://192.168.3.103:3000/tasks/new";
        
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, expireDate })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || `Erro: status ${response.status}`);
            }

            const successText = await response.text();
            alert(successText);
            
            title.value = "";
            description.value = "";
            expireDate.value = "";

            await getAllTasks();

        } catch (error) {
            console.error(error.message);
        }
    });
}

function updateTask() {

}

function deleteTask() {

    const delButton = document.getElementById("deleteButton");
    const editButton = document.getElementById("edButton");

}

document.addEventListener("DOMContentLoaded", () => {

    getAllTasks();
    createTask();
    updateTask();
    deleteTask();

});