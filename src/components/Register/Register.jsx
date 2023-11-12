import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.config";


const Register = () => {

    const handleRegister = (e) => {
        e.preventDefault();
        // console.log('form has been submitted and page does not reloaded')
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password)

        // creating user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
            }) // then is a promise
            .catch(error => {
                console.error(error);
            }       
            ) // catch used if there is an error

    }

    return (
      <div className="">
        <div className="mx-auto md:w-1/2">
          <h2 className="text-5xl">This is registration page</h2>
          <form onSubmit={handleRegister}>
            <input
              className="my-5 w-3/4 py-2 px-3 rounded-md outline-none"
              type="email"
              name="email"
              id=""
              placeholder="abc@example.com"
            />
            <br />
            <input
              className="my-5 w-3/4 py-2 px-3 rounded-md"
              type="password"
              name="password"
              id=""
              placeholder="password"
            />
            <br />
            <input
              className="btn btn-secondary my-5 w-3/4"
              type="submit"
              value="Register"
            />
          </form>
        </div>
      </div>
    );
};

export default Register;