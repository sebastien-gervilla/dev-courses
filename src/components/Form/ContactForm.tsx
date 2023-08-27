import React, { MouseEvent, useState } from 'react';
import { FormField, FormTextArea } from '../FormField';
import { Request } from '@/api';
import { useModal } from '@/hooks';
import { Snackbar } from '../Snackbar';

const ContactForm = () => {

    const [form, setForm] = useState(defaultForm);

    const snackbar = useModal();
    
    const handleChangeForm = (name: string, value: string) =>
        setForm({...form, [name]: value});

    const handleSubmitForm = async (event: MouseEvent) => {
        event.preventDefault();

        if (Object.values(form).some(value => !value))
            return;

        const response = await Request.post('/user/contact', form);
        if (response.ok) {
            setForm(defaultForm);
            snackbar.open();
        }
    }

    return (
        <form className="app-form">
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
                <FormField 
                    label="Sujet"
                    name="subject"
                    value={form.subject}
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
            <Snackbar 
                isOpen={snackbar.isOpen}
                onClose={snackbar.close}
                message='Mail envoyé avec succès.'
                closeDelay={2500}
            />
        </form>
    );
};

const defaultForm = {
    fname: '',
    lname: '',
    email: '',
    subject: '',
    message: ''
}

export default ContactForm;