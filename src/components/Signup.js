import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/Login.css';

function Signup() {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        username: '',
        pw: '',
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
            // Lähetä POST-pyyntö rekisteröitymispolulle formin tiedoilla
            const response = await axios.post('http://localhost:3001/register', formData)

            if (response.status === 200) {
                console.log('Rekisteröityminen onnistui!')
                navigate('/login')
            } else {
                console.log('Rekisteröityminen epäonnistui')
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className='bg-white p-3 rounded w-25'>
                <h2>Rekisteröidy</h2>
                <p>Rekisteröidy Stiilin sopin asiakkaaksi täyttämällä tietosi.</p>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstname">Etunimi</label>
                        <input type="text" placeholder='Etunimi' name="fname" value={formData.fname}
                            onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div>
                        <label htmlFor="lastname">Sukunimi</label>
                        <input type="text" placeholder='Sukunimi' name="lname" value={formData.lname}
                            onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="username">Käyttäjätunnus</label>
                        <input type="text" placeholder='Käyttäjätunnus' name="username" value={formData.username}
                            onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Salasana</label>
                        <input type="password" placeholder='Salasana' name="pw" value={formData.pw}
                            onChange={handleInput} className='form-control rounded-0' />
                    </div>
                    <button type="submit" className='btn btn-default border w-100'>Luo käyttäjätunnus</button>
                </form>
            </div>
        </div>
    )
}

export default Signup;