import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {

    const [errorMessage, setErrorMessage] = useState('');

    const [success, setSuccess] = useState('');

    const emailRef = useRef(null);

    const [forgetMessage, setForgetMessage] = useState('');

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setErrorMessage('');
        setSuccess('');
        setForgetMessage('');

        // add validation
        if (password.length < 6) {
            setErrorMessage('Password must be 6 char long or more.');
            return;
        }

        else if (!/[A-Z]/.test(password)) {
            setErrorMessage('Use at least one UPPER case.');
            return;
        }
        
        else if (!/[a-z]/.test(password)) {
            setErrorMessage('Use at least one lower case.');
            return;
        }

        else if (!/[@#$%&*]/.test(password)) {
            setForgetMessage('Use at least one special char.');
            return;
        }

    


        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                console.log(userCredential.user);

                if (userCredential.user.emailVerified) {
                    setSuccess('User Credential Matched');
                }
                else {
                    alert('please check your email and Verify first!')
                    return
                }

            })
        .catch(error => {
            console.error(error.message);
            setErrorMessage(error.message);
        })
    };

    const handleForgetPassword = () => {
        const email = emailRef.current.value;

        setForgetMessage('');
        setErrorMessage('');
        setSuccess('');

        if (!email) {
            console.log('Please Enter an Email', email);
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            console.log('Write an Valid Email')
        }

        // password reset
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Please check your Gmail.')
                setForgetMessage('Please check your Mail!');
            })
            .catch(error => {
                console.log(error.message)
            })

    }

return (
    <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered"
                            name="email" ref={emailRef}   required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                        
                        {
                            errorMessage && <p className="text-sm font-bold text-red-500"> {errorMessage }</p>
                        }
                    
                        {
                            success && <p className="text-sm text-green-500 font-bold">{success }</p>
                    }
                    
                    {
                        forgetMessage && <p className="text-sm text-green-500 font-bold">{forgetMessage}</p>
                    }
                    <div>
                        <p>New to here? Please <span className="underline"><Link to={'/heroRegister'}>Register</Link></span></p>
                    </div>
                    </form>
                </div>
            </div>
        </div>
);
                    };

export default Login;