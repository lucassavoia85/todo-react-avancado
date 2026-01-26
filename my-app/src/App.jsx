import { useState, useContext, useMemo } from "react";
import { TodoContext } from "./TodoContext";
import Tarefa from "./components/Tarefa"
import "./components/App.css";


function App() {

  const { tarefas, filtro, setFiltro, addTarefa, deleteTarefa, toggleTarefa } = useContext(TodoContext);
  const [adicionarTarefa, setAdicionarTarefa] = useState('');

const handleSubmit = (e) => {
  e.preventDefault();

  if(adicionarTarefa.trim() === '') return;

    addTarefa(adicionarTarefa.trim())
      .then(() => setAdicionarTarefa(''));
  }

  const tarefasFiltradas = useMemo(() => {
    return tarefas.filter((tarefa) => {
      if (filtro === 'pendentes') return !tarefa.concluida;
      if (filtro === 'concluidas') return tarefa.concluida;
      return true;
    });
  }, [tarefas, filtro]);

  return (
  <main>
  <h1> To-do List App</h1>
  <form onSubmit={handleSubmit}>
    <input type ="text" placeholder="Digite uma nova tarefa"
    value={adicionarTarefa}
    onChange={(e) => setAdicionarTarefa(e.target.value)}
    />
    <button type='submit'>Adicionar</button>
  </form>

  <div className="filter-container">
    <button className={filtro === 'todas' ? 'active' : ''} onClick={() => setFiltro('todas')}>Todas</button>
    <button className={filtro === 'pendentes' ? 'active' : ''} onClick={() => setFiltro('pendentes')}>Pendentes</button>
    <button className={filtro === 'concluidas' ? 'active' : ''} onClick={() => setFiltro('concluidas')}>Concluídas</button>
  </div>

    <ul>
      {tarefasFiltradas.map(tarefa=> (
      <Tarefa 
        key={tarefa._id} 
        tarefa={tarefa}
        onDelete={deleteTarefa}
        onToggle={toggleTarefa} />
      ))}
    </ul>
    </main>
  )
}


export default App
