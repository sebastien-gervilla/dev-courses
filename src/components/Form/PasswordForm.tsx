import React, { useState,useContext } from 'react';
import { FormPassword } from '../FormField';
import { Request } from '@/api';
import { SnackbarContext } from '@/contexts';

interface PasswordFormProps {
    userId?: string
    refresh: () => void
}

const PasswordForm = ({ userId, refresh }: PasswordFormProps) => {

    const snackbar = useContext(SnackbarContext)

    const [form, setForm] = useState(defaultForm);

    const handleFormChanges = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmitForm = async () => {
        if (!userId) return;

        const res = await Request.put(`/user/${userId}/change-password`, form);

        snackbar.open({
            message: res.ok 
                ? 'Mot de passe modifié avec succès.'
                : 'Indentifiants incorrects.'
        });

        if (res.ok) {
            refresh();
            setForm(defaultForm);
        }
    }

    return (
        <div className='password-form app-form'>
            <div className="form-row">
                <FormPassword
                    label='Mot de passe actuel'
                    name='oldPassword'
                    value={form.oldPassword}
                    onChange={handleFormChanges}
                />
            </div>
            <div className="form-row">
                <FormPassword 
                    label='Nouveau mot de passe'
                    name='newPassword'
                    value={form.newPassword}
                    onChange={handleFormChanges}
                />
            </div>
            <div className="form-row">
                <button className='animated' onClick={handleSubmitForm}>
                    Sauvegarder
                </button>
            </div>
        </div>
    );
};

const defaultForm = {
    oldPassword: '',
    newPassword: ''
}

export default PasswordForm;