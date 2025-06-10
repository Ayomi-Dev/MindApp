import { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import { toast } from "react-toastify";

// Define the shape of the note state
interface Note {
  id: number,
  title: string,
  category: string,
  content: string,
  bgColor?: string,
  createdAt: string,
  updatedAt?: string,
  timestamp: number,
}
type TimeRange = "all" | "last24hr" | "thisweek" | "thismonth";
//Define the context with the shape of the note state
interface NoteContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: number, updatedNote: Partial<Note>) => void;
  deleteNote: (id: number) => void;
  searchResults: Note[];
  setSerachResults: (notes: Note[]) => void;
  noteTimeFilter: TimeRange;
  setNoteTimeFilter: (range: TimeRange) => void;
  handleFilter: (range: TimeRange) => void;
  notesToFilter: Note[]
}

// Creates the context with a default value
const NoteContext = createContext<NoteContextType | undefined>(undefined);
// Creates a provider component
export const NoteProvider = ({children}: {children: ReactNode}) => {
  const [notes, setNotes] = useState<Note[]>(() => {
    // Initialize notes from localStorage or an empty array
    // This will run only once when the component mounts
    const storedNotes = localStorage.getItem("notes");
    return storedNotes ? JSON.parse(storedNotes) : [];

  });
  const [searchResults, setSerachResults] = useState<Note[]>([]);
  const [noteTimeFilter, setNoteTimeFilter] = useState<TimeRange>('all');
  const [notesToFilter, setNotesToFilter] = useState(notes) // Initialize with an empty array to store
  
  useEffect(()=> {
    const savedFilter = localStorage.getItem('noteTimeFilter') as TimeRange
    if(savedFilter){
      handleFilter(savedFilter)
    }
  }, [])


  const handleFilter = (range: TimeRange) => { //filters notes based on the selected time range
    if (range === "all") {
      setNoteTimeFilter(range);
      setNotesToFilter(notes); // reset to full list
      return;
    }
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const oneWeek = 7 * oneDay; // One week in milliseconds
    const oneMonth = 30 * oneDay; // One month in milliseconds
    const filteredNotes =  notes.filter(note => {
      const timeDifference = now - note.timestamp
      switch (range) {
        case "last24hr":
         return timeDifference <= oneDay; // Less than 24 hours ago
        case "thisweek":
          return timeDifference > oneDay && timeDifference <= oneWeek; // Less than 7 days ago but more than 24 hours ago
        case "thismonth":
          return timeDifference > oneWeek && timeDifference <= oneMonth ; // Less than 30 days ago but more than 7 days ago 
        default:
          return false; // No match
        }
      })
      setNoteTimeFilter(range as typeof noteTimeFilter)
      setNotesToFilter(filteredNotes);
      localStorage.setItem('noteTimeFilter', range) // Store the selected time filter in localStorage so that it persists across page reloads
  }

  const addNote = (note: Note) => {
    setNotes(prevNotes => [...prevNotes, note]);
    toast.success("Note added successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const updateNote = (id: number, updatedNote:Partial<Note>) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, ...updatedNote } : note
      )
    );
    toast.success("Note updated successfully!")
  }

  const deleteNote = (id: number ) => {
    // Filter out the note with the given id
    setNotes(notes.filter(note => note.id !== id));
    toast.warning("Note deleted successfully!")
  }
  useEffect(() => {
    // Store notes in localStorage whenever they change
    localStorage.setItem('notes', JSON.stringify(notes)) // Convert notes to a JSON string and save it to localStorage
    localStorage.setItem('notesToFilter', JSON.stringify(notesToFilter)) // Store filtered notes in localStorage so that it persists across page reloads
    setNotesToFilter(notes) // Update notesToFilter whenever notes change
  }, [notes]);



  return(
    <NoteContext.Provider value = {{notes, notesToFilter, addNote, updateNote, deleteNote, searchResults, setSerachResults, noteTimeFilter, setNoteTimeFilter, handleFilter}} >
        { children }
    </NoteContext.Provider>
  )

}

export const useNoteContext = () => {
    const context = useContext(NoteContext)
    if(!context) {
        throw new Error("useNoteContext must be used within a NoteProvider");
    }
    return context;
}