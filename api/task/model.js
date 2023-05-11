// build your `Task` model here
const db = require('../../data/dbConfig')

async function getAll(){

    const tasks = await db('projects as p')
        .join('tasks as t', 't.project_id', 'p.project_id')
            .select('t.task_id', 't.task_description', 't.task_notes',
            't.task_completed','p.project_name', 'p.project_description'
            )
        
        const results = tasks.map(id => {
            const result = {
                task_id: id.task_id,
                task_description: id.task_description,
                task_notes: id.task_notes,
                task_completed: id.task_completed === 0 ? false : true,
                project_name: id.project_name,
                project_description: id.project_description
            }
            return result
        })
        return results
    // const results = tasks.map(id=> {
    //     const result = {
    //         task_id: id.task_id,
    //         task_description: id.task_description,
    //         task_notes: id.task_notes,
    //         task_completed: id.task_completed === 0 ? false : true,
    //         project_name: id.project_name,
    //         project_description: id.project_description
    //     }
    //     return result
    // })
    // return results
    
}

async function getById(id){
    const task = await db('tasks').where('task_id', id).first()

    return task
}

async function create(newTask){
    const task_id = await db('tasks').insert(newTask)

    const task = await getById(task_id)

    const arrTask = [task]
    const fResult = arrTask.map(id => {
        const result = {
            task_id: id.task_id,
            task_description: id.task_description,
            task_notes: id.task_notes,
            task_completed: id.task_completed === 0 ? false : true,
            project_id: id.project_id
        }
    return result
    })
return fResult[0]
}

module.exports = {
    getAll,
    create
}