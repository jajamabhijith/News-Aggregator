import React,{useContext,useEffect,useState} from 'react'
import Nav from '../components/Nav';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const {user} = useContext(AuthContext);
  const [userNotes, setUserNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  // console.log("user:",user);
  const handleAddNoteClick = () => {
    setShowForm(true);
  };


useEffect(()=>{
  if(user.id){
    fetchUserNotes();
  }
},[user])


useEffect(() => {
  // Filter notes based on search term
  const filtered = userNotes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredNotes(filtered);
}, [searchTerm, userNotes]);


const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};



  const fetchUserNotes = async () => {
    try {
      const response = await axios.get(`/api/notes/fetch/${user.id}`);
      setUserNotes(response.data.notes);
    } catch (error) {
      console.error('Error fetching user notes:', error);
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/notes/${user.id}`, { title, content});
      setMessage('Note added successfully!');
      fetchUserNotes();
      setTitle('');
      setContent('');
      setShowForm(false);
      console.log(response);
      setTimeout(()=>{
        setMessage('');
      },3000);
    } catch (error) {
      console.error('Error adding :', error);
      setMessage('Error adding note.');
    }
  };

  const handleCategoryChange = (category) => {
    // Handle category change if needed
    console.log(`Selected category: ${category}`);
  };

  return (
    <div className="Profile">
      <header>
        <Nav handleCategoryChange={handleCategoryChange} />
      </header>
      <main>
        <h2>Profile Page</h2>
        <button onClick={handleAddNoteClick}>Add Note</button>
        {showForm && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label>Content:</label>
              <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        )}
        {message && <p>{message}</p>}


        <div>
          <input
            type="text"
            placeholder="Search notes"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <h3>My Notes</h3>
        {filteredNotes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <ul>
            {filteredNotes.map((note, index) => (
              <li key={index}>
                <h4>{note.title}</h4>
                <p>{note.content}</p>
                <p>Posted on: {new Date(note.time).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default Profile
