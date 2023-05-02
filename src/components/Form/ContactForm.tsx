import React, { useState } from 'react';
import { FormField, FormTextArea } from '../FormField';

const ContactForm = () => {

    const [form, setForm] = useState(defaultForm);
    
    const handleChangeForm = (name: string, value: string) =>
        setForm({...form, [name]: value});

    const handleSubmitForm = () => {

    }

    return (
        <form className="app-form">
            <p className="title">

            </p>
            <div className="form-row">
                <FormField 
                    label="Prénom"
                    name="fname"
                    value={form.fname}
                    onChange={handleChangeForm}
                />
                <FormField 
                    label="Nom"
                    name="lname"
                    value={form.lname}
                    onChange={handleChangeForm}
                />
            </div>
            <div className="form-row">
                <FormField 
                    label="Email"
                    name="email"
                    type='email'
                    value={form.email}
                    onChange={handleChangeForm}
                />
            </div>
            <div className="form-row">
                <FormTextArea 
                    label='Message'
                    name='message'
                    value={form.message}
                    onChange={handleChangeForm}
                />
            </div>
            <div className="form-row">
                <button className='animated' onClick={handleSubmitForm}>
                    Envoyer
                </button>
            </div>
        </form>
    );
};

const defaultForm = {
    fname: '',
    lname: '',
    email: '',
    message: ''
}

export default ContactForm;