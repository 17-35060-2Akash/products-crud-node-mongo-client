import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';

const Login = () => {
    const { logIn } = useContext(AuthContext);

    const [fieldValue, setFieldValue] = useState({});

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    // console.log(from)


    const handleOnSubmit = event => {
        event.preventDefault();
        console.log(fieldValue.email, fieldValue.password)
        logIn(fieldValue.email, fieldValue.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                //get jwt token
                const currentUser = {
                    email: user.email
                }
                console.log(currentUser)

                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log(data);
                        localStorage.setItem('bongo-bazar', data.token);
                        navigate(from, { replace: true })

                    });



            })
            .catch(error => console.error(error))



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
                    <h1 className="text-5xl font-bold py-5">Login Here!</h1>
                </div>
                <form onSubmit={handleOnSubmit} className="card  w-full max-w-sm shadow-2xl bg-base-100" style={{ width: '28rem', height: '28rem' }}>
                    <div className="card-body">
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
                            <label className="label">
                                <a href="/login" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary">Login</button>
                        </div>
                    </div>
                </form>
                <div className='pt-4'>
                    <p className='text-2xl font-semibold'>new to Bongo Bazar? <br /><Link className='text-purple-600' to='/register'>
                        Sign Up</Link> Today.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;