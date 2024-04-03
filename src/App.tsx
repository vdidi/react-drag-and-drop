import { useState, FormEvent } from 'react'
import { Task } from './task';
import { DragDropContext, Droppable } from '@hello-pangea/dnd'

function App() {
  const [newTast, setNewTask] = useState("");

  const [tasks, setTasks] = useState([
    {
      id: "0",
      name: "Estudar react com typescript"
    },
    {
      id: "1",
      name: "Inscrever no canal do Sujeito Programador"
    },
    {
      id: "2",
      name: "Pagar o aluguel"
    },
  ])


  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    if (newTast === "") return;

    let newItem = {
      id: `${tasks.length + 1}`,
      name: newTast
    }
    setTasks(allTasks => [...allTasks, newItem])
    setNewTask("")
  }

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function onDragEnd (result: any) {
    if(!result.destination) return;
    const items = reorder(tasks, result.source.index, result.destination.index);
    setTasks(items);
  }

  return (
    <div className="w-full h-screen flex flex-col items-center px-4 pt-52">
      <h1 className="font-bold text-4xl text-white mb-4">Tarefas</h1>


      <form className="w-full max-w-2xl mb-4 flex" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Digite o nome da tarefa..."
          className="flex-1 h-10 rounded-md px-2"
          value={newTast}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 ml-4 rounded-md px-4 text-white font-medium"
        >
          Add
        </button>
      </form>

      <section className="bg-zinc-100 p-3 rounded-md w-full max-w-2xl">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='tasks' type='list' direction='vertical'>
            {(provided) => (
              <article
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index}/>
                ))}
                {provided.placeholder}
              </article>
            )}
          </Droppable>
        </DragDropContext>
      </section>


    </div>
  )
}

export default App