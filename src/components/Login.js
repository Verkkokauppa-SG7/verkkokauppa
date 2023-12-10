import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import '../styles/Login.css';
import { jwtToken } from './TokenSignal';


function Login() {
    const [formData, setFormData] = useState({
        username: '',
        pw: ''
    })

    const navigate = useNavigate()

    const handleInput = (e) => {
        // Päivitä formin tiedot tilaan käyttäjän syötteen perusteella
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    };

    // Lomakkeen lähettäminen
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Lähetä POST-pyyntö kirjautumispolulle formin tiedoilla
            const response = await axios.post('http://localhost:3001/login', formData);

            if (response.status === 200) {
                console.log('Kirjautuminen onnistui')
                navigate('/')
                //const resp = response.data;
                jwtToken.value = response.data.jwtToken;
            } else {
                console.log('Kirjautuminen epäonnistui')
            }

        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            {jwtToken.value.length !== 0 ? navigate('/asiakastiedot') :
            <div className='bg-white p-3 rounded w-25'>
                <h2>Kirjaudu sisään</h2>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Käyttäjätunnus</label>
                        <input type="text"
                            placeholder='Anna käyttäjätunnus' name="username" value={formData.username}
                            onChange={handleInput} className='form-control rounded-0'/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Salasana</label>
                        <input type="password" placeholder='Anna salasana' name="pw" value={formData.pw}
                            onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <button type="submit" className='btn btn-default border w-100'>Kirjaudu sisään</button>
                    <div className="mt-3">
                        <p>Etkö ole vielä Stiilin sopin asiakas? Luo käyttäjätunnus napsauttamalla alla olevaa painiketta.</p>
                    </div>
                    <Link to="/signup" className='btn btn-default border w-100'>Luo käyttäjätunnus</Link>
                </form>
            </div>}
        </div>
    );
}

export default Login