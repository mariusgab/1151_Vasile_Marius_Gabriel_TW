const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const Sequelize = require('sequelize')
const axios = require("axios")

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING
    },
    fullname: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.ENUM,
        values: ["regular", "pro"]
    }
})

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: "db created" })
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/data', async (req, res) => {
    try {
        let { data: users } = await axios.get("https://jsonplaceholder.typicode.com/users");

        await users.forEach(async (item) => {
            await User.create({ username: item.username, id: item.id })
        });
        let data = await User.findAll()
        res.status(201).json(data)
    }
    catch (err) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});

app.listen(process.env.PORT)