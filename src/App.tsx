import type { NoteProp } from "./Doc";


function App() {
  const note: NoteProp = {
    id: Date.now(),
    title: 'first note',
    desc: 'React for today'
  }
  return(
    <>
      
      <h1 className="text-2xl text-red-500">
        {note.desc}
      </h1>
        
    </>
  )
}

export default App;
