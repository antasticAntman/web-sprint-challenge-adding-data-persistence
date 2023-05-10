// build your `Resource` model here
const db = require('../../data/dbConfig')

async function getAll(){
    const getResources = await db('resources') 

    return getResources
}

async function getById(resource_id){
    const result = await db('resources').where('resource_id', resource_id).first()
        return result
}

async function create(materials) {
    const createResource = 
        await db('resources')
            .insert(materials)
    const result = await getById(createResource)
    return result
}

module.exports = {
    getAll,
    create
}