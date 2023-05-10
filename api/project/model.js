// build your `Project` model here
const db = require('../../data/dbConfig')

async function getAll(){
    const projects = await db('projects')

    // const result = {
    //     project_id:projects.project_id,
    //     project_name: projects.project_name,
    //     project_description: projects.project_description,
    //     project_completed: projects.project_completed === 0 ? false : true
    // }
    const results = projects.map(projectId => {
        const result = {
            project_id: projectId.project_id,
            project_name: projectId.project_name,
            project_description: projectId.project_description,
            project_completed: projectId.project_completed === 0 ? false : true
        }
        return result
    })

    // return projects
    return results
}

async function getById(project_id){
    const project = await db('projects').where('project_id', project_id).first()

    return project
}

async function create(project){
    const pId = await db('projects').insert(project)

    // return newProject
    const junkProject = await getById(pId)
    const arr = [junkProject]

    const results = arr.map(Id => {
        const result = {
            project_id: Id.project_id,
            project_name: Id.project_name,
            project_description: Id.project_description,
            project_completed: Id.project_completed === 0 ? false : true
        }
        return result
    })
    // console.log(result)
    return results[0]

}

module.exports = {
    getAll,
    create
}