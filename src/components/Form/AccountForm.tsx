import React, { useState } from 'react';
import { FormField, FormPassword } from '../FormField';
import { Request, UserModel } from '@/api';

interface AccountFormProps {
    initialUser: UserModel | null
}

const AccountForm = ({ initialUser }: AccountFormProps) => {

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
        console.log(res);
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