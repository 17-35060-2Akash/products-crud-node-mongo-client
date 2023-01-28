import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const SignUp = () => {
    const { createUser } = useContext(AuthContext);

    const [fieldValue, setFieldValue] = useState({});

    // console.log(fieldValue);

    const handleOnSubmit = event => {
        event.preventDefault();

        createUser(fieldValue.email, fieldValue.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                event.target.reset();
            })
            .catch(error => console.error(error));

    };

    const handleOnChange = event => {
        const field = event.target.name;
        const value = event.target.value;

        const newFieldValue = { ...fieldValue };
        newFieldValue[field] = value;
        setFieldValue(newFieldValue);


    };
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold py-5">Sign Up</h1>
                </div>
                <form onSubmit={handleOnSubmit} className="card  w-full max-w-sm shadow-2xl bg-base-100" style={{ width: '28rem', height: '28rem' }}>
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input onChange={handleOnChange} type="name" name='name' placeholder="name" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={handleOnChange} type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={handleOnChange} type="password" name='password' placeholder="password" className="input input-bordered" required />

                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>
                <div className='pt-4'>
                    <p className='text-2xl font-semibold'>Already have an account? <br /><Link className='text-purple-600' to='/login'>
                        Login</Link> Here.</p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;