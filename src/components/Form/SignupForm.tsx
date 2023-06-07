import React, { useState } from 'react';
import { FormField, FormPassword } from '../FormField';
import { Request } from '@/api';
import { Link } from '..';

interface SignupFormProps {
    switchModal: () => void
    close: () => void
}

const SignupForm = ({ switchModal, close }: SignupFormProps) => {

    const [form, setForm] = useState(defaultForm);

    const handleFormChanges = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmitForm = async () => {
        const res = await Request.make('/user', 'POST', form);
        if (res.ok) close();
    }

    return (
        <div className='signup-form app-form'>
            <p className='title'>S'incrire</p>
            <div className="form-row">
                <FormField 
                    label='Prénom'
                    type='text'
                    name='fname'
                    value={form.fname}
                    onChange={handleFormChanges}
                />
                <FormField 
                    label='Nom'
                    type='text'
                    name='lname'
                    value={form.lname}
                    onChange={handleFormChanges}
                />
            </div>
            <div className="form-row">
                <FormField 
                    label='Email'
                    type='email'
                    name='email'
                    value={form.email}
                    onChange={handleFormChanges}
                />
            </div>
            <div className="form-row">
                <FormPassword 
                    label='Mot de passe'
                    name='password'
                    value={form.password}
                    onChange={handleFormChanges}
                />
            </div>
            <div className="form-row">
                <button className='animated' onClick={handleSubmitForm}>
                    S'incrire
                </button>
            </div>
            <div className="form-row">
                <p>
                    <span style={{ fontWeight: 500}}>NOTE</span> : 
                    En créant un compte vous acceptez <br/> les {' '}
                    <Link className='animated' href='/conditions-utilisation'>
                        conditions générales d'utilisation.
                    </Link>
                </p>
            </div>
            <p>
                Déjà membre ? <a 
                    onClick={switchModal} 
                    className='animated underline colored'
                >
                    Se connecter
                </a>
            </p>
        </div>
    );
};

const defaultForm = {
    fname: '',
    lname: '',
    email: '',
    password: ''
}

export default SignupForm;