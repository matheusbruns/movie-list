import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

import Rotas from './routes'

export default function App() {
  return (
    <div>
      <Rotas/>
      <ToastContainer autoClose={3000}/>
    </div>
  );
}

