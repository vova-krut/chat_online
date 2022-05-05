import express from "express";
import cors from "cors";
import events from "events";

const emitter = new events.EventEmitter();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.get("get-messages", (req, res) => {
    emitter.once("newMessage", (message) => {
        res.json(message);
    });
});

app.post("new-messages", (req, res) => {
    const message = req.body;
    emitter.emit("newMessage", message);
    res.status(200);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
