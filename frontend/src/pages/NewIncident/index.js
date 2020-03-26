import React, {useState} from 'react';
import './styles.css'
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api'

export default function Profile() {
    const [title, setTile] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(event) {
        event.preventDefault();
        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile');
        } catch(err) {
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
             <section>
                 <img src={logoImg} alt="Be The Hero"/>
                 <h1>Cadastrar novo caso</h1>
                 <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                 <Link className="back-link" to="/profile">
                     <FiArrowLeft size={16} color="#E02041"/>
                     Voltar para home
                 </Link>
             </section>
             <form onSubmit={handleNewIncident}>
                 <input placeholder="Título do caso" value={title} onChange={e => setTile(e.target.value)} />
                 <textarea type="email" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
                 <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />
                 <button className="button" type="submit">Cadastrar</button>
             </form>
        </div>
    </div>
    );
}