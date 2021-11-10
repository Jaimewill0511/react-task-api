const express = require("express");
const bodyParser = require("body-parser");
const dbSetup = require("./db/index");
const Task = require('./models/task')
const cors = require('cors');



const app = express();
dbSetup();

app.use(express.json());
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({
            tasks,
        });
    } catch (err) {
        res.status(500).json({
            error: "Please try again later"
        });
    }
})

app.get('/tasks/:id', async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const task = await Task.findById(id);
        res.status(200).json({
            task,
        });
    } catch (err) {
        res.status(500).json({
            error: "Please try again later"
        });
    }
})


app.post('/tasks', async (req, res) => {
    const {
        text,
        day,
        reminder
    } = req.body;
    try {
        const task = new Task({
            text,
            day,
            reminder,
        })
        await task.save();
        res.status(200).json({
            task
        });
    } catch (err) {
        res.status(500).json({
            error: "Please try again later"
        });
    }

})
app.put('/tasks/:id', async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const task =  await Task.findByIdAndUpdate(id, {
            reminder: req.body.reminder
        })
        res.status(200).json({
            task
        });
    } catch (err) {
        res.status(500).json({
            error: "Please try again later"
        });
    }

})
app.delete('/tasks/:id', (req, res) => {
    const {
        id
    } = req.params;
    Task.findByIdAndDelete(id, err => {
        if (err) {
            res.status(500).json({
                error: "Please try again later"
            });
        } else {
            res.status(200).json({
                message: "Successfully deleted"
            });
        }

    })


})
const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || 8888);



app.listen(port, function () {
    console.log(`The Server has started on port ${port}`);
});