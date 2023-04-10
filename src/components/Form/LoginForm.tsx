import React, { useState } from 'react';
import { FormField, FormPassword } from '../FormField';
import { Request } from '@/api';
import { Alert } from '..';

interface LoginFormProps {
    switchModal: () => void
    refresh: () => Promise<void>
    close: () => void
}

const LoginForm = ({ switchModal, refresh, close }: LoginFormProps) => {

    const [form, setForm] = useState(defaultForm);
    const [error, setError] = useState<string | null>(null);

    const handleFormChanges = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmitForm = async () => {
        const res = await Request.make('/user/login', 'POST', form);
        
        if (!res.ok)
            return setError(res.statusText);

        close();
        refresh();
    }

    return (
        <div className='login-form app-form'>
            <p className='title'>Se connecter</p>
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
            {!!error && 
                <div className='form-row'>
                    <Alert type='Error' hideIcon>
                        {error}
                    </Alert>
                </div>}
            <div className="form-row">
                <button className='animated' onClick={handleSubmitForm}>
                    Se connecter
                </button>
            </div>
            <p>
                Nouveau ici ? <a 
                    onClick={switchModal} 
                    className='animated underline colored'
                >
                    Créer un compte
                </a>
            </p>
        </div>
    );
};

const defaultForm = {
    email: '',
    password: ''
}

export default LoginForm;