import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const HeroRegister = () => {
    const [errorMessage, setErrorMessage] = useState("");

    const [success, setSuccess] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log('form has been submitted and page does not reloaded')
        const email = e.target.email.value;
        const password = e.target.password.value;
        const acceptTerms = e.target.terms.checked;
        const name = e.target.name.value;
        console.log(name, email, password, acceptTerms);

        // Regular Expression
        //   const regExpPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // reset user error message if there is an error before
        setErrorMessage("");
        // rest user success message if there is a previous value or the next attempt can be error
        setSuccess("");

        // checking wether password is longer than 6 or not
        if (password.length < 6) {
            setErrorMessage(
                "Password should be at least 6 characters (auth/weak-password)."
            );
            return;
        }
        // use regular expression for validating password
        else if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            setErrorMessage(
                "Your password must contain at least one UPPER case, one LOWER case and at least one SPECIAL char."
            );
            return;
        }

        else if (!acceptTerms) {
            setErrorMessage('Please Accept out Terms and Conditions')
            return
        }

        // user creating by firebase
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                setSuccess("User Credential Added");

                // add user name
                updateProfile(userCredential.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => {
                        console.log('profile Name updated')
                    })
                    .catch()

                //set user verification
                sendEmailVerification(userCredential.user)
                    .then(() => {
                    alert('check your mail to confirm your email.')
                })

            })
            .catch((error) => {
                console.error(error);
                setErrorMessage(error.message);
            });
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut
                            assumenda excepturi exercitationem quasi. In deleniti eaque aut
                            repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            {/* User Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="your name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <div className="relative bottom-8 left-72 text-xl">
                                    <small onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? (
                                            <BsEyeSlashFill></BsEyeSlashFill>
                                        ) : (
                                            <BsEyeFill></BsEyeFill>
                                        )}
                                    </small>
                                </div>
                                
                            </div>
                            
                            {/* Terms and condition */}
                            <div>  
                                <input type="checkbox" name="terms" id="terms" />
                                <label htmlFor="terms"> Accept our <a className="underline" href="">Terms and Conditions</a></label>
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>

                            {errorMessage && (
                                <p className="text-sm font-bold text-red-500">
                                    {errorMessage}
                                </p>
                            )}

                            {success && (
                                <p className="text-sm font-bold text-green-500">{success}</p>
                            )}

                            <div>
                                <p>Already have an Account! Please <span className="underline"><Link to={'/login'}>Log in</Link></span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroRegister;
