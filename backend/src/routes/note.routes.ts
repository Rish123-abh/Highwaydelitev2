import express from 'express';
import { getNotes, createNote, deleteNote } from '../controllers/note.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.get('/', authMiddleware, getNotes);
router.post('/', authMiddleware, createNote);
router.delete('/:id', authMiddleware, deleteNote);

export default router;
