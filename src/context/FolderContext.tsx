import {type ReactNode, createContext, useContext, useEffect, useState } from "react";;

export interface Folder {
    id: number;
    title: string;
    createdAt: string;
    updatedAt?: string;
    timestamp:  number;
    bgColor: string;
    noteIds: number[];
}

type Range = "today" | "thisweek" | "thismonth" | "all";
interface FolderContextType{
    folders: Folder[];
    createFolder: (folder: Folder) => void;
    deleteFolder: (id: number) => void;
    addNoteToFolder: (folderId: number, noteId: number) => void;
    removeNoteFromFolder: (folderId: number, noteId: number) => void;
    filteredFolders: (range: Range ) => void;
    timeFilter: Range;
    setTimeFilter: (range: Range) => void;
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
    const getHours  = (timestamp: number) => {
        const now = Date.now(); //extracts the current time in milliseconds
        const timeDifference = now - timestamp //calculates the difference between the current time and the timestamp of the folder
        return Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
    }

    // Function to filter folders based on the selected range
    const [timeFilter, setTimeFilter] = useState<Range>("all");
    const filteredFolders = (range: Range) => {
        folders.filter(folder => {
                const timeAgo = getHours(folder.timestamp);

                if(range === "today"){
                    return timeAgo <= 24; // 24 hours in a day
                }
                else if(range === "thisweek") {
                    return timeAgo <= 24 * 7; // 7 days in hours
                }
                else if(range === "thismonth") {
                    return timeAgo <= 24 * 30; // 30 days in hours
                }
                else{
                    return true; // If no range is specified, return all folders
                }
            })
        setTimeFilter(range as Range); // Update the time filter state
    }
    
    useEffect(() => { //persisting data to localStorage
        localStorage.setItem("folders", JSON.stringify(folders)) // Convert folders to a JSON string and save it to localStorage
    }, [folders])

    return (
        <FolderContext.Provider value= {{folders, createFolder, addNoteToFolder, deleteFolder, removeNoteFromFolder, filteredFolders, timeFilter, setTimeFilter} }>
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