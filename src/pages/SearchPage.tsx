import { Link } from "react-router-dom";
import { useNoteContext } from "../context/NoteContext";
import { highlightText } from "../utility/highlightText";


export const SearchPage = () => {
  const { searchResults } = useNoteContext();
  const query = searchResults.length > 0 ? searchResults[0].title : '';
  return (
    <div className="flex-1">
      <div className="p-4 w-[95%] md:w-[70%] mx-auto flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Search Results</h2>
      {searchResults.length === 0 ? (
        <p className="text-gray-500">No notes match your search.</p>
      ) : (
        <ul className="space-y-4 w-full">
          {searchResults.map(note => (
            <li key={note.id} className="bg-white shadow-md p-4 w-full rounded-md">
              <Link to={`/note/${note.id}`}>
                <h3 className="text-lg font-semibold">{highlightText(note.title, query)}</h3>
                <p className="text-sm text-gray-500">{highlightText(note.content.slice(0, 60), query)}...</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  )
}
