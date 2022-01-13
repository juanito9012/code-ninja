//Routes
const {Router} = require('express')
const router = Router()
const users = require('../users.json')
const _ = require('underscore')

router.get('/getusers', (req, res) => {
    res.json(users)
})

router.get("/getusersById/:userId", (req, res) => {
    const {userId} = req.params

    if (!isNaN(parseInt(userId))) {

        const user = _.find(users, function (user) {
            if (user.id === parseInt(userId)) {
                res.json(user)
                return user
            }
        })

        if (!user) {
            res.status(404).send("User not found")
        }
    } else {
        res.status(400).send("Invalid user id")
    }

})

router.post("/createusers", (req, res) => {
    console.log(req.body)

    if (validateUser(req.body)) {
        const user = req.body
        const {address} = user

        user.id = users.length + 1

        //He puesto idAddress = 1 por que unicamente el usuario tiene una direccion
        address.id = 1
        user.address = address

        users.push(user)

        res.status(201).send("CREATED")
    } else {
        //Invalid Address
        res.status(405).send("Invalid input")
    }

})

router.put("/updateUsersById/:userId", (req, res) => {
    const {userId} = req.params
    let found = false

    if (!isNaN(parseInt(userId))) {
        if (validateUser(req.body)) {
            const {name, email, birthDate, address} = req.body

            _.each(users, (user, i) => {
                if (user.id === parseInt(userId)) {
                    user.name = name
                    user.email = email
                    user.birthDate = birthDate

                    //He puesto idAddress = 1 por que unicamente el usuario tiene una direccion
                    address.id = 1
                    user.address = address

                    res.json(user)
                }
            })
            if (!found) {
                res.status(404).send("User not found")
            }
        } else {
            res.status(405).send("Invalid input")
        }
    } else {
        res.status(400).send("Invalid user id")
    }

})

router.delete("/deleteUsersById/:userId", (req, res) => {
    const {userId} = req.params
    let found = false

    if (!isNaN(parseInt(userId))) {

        _.each(users, (user, i) => {
            if (user.id === parseInt(userId)) {
                users.splice(i, 1)
                found = true
                res.status(200).send("OK")
            }
        })
        if (!found) {
            res.status(404).send("User not found")
        }

    } else {
        res.status(400).send("Invalid user id")
    }
})

function validateUser(user) {
    const {name, email, birthDate, address} = user

    if (name && email && birthDate && address) {
        const {street, state, city, country, zip} = address;
        return (street && state && city && country && zip);
    }
}

module.exports = router