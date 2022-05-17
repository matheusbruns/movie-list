import './style.css'
import {Link} from 'react-router-dom'

export default function notFound (){
    return(
        <div className='mainErr'>
            <header>
                <Link to='/' className='logo'>NETVLIX</Link>
            </header>
            <div className='containerErr'>
                <h1>Você se perdeu? </h1>
                <p>
                    Infelizmente, não localizamos essa página. 
                    Você encontra <br/> muitos outros títulos na página inicial.
                </p>
                <Link className='ButtonHome' to='/'>Página inicial da Netflix</Link>
                <div className='codErr'>
                    <p>Código de erro <strong>NSES-404</strong></p>
                </div>
            </div>
        </div>
    )
}