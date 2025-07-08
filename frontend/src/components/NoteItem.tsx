import React from 'react';
import type { Note } from '../types';

interface Props {
  note: Note;
  onDelete: (id: string) => void;
}

const NoteItem: React.FC<Props> = ({ note, onDelete }) => {
  return (
    <div className="border p-2 mb-2 flex justify-between items-center">
      <span>{note.content}</span>
      <button onClick={() => onDelete(note._id)} className="text-red-500">Delete</button>
    </div>
  );
};

export default NoteItem;
