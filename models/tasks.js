module.exports = {

    tasks: [
        {
            id: "1",
            title: "Teste 01",
            description: "Descrição 1",
            creationDate: "07/31/2025",
            expireDate: "08/31/2025"
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
        const index = this.tasks.findIndex(task => String(task.id) === String(id));
        if (index === -1) {
            throw new Error(`Task com ID ${id} não encontrada.`);
        }

        this.tasks.splice(index, 1);
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