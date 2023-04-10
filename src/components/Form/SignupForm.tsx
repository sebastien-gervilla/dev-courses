import React, { useState } from 'react';
import { FormField, FormPassword } from '../FormField';
import { Request } from '@/api';

interface SignupFormProps {
    switchModal: () => void
    close: () => void
}

const SignupForm = ({ switchModal }: SignupFormProps) => {

    const [form, setForm] = useState(defaultForm);

    const handleFormChanges = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmitForm = async () => {
        const res = await Request.make('/user', 'POST', form);
        console.log(res);
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
            <p>
                Déjà member ? <a 
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