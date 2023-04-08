import React, { useState } from 'react';
import FormField from '../FormField/FormField';

const LoginForm = () => {

    const [form, setForm] = useState();

    return (
        <div className='login-form app-form'>
            <p>Se connecter</p>
            <div className="form-row">
                <FormField 
                    label='email'
                    type='email'
                    name='email'
                    onChange={}
                />
            </div>
        </div>
    );
};

export default LoginForm;