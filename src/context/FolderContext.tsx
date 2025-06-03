import {type ReactNode, createContext, useContext, useState } from "react";



export interface Folder {
    id: number;
    title: string;
    createdAt: string;
    updatedAt?: string;
    bgColor: string;
    noteIds: number[];
}

interface FolderContextType{
    folders: Folder[];
    createFolder: (folder: Folder) => void;
    // deleteFolder: (id: number) => void;
    addNoteToFolder: (folderId: number, noteId: number) => void;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider = ({children}: {children : ReactNode}) => {
    const [folders, setFolders] = useState<Folder[]>([]);

    const createFolder = (folder: Folder) => {

        setFolders(prevfolder => [...prevfolder, folder])
    }
    const addNoteToFolder = (folderID: number, noteID: number) => {
        setFolders(prevFolders =>
            prevFolders.map(folder =>
            folder.id === folderID
            ? 
            {
                ...folder,
                 noteIds: folder.noteIds.includes(noteID)
                ? folder.noteIds
                : [...folder.noteIds, noteID],
            }
            :
            folder
    )
  );
    }
    return (
        <FolderContext.Provider value= {{folders, createFolder, addNoteToFolder} }>
            {children}
        </FolderContext.Provider>
    )
}

export const useFolderContext = () => {
    const context = useContext(FolderContext);
    if(!context) {
        throw new Error("useNoteContext must be used within a NoteProvider");
    }
    return context;
}