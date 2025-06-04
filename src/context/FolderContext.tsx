import {type ReactNode, createContext, useContext, useEffect, useState } from "react";



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
    deleteFolder: (id: number) => void;
    addNoteToFolder: (folderId: number, noteId: number) => void;
    removeNoteFromFolder: (folderId: number, noteId: number) => void;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider = ({children}: {children : ReactNode}) => {
    const [folders, setFolders] = useState<Folder[]>(() => {

    const stored = localStorage.getItem("folders");
    return stored ? JSON.parse(stored) : [];
});
    
   

    const createFolder = (folder: Folder) => {
        setFolders(prevfolder => [...prevfolder, folder])
    }
    const addNoteToFolder = (folderID: number, noteID: number) => {
        setFolders(prevFolders =>  //calls the setFunction with the current array of folders in it
            prevFolders.map(folder => //cycle through each folder in the array
            folder.id === folderID //Checks if id of selected folder passed in matches any id of the current folder in the list 
            ? 
            {
                ...folder, //keeps a copy of the current folder and its existing properties
                 noteIds: folder.noteIds.includes(noteID) //checks if the id of the note passed in already exist in the noteIds property of the folder to avoid duplicates
                ? folder.noteIds                  //if it does, it returns the noteIds without any update 
                : [...folder.noteIds, noteID],     //if not, it returns the noteIds with the id passed in        
            }
            :
            folder //returns the folder without any update
        )
    )}
    const deleteFolder = (id: number) => {
        setFolders(folders.filter(folder => folder.id !== id))
    }

    const removeNoteFromFolder = (folderID: number, noteID:number) => {
        setFolders(folders.map(folder => 
            folder.id === folderID
            ?
            {...folder, noteIds:folder.noteIds.filter(id => id !== noteID)}
            :
            folder
        ))
    }
   
    useEffect(() => { //persisting data to localStorage
        localStorage.setItem("folders", JSON.stringify(folders)) // Convert folders to a JSON string and save it to localStorage
    }, [folders])

    return (
        <FolderContext.Provider value= {{folders, createFolder, addNoteToFolder, deleteFolder, removeNoteFromFolder} }>
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