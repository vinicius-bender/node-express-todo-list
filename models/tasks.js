module.exports = {

    tasks: [
        {
            id: "",
            title: "",
            description: "",
            creationDate: "",
            expireDate: ""
        }
    ],

    getAllTasks() {
        return this.tasks;
    },

    createTask(title, description, expireDate) {
        const task = {
            id: this.generateId(),
            title: title,
            description: description,
            creationDate: this.generateDate(),
            expireDate: expireDate
        };
        this.tasks.push(task);
    },

    updateTask(id, newData){
        const task = this.tasks.find(task => String(task.id) === String(id));
        console.log(task);

        if (!task) {
            throw new Error("Tarefa não encontrada");
        }

        // Atualiza somente os campos que vierem em newData
        if (newData.title !== undefined) task.title = newData.title;
        if (newData.description !== undefined) task.description = newData.description;
        if (newData.expireDate !== undefined) task.expireDate = newData.expireDate;
    },

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    },

    generateId() {
        let id;
        do {
            id = Math.floor(Math.random() * 10000000);
        } while (this.tasks.some(task => task.id === id));
        return id;
    },

    generateDate() {
        const currentDate = Date();
        return currentDate;
    }
};