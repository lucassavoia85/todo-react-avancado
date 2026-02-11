import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Tarefa from "./components/Tarefa"
import "./components/App.css";
import { tarefasState, filtroState, tarefasFiltradasState } from "./state/storage";

const API_URL = 'https://crudcrud.com/api/907de55b289745a0b6a388b785df8e89/tarefa';

function App() {

  const [tarefas, setTarefas] = useRecoilState(tarefasState);
  const [filtro, setFiltro] = useRecoilState(filtroState);
  const tarefasFiltradas = useRecoilValue(tarefasFiltradasState);

  const [adicionarTarefa, setAdicionarTarefa] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setTarefas(data))
      .catch(err => console.error("Erro ao carregar tarefas", err));
  }, [setTarefas]);

  const addTarefa = (texto) => {
    const nova = { texto, concluida: false };
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nova)
    })
      .then(res => res.json())
      .then(tarefaCriada => setTarefas(prev => [...prev, tarefaCriada]));
  };

  const deleteTarefa = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) setTarefas(prev => prev.filter(t => t._id !== id));
      });
  };

  const toggleTarefa = (id, texto, concluida) => {
    const tarefaAtualizada = { texto, concluida: !concluida };
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tarefaAtualizada)
    })
      .then(res => {
        if (res.ok) setTarefas(prev => prev.map(t => t._id === id ? { ...t, concluida: !concluida } : t));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (adicionarTarefa.trim() === '') return;
    addTarefa(adicionarTarefa.trim())
    setAdicionarTarefa('');
  }

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
