// build your `/api/resources` router here
const router = require('express').Router()
const Resources = require('./model')

// router.use('*', (req, res, next) => { //eslint-disable-line
//     res.json({
//         name:"John Wick",
//         status:"widowed"
//     })
// })

router.get('/', (req, res, next) => {
    Resources.getAll()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(next)
})

router.post('/', async (req, res, next) => {
    // const {resource_name, resource_description} = req.body
    try {
        const resource = await Resources.create(req.body)
        res.json(resource)
    }
    catch (err) {
        next(err)
    }
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        customMessage:"Something is incorrect",
        message:err.message,
        stack: err.stack
    })
})

module.exports = router