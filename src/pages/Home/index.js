import { useEffect, useState } from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';

import './home.css';
import Header from '../../components/Header';


export default function Home() {
  const [filmes, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadFilme(){
      //sujeitoprogramador.com + r-api/?api=filmes
      const response = await api.get('r-api/?api=filmes');
      
      // console.log(response.data);
      setFilme(response.data);
      
      setTimeout(()=>{
        setLoading(false);
      }, );
    }

    loadFilme();
  }, []);

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
    return (
      <div>
        <Header/>
        <div className='container'>
          <h1 className='destaques'>Destaques da semana</h1>
          <div className='lista-filmes'>
            {filmes.map((filme)=>{
              return(
                <article className='card' key={filme.id}>
                  <strong className='nomeFilme'>{filme.nome}</strong>
                  <img className='imagem' src={filme.foto} alt={filme.nome} />
                  <Link className='acessar' to={`/filme/${filme.id}`}>Acessar</Link>
                </article>
              )
            })}
          </div>
        </div>
        
      </div>
    );
  }
  