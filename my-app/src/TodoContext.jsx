import { createContext, useState, useEffect, useCallback, useMemo } from "react";
import { useLocalStorage } from "./components/useLocalStorage";

export const TodoContext = createContext();

const API_URL = 'https://crudcrud.com/api/3ddb374b6a8e4734b5b967e4e0981587/tarefa';

export const TodoProvider = ({ children }) => {
    const [tarefas, setTarefas] = useState([]);
    const [filtro, setFiltro] = useLocalStorage('filtroTarefas', 'todas');

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(dados => {
                if (Array.isArray(dados)) {
                    setTarefas(dados);
                } else {
                    console.error("Erro: API retornou formato inválido ou expirou.", dados);
                }
            })
            .catch(erro => console.error("Erro ao buscar tarefa", erro))
    }, []);

    const addTarefa = useCallback((texto) => {
        const nova = { texto, concluida: false };
        return fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nova)
        })
            .then(res => res.json())
            .then(tarefaCriada => {
                setTarefas(prev => [...prev, tarefaCriada]);
            })
            .catch(erro => console.error("Erro ao criar tarefa", erro));
    }, []);

    const deleteTarefa = useCallback((id) => {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.ok) {
                    setTarefas(prev => prev.filter(tarefa => tarefa._id !== id));
                }
            })
            .catch(erro => console.error("Erro ao deletar tarefa", erro));
    }, []);

    const toggleTarefa = useCallback((id, texto, concluida) => {
        const tarefaAtualizada = { texto: texto, concluida: !concluida };

        fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tarefaAtualizada)
        })
            .then(res => {
                if (res.ok) {
                    setTarefas(prev => prev.map(tarefa => tarefa._id === id ? { ...tarefa, concluida: !concluida } : tarefa));
                }
            })
            .catch(erro => console.error("Erro ao atualizar tarefa", erro));
    }, []); 

    const value = useMemo(() => ({ tarefas, filtro, setFiltro, addTarefa, deleteTarefa, toggleTarefa }), [tarefas, filtro, setFiltro, addTarefa, deleteTarefa, toggleTarefa]);

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
};