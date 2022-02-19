import Header from '../../components/Header';
import './favoritos.css';
import  { toast } from 'react-toastify';
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function Favoritos(){

    const [filmes, setFilmes] = useState([]);

    useEffect(()=>{

        const minhaLista = localStorage.getItem('filmes');
        setFilmes(JSON.parse(minhaLista) || []);

    }, []);

    function handleDelete(id){
        let filtroFilmes = filmes.filter((item)=>{
            return (item.id !== id);
        });

        setFilmes(filtroFilmes);
        localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
        //alerta
        toast.success('Filme excluido com sucesso');
    }

    return(
        <div>
            <Header/>
            <div className='meus-filmes'>
                <h1>Meus Filmes</h1>
                {filmes.length === 0 && <span>Você ainda não possui nenhum filme salvo :/ </span>}
                <ul>
                    {filmes.map((item)=>{
                        return(
                            <li key={item.id}>
                                <span className='nomeFav'>{item.nome}</span>
                                <div className='botoesFav'>
                                    <Link className='detalhes' to={`/filme/${item.id}`}>Ver detalhes</Link>
                                    <button onClick={ () => handleDelete(item.id) }>Excluir</button>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}