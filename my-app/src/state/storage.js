import { atom, selector } from "recoil";

// Átomo para armazenar a lista de tarefas
export const tarefasState = atom({
    key: "tarefasState",
    default: [],
});

// Átomo para armazenar o filtro atual (todas, concluidas, pendentes)
export const filtroState = atom({
    key: "filtroState",
    default: "todas",
});

// Seletor para retornar a lista de tarefas com base no filtro selecionado
export const tarefasFiltradasState = selector({
    key: "tarefasFiltradasState",
    get: ({ get }) => {
        const filtro = get(filtroState);
        const tarefas = get(tarefasState);

        if (filtro === 'pendentes') return tarefas.filter(t => !t.concluida);
        if (filtro === 'concluidas') return tarefas.filter(t => t.concluida);
        return tarefas;
    },
});