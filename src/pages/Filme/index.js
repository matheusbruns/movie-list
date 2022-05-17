import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { toast } from 'react-toastify';
import './filme-info.css';
import Header from '../../components/Header';

export default function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true); //antes de carregar os dados da api

    useEffect(()=> {
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`);

            if(response.data.length === 0){
                // Tentou acessar com um ID que não existe, navego ele para a Home!
                navigate('/');
                return;
            }

            // console.log(response.data)
            setFilme(response.data);
            setLoading(false);
        }
        loadFilme();
    }, [id, navigate]);

    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes');
        
        let filmesSalvos = JSON.parse(minhaLista) || [];
        
        //Se tiver algum filme salvo com esse mesmo id precisa ignorar...
        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id )
        // devolve TRUE ou FALSE

        if(hasFilme){
            toast.error('Você já possui esse filme salvo')
            return;
            // Para a execução do código aqui...
        }

        //colocar mais um item dentro desse array
        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!')
    }

    if(loading){
        return(
            <div>
                <Header/>
                <div className='loadScreen'>
                    <div className='load'></div>
                </div>
            </div>
        );
    }
    
    return(
        <div>
            <Header/>
            <div className='mainFilme'>
                    <h1 className='tituloFilme'>{filme.nome}</h1>
                    <img src={filme.foto} className='imagemFilme' alt={filme.nome}/>
                    <p className='sinopse'><strong>Sinopse: </strong>{filme.sinopse}</p>

                    <div className='botoes'>
                        <button onClick={ salvaFilme }>Salvar</button>
                        <button className='buttonA'>
                            <a target='blank' href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                                Trailer
                            </a>
                        </button>
                    </div>
            </div>
        </div>
    );
}