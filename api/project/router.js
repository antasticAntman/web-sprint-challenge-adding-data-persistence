// build your `/api/projects` router here
const router = require('express').Router()
const Projects = require('./model')

// router.use('*', (req,res) => {
//     res.json({
//         "name":"john",
//         "lastname":"wick"
//     })
// })

router.get('/', (req, res, next ) => {
    Projects.getAll()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(next)
})

router.post('/', async (req, res, next ) => {
    try {
        const project = await Projects.create(req.body)
        res.json(project)
    }
    catch (err){
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage:"Somemthing has failed lol",
        error: err.message,
        stack: err.stack
    })
})

module.exports = router