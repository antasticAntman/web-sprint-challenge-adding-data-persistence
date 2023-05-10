// build your `Project` model here
const db = require('../../data/dbConfig')

async function getAll(){
    const projects = await db('projects')

    const results = {
        project_id:projects[0].project_id,
        project_name: projects[0].project_name,
        project_description: projects[0].project_description,
        project_completed: projects[0].project_completed === 0 ? false : true
    }

    return [results]
    // return projects
}

async function getById(project_id){
    const project = await db('projects').where(project_id)

    return project
}

async function create(project){
    const newProject = await db('project').insert(project)
}

module.exports = {
    getAll,
    create
}