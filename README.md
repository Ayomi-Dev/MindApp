# MindPad

A modern, responsive Notes App built with **React**, **TypeScript**, **Tailwind CSS**, and powerful libraries like **Framer Motion** and **React Toastify**. The app allows users to:

- Create and manage notes
- Create folders and group notes into them
- Search notes live
- Filter notes by time (Today, This Week, This Month)
- Persist notes/folders in browser memory (localStorage)
- Navigate with clear visual cues and animation

---

## 🚀 Features

- ✍️ Create, view, and delete **notes**
- 📁 Create folders and add/remove notes to/from them
- 🔍 Live search through all notes by title or content
- ⏳ Filter notes based on creation date: **Today**, **This Week**, **This Month**
- 💾 Persist data in `localStorage` across sessions
- 🌈 Color customization for folders
- 🧭 Highlight active route in the **sidebar**
- 🎉 Smooth UI animations with Framer Motion
- ✅ Real-time toast notifications with React Toastify

---

## 🛠️ Tech Stack

| Tool/Library        | Purpose |
|---------------------|---------|
| **React**           | UI library for building the app |
| **TypeScript**      | Adds type safety and interfaces |
| **Tailwind CSS**    | Utility-first CSS framework for styling |
| **React Router DOM**| Client-side routing |
| **Framer Motion**   | Animations and transitions |
| **React Toastify**  | Beautiful and customizable toast notifications |
| **React Icons**     | For clean and consistent iconography |
| **localStorage**    | To persist data between sessions |

---

## 📁 Folder Structure

src/
│
├── assets/ # Images and static assets
├── components/ # Reusable UI components (Sidebar, Topbar, Searchbar)
├── context/ # Note and Folder context + providers, types and interfaces
├── pages/ # Route-based components (Home, NewNote, FolderPage, etc.)
├── App.tsx # App entry point
└── main.tsx # Renders App and wraps it with providers

## 📦 Dependencies Explained

### 🧩 `framer-motion`

- Used for animating page transitions and component mounts/unmounts.
- Example: Animate the search results when users start typing.
- Simple API like:
  ```tsx
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {/* content */}
  </motion.div>
🔔 react-toastify
Displays real-time feedback, like "Note saved" or "Folder deleted."

Helps improve user interaction.

Usage:

tsx
Copy
Edit
import { toast } from 'react-toastify';

toast.success("Note created!");
🎨 tailwindcss
Utility-first CSS makes styling faster and cleaner.

Enables responsive design and hover/focus states without writing CSS files.

🛣️ react-router-dom
Handles all routing in the app (e.g., /, /new-note, /folder/:id).

Also used with useLocation to highlight the current page in the sidebar.

📦 localStorage
Saves notes and folders even after a browser refresh.

Accessed via:

tsx
Copy
Edit
localStorage.setItem("notes", JSON.stringify(notes));
const stored = JSON.parse(localStorage.getItem("notes") || "[]");


🧠 Concepts

🔄 State Management with Context API
Centralized note and folder logic in NoteContext and FolderContext

Avoids prop drilling across deeply nested components

🔎 Live Search
Filters notes as the user types in the search input;

Highlights search matches in titles using a highlightText() function

🕓 Time-Based Filters
Notes are stored with a timestamp ID

getTimeFilterRange() compares note creation date with the current date to filter by:

Today

This Week

This Month

📁 Folders
Notes are assigned to folders via note IDs

Users can add/remove notes to folders

Folders store a noteIds array that links to associated notes

📥 Getting Started
1. Clone the repository
bash
Copy
Edit
git clone https://github.com/yourusername/notes-app.git
cd notes-app
2. Install dependencies
bash
Copy
Edit
npm install
3. Start development server
bash
Copy
Edit
npm run dev
Open http://localhost:5173 in your browser.

✅ To-Do / Future Improvements
🔒 Add user authentication

☁️ Sync notes with cloud storage

📅 Calendar view for notes

🖼️ Attach images to notes

🧪 Write unit tests

🙌 Acknowledgements
Thanks to the open-source community and the creators of:

Tailwind CSS

React

Toastify

Framer Motion

React Icons

📄 License
