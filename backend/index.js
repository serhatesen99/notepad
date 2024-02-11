import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/notepad");
const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

app.get("/api/notes", async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post("/api/notes", async (req, res) => {
  const { title, content } = req.body;
  const newNote = new Note({ title, content });
  await newNote.save();
  res.json(newNote);
});

app.delete("/api/notes/:id", async (req, res) => {
  const deletedNote = await Note.findOneAndDelete({ _id: req.params.id });
  res.json({ message: "Not silindi.", deletedNote });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
