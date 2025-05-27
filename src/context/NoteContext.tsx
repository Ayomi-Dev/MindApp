import { createContext, useState, useContext, type ReactNode } from "react";

// Define the shape of the note state
interface Note {
  id: number,
  title: string,
  category: string,
  content: string
  createdAt: string,
}

///Define the context with the shape of the note state
interface NoteContextType {
  notes: Note[];
  addNote: (note: Note) => void;
//   updateNote: (id: number, updatedNote: Partial<Note>) => void;
//   deleteNote: (id: number) => void;
}

// Create the context with a default value
const NoteContext = createContext<NoteContextType | undefined>(undefined);

// Create a provider component
export const NoteProvider = ({children}: {children: ReactNode}) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes(prevNotes => [...prevNotes, note]);
  };

  return(
    <NoteContext.Provider value = {{notes, addNote}} >
        {children}
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