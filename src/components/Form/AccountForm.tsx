import React, { useState, useContext } from 'react';
import { FormField } from '../FormField';
import { Request, UserModel } from '@/api';
import { SnackbarContext } from '@/contexts';

interface AccountFormProps {
    initialUser: UserModel | null
    refresh: () => void
}

const AccountForm = ({ initialUser, refresh }: AccountFormProps) => {

    const snackbar = useContext(SnackbarContext);

    const [form, setForm] = useState({
        fname: initialUser?.fname || '',
        lname: initialUser?.lname || ''
    });

    const handleFormChanges = (name: string, value: string) => {
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmitForm = async () => {
        if (!initialUser?._id) return;

        const res = await Request.put('/user/' + initialUser._id, form);
        snackbar.open({
            message: res.ok ?
                'Informations modifiées avec succès.' :
                'Une erreur est survenue.'
        });

        res.ok && refresh();
    } 

    return (
        <div className='account-form app-form'>
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
                    value={initialUser?.email || ''}
                    onChange={handleFormChanges}
                    disabled
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

export default AccountForm;