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
                    <p class="taskId">${element.id}</p>
                    <p class="title">${element.title}</p>
                    <p class="description">${element.description}</p>
                    <p class="createDate">${element.creationDate}</p>
                    <p class="expireDate">${element.expireDate}</p>
                    <button class="deleteButton" data-id="${element.id}">Deletar</button>
                    <button class="editButton" data-id="${element.id}">Editar</button>
                </div>
            `;
        });

        document.querySelectorAll(".deleteButton").forEach(button => {
            button.addEventListener("click", async () => {
                const id = button.getAttribute("data-id");
                await deleteTask(id);
            });
        });

        // document.querySelectorAll(".editButton").forEach(button => {
        //     button.addEventListener("click", async () => {
        //         const id = button.getAttribute("data-id");
        //         await updateTask(id);
        //     });
        // });

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

            document.getElementById("titleInput").value = "";
            document.getElementById("descriptionInput").value = "";
            document.getElementById("dateInput").value = "";

            await getAllTasks();

        } catch (error) {
            console.error(error.message);
        }
    });
}

async function deleteTask(taskId) {
    const url = `http://192.168.3.103:3000/tasks/delete/${taskId}`;

    try {
        const response = await fetch(url, {
            method: "DELETE"
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || `Erro: status ${response.status}`);
        }

        const successText = await response.text();
        alert(successText);

        await getAllTasks();

    } catch (error) {
        console.error(error.message);
    }
}

function updateTask(taskId) {
    
}

document.addEventListener("DOMContentLoaded", () => {
    getAllTasks();
    createTask();
});
