import {type ReactNode, createContext, useContext, useEffect, useState } from "react";import { toast } from "react-toastify";
;

export interface Folder {
    id: number;
    title: string;
    createdAt: string;
    updatedAt?: string;
    timestamp:  number;
    bgColor: string;
    noteIds: number[];
}

type Range = "last24hr" | "thisweek" | "thismonth" | "all";
interface FolderContextType{
    folders: Folder[];
    createFolder: (folder: Folder) => void;
    deleteFolder: (id: number) => void;
    addNoteToFolder: (folderId: number, noteId: number) => void;
    removeNoteFromFolder: (folderId: number, noteId: number) => void;
    handleFolderFilter: (range: Range ) => void;
    timeFilter: Range;
    filterData : Folder[]; // This will hold the filtered folders based on the time range

}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider = ({children}: {children : ReactNode}) => {
    const [folders, setFolders] = useState<Folder[]>(() => { //persist the folders data from the local storage

        const stored = localStorage.getItem("folders");
        return stored ? JSON.parse(stored) : [];
    });

    const [timeFilter, setTimeFilter] = useState<Range>("all")
    const [filterData, setFilterData] = useState(folders) // Initialize filterData with the current folders;
   

    const createFolder = (folder: Folder) => {
        setFolders(prevfolder => [...prevfolder, folder])
        toast.success("Folder created successfully") //shows a success message
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
        ))
        toast.success("Note added to folder successfully") //shows a success message
    }
    const deleteFolder = (id: number) => {
        setFolders(folders.filter(folder => folder.id !== id))
        toast.info("Folder deleted successfully")
    }

    const removeNoteFromFolder = (folderID: number, noteID:number) => { //removes selected note from selected folder
        setFolders(folders.map(folder => 
            folder.id === folderID
            ?
            {...folder, noteIds:folder.noteIds.filter(id => id !== noteID)}
            :
            folder
        ))
        toast.info("Note removed from folder successfully") //shows a success message
    }

    useEffect(()=> { // This effect runs once when the component mounts to check for a saved time filter in localStorage
        const savedFilter = localStorage.getItem('timeFilter') as Range
        if(savedFilter){
          handleFolderFilter(savedFilter)
        }
    }, [])

    
    const handleFolderFilter = (range: Range) => {  // Function to filter folders based on the selected range
        if (range === "all") {
            setTimeFilter(range);
            setFilterData(folders); // reset to full list
            return;
        }
        const now = Date.now();
        const oneDay = 24 * 60 * 60 * 1000 ; //24hrs converted to milliseconds
        const oneWeek = 7 * oneDay;  // One week in milliseconds
        const oneMonth = 30 * oneDay; // One month in milliseconds
        const filteredFolders = folders.filter(folder => { 
                const timeAgo = now - folder.timestamp; // Calculate the time difference between now and the folder's timestamp
                if(range === "last24hr" ) { // checks if the folder was created within the last 24 hours
                    return timeAgo <= oneDay; // Check if the folder was created within the last 24 hours
                }
                if(range === "thisweek" ) { // If the range is "thisweek", check if the folder was created within the last 7 days
                    return timeAgo > oneDay && timeAgo <= oneWeek
                }
                if(range === "thismonth" ) { // If the range is "thismonth", checks if the folder was created within the last 30 days
                   
                    return timeAgo > oneWeek && timeAgo <= oneMonth; // Checks if the folder was created within the last 30 days
                }
            })
        setTimeFilter(range as typeof timeFilter); // Update the time filter state
        setFilterData(filteredFolders)
        localStorage.setItem('timeFilter', range) // Store the selected time filter in localStorage
    }
    
    useEffect(() => { //persisting data to localStorage
        localStorage.setItem("folders", JSON.stringify(folders)) // Convert folders to a JSON string and save it to localStorage
        localStorage.setItem("filterData", JSON.stringify(filterData)) // Store filtered folders in localStorage so that it persists across page reloads
        setFilterData(folders) // Update filterData whenever folders change 
    }, [folders])

    return (
        <FolderContext.Provider value= {{folders, createFolder, addNoteToFolder, deleteFolder, removeNoteFromFolder, handleFolderFilter, timeFilter, filterData} }>
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