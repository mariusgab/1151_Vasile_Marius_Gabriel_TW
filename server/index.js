const express = require('express')
const cors = require('cors')
const path = require('path')
const Sequelize = require('sequelize')
const axios = require("axios")
const Op = Sequelize.Op

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

// const sequelize = new Sequelize('test', 'root', 'password', {
//     dialect: 'mysql',
//     host: 'localhost'
// });

const Playlist = sequelize.define('playlist', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    descriere: {
        type: Sequelize.STRING,
        validate: {
            len: [3, 20],
        }
    },
    data: {
        type: Sequelize.DATE
    }
})

const Song = sequelize.define('song', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    titlu: {
        type: Sequelize.STRING,
        validate: {
            len: [5, 20],
        }
    },
    url: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true,
        }
    },
    stil: {
        type: Sequelize.ENUM,
        values: ["rock", "pop", "alternative"]
    }
})

Playlist.hasMany(Song, { as: "songs" });
Song.belongsTo(Playlist, {
    foreignKey: "playlistId",
    as: "playlist",
});

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

app.get('/sync', async (req, res) => {
    try {
        await sequelize.sync({ force: true })
        res.status(201).json({ message: "db created" })
    }
    catch (e) {
        console.log(e)
    }
})

app.get('/playlists', async (req, res) => {
    try {
        let playlists = await Playlist.findAll({ include: ["songs"], })
        res.status(201).json(playlists)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});

app.get('/playlists/:query', async (req, res) => {
    try {
        let playlists = await Playlist.findAll({
            include: ["songs"], where: {
                descriere: { [Op.like]: `%${req.params.query}%` },
            },
        })
        res.status(201).json(playlists)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});

app.post('/playlists', async (req, res) => {
    try {
        await Playlist.create(req.body)
        let playlists = await Playlist.findAll({ include: ["songs"] })
        res.status(201).json(playlists)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});

app.put('/playlists/:id', async (req, res) => {
    let playlist = await Playlist.findByPk(req.params.id, { include: ["songs"] });
    if (playlist) {
        await playlist.update(req.body);
    }
    else {
        res.status(404).json({ message: "playlist not found" });
    }

    let playlists = await Playlist.findAll({ include: ["songs"] })
    res.status(201).json(playlists)
});

app.delete('/playlists/:id', async (req, res) => {
    try {
        let playlist = await Playlist.findByPk(req.params.id)

        if (playlist) {
            await playlist.destroy();
        }

        let playlists = await Playlist.findAll({ include: ["songs"] })
        res.status(201).json(playlists)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});


app.get('/songs/:playlistId', async (req, res) => {
    try {
        let playlist = await Playlist.findByPk(req.params.playlistId, { include: ["songs"] });
        res.status(201).json(playlist)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});


app.get('/songs/:playlistId/:query', async (req, res) => {
    try {

        let playlist = await Playlist.findByPk(req.params.playlistId, {
            include: [
                {
                    model: Song,
                    as: 'songs',
                    where: {
                        titlu: { [Op.like]: `%${req.params.query}%` },
                    },
                },
            ],
        });
        res.status(201).json(playlist)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});


app.post('/songs/:playlistId', async (req, res) => {
    try {
        await Song.create({ ...req.body, playlistId: req.params.playlistId })
        let playlist = await Playlist.findByPk(req.params.playlistId, { include: ["songs"] });
        res.status(201).json(playlist)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});

app.put('/songs/:id', async (req, res) => {
    try {
        let song = await Song.findByPk(req.params.id);
        let playlistId = song.playlistId
        if (song) {
            await song.update(req.body);
        }
        else {
            res.status(404).json({ message: "song not found" });
        }

        let playlist = await Playlist.findByPk(playlistId, { include: ["songs"] });
        res.status(201).json(playlist)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});

app.delete('/songs/:id/', async (req, res) => {
    try {
        let song = await Song.findByPk(req.params.id)
        let playlistId = song.playlistId
        if (song) {
            await song.destroy();
        }

        let playlist = await Playlist.findByPk(playlistId, { include: ["songs"] });
        res.status(201).json(playlist)
    }
    catch (e) {
        console.warn(e)
        res.status(500).json({ message: e })
    }
});


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
// app.listen(8080, () => console.log(`Listening on port 8080`));