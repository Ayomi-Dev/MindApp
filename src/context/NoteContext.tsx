import { createContext, useState, useContext, type ReactNode, useEffect } from "react";

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
type TimeRange = "today" | "thisweek" | "thismonth" | "all";
//Define the context with the shape of the note state
interface NoteContextType {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: number, updatedNote: Partial<Note>) => void;
  deleteNote: (id: number) => void;
  searchResults: Note[];
  setSerachResults: (notes: Note[]) => void;
  timeFilter?: TimeRange;
  setTimeFilter?: (range: TimeRange) => void;
  filteredNotes: (range: TimeRange) => void;
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
  const [timeFilter, setTimeFilter] = useState<TimeRange>("all");

  const getHours = (timestamp: number) => {
    const now = Date.now();
    const timeDifference = now - timestamp
    return Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
  }
  const filteredNotes = (range: TimeRange) => { //filters notes based on the selected time range

    notes.filter(note => {
      const hoursAgo = getHours(note.timestamp)
      switch (range) {
        case "today":
          return hoursAgo < 24; // Less than 24 hours ago
        case "thisweek":
          return hoursAgo < 24 * 7; // Less than 7 days ago
        case "thismonth":
          return hoursAgo < 24 * 30; // Less than 30 days ago
        case "all":
          return true; // All notes
        default:
          return false; // No match
      }
    })
    setTimeFilter(range as  TimeRange)
  }

  const addNote = (note: Note) => {
    setNotes(prevNotes => [...prevNotes, note]);
  };

  const updateNote = (id: number, updatedNote:Partial<Note>) => {
    setNotes(prevNotes => 
      prevNotes.map(note => 
        note.id === id ? { ...note, ...updatedNote } : note
      )
    );
  }

  const deleteNote = (id: number ) => {
    // Filter out the note with the given id
    setNotes(notes.filter(note => note.id !== id));
  }
  useEffect(() => {
    // Store notes in localStorage whenever they change
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes]);



  return(
    <NoteContext.Provider value = {{notes, addNote, updateNote, deleteNote, searchResults, setSerachResults, timeFilter, filteredNotes}} >
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