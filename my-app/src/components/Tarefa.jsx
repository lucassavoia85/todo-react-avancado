import { memo } from 'react';
import './tarefa.css';

function Tarefa({tarefa, onDelete, onToggle}){
    return(
              <li>
                <input 
                  type="checkbox" 
                  checked={tarefa.concluida} 
                  onChange={() => onToggle(tarefa._id, tarefa.texto, tarefa.concluida)} /> 
                <span className={ tarefa.concluida ? 'concluida' : ''}>{tarefa.texto}</span>  
                <button className="delete-btn" onClick={() => onDelete(tarefa._id)}>Remover</button>
              </li>

    )
}
export default memo(Tarefa);