import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/axios';
import '../Dashboard.css';
import bg from '../assets/right-column.png';
import logo from '../assets/top (1).png';
import deleteIcon from '../assets/delete_24dp_5F6368_FILL0_wght300_GRAD0_opsz24 1@2x.png';
interface User {
  name: string;
  email: string;
}

interface Note {
  _id: string;
  content: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState('');
  // Fetch user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Fetch notes on load
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/notes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        toast.error('Failed to fetch notes');
      }
    };
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    if (!newNote.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        '/notes',
        { content: newNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotes([...notes, res.data]);
      setNewNote('');
    } catch (err) {
      toast.error('Failed to create note');
    }
  };

const handleDelete = async (id: string) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  } catch (err) {
    toast.error('Failed to Delete Node ');
  }
};


  const signOut = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className='dashboard-container'>

    <div className="dashboard-box">
  <div className="dashboard-left">
    <header className="dashboard-header">
        <img src={logo}/>
        <h2>Dashboard</h2>
        <button className="signout-link" onClick={signOut}>
          Sign Out
        </button>
      </header>

      {user && (
        <div className="welcome-card">
          <h3>Welcome, {user?.name} !</h3>
          <p>Email: {user?.email}</p>
        </div>
      )}

      <div className="new-note-container">
        <textarea
          placeholder="Type your note here..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className="create-note-btn" onClick={handleCreateNote}>
          Create Note
        </button>
      </div>

      <div className="notes-section">
        <h4>Notes</h4>
        {notes.map((note) => (
          <div className="note-item" key={note._id}>
            <span>{note.content}</span>
            <button className="delete-btn" onClick={() => handleDelete(note._id)}>
              <img src={deleteIcon} height={30} width={30}/>
            </button>
          </div>
        ))}
      </div>
  </div>
  <div className="dashboard-right">
    <img src={bg} alt="Dashboard background" />
  </div>
</div>
    </div>

  );
};

export default Dashboard;
