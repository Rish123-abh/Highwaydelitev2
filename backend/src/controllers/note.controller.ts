import { Request, Response } from 'express';
import Note from '../models/note.model';

export const getNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const notes = await Note.find({ userId });
  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { content } = req.body;
  const note = await Note.create({ content, userId });
  res.status(201).json(note);
};

export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId });

    if (!note) {
      res.status(404).json({ message: 'Note not found' });
      return;
    }

    res.status(204).send(); // success with no content
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
