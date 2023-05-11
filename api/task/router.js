// build your `/api/tasks` router here
const router = require('express').Router()
const Tasks = require('./model')

// router.use('*', (req, res) => {
//     res.json({
//         name:"John",
//         lastname:"Wick"
//     })
// })

router.get('/', (req, res, next) => {
    Tasks.getAll()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(next)
})

router.post('/', (req,res,next) => {
    Tasks.create(req.body)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage: "I think there is a problem but not sure why there is one",
        error: err.message,
        stack:err.stack
    })
})


module.exports = router