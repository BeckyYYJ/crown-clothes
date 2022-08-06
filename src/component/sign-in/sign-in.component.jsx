import FormInput from "../form-input/form-input.component";
import {useState} from "react";
import Button from "../button/button.component";
import './sign-in.styles.scss'
import {createUserDocumentFromAuth, signInWithEP, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";

const defaultValue = {
    email: "",
    password: ""
};
const SignIn = () => {
    const [user, setUser] = useState(defaultValue);
    const {email, password} = user;
    const reset = () => {
        setUser(defaultValue);
    };
    const onchangeHandler = (e) => {
        const {name, value} = e.target;
        setUser({ ...user,[name]: value});
        //        setUser({ [name]: value,...user}); 不行
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signInWithEP(email, password);
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
            }
        }
    };
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        await createUserDocumentFromAuth(response);
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Email"
                           required
                           type="email"
                           name="email"
                           value={email}
                           onChange={onchangeHandler}/>
                <FormInput label="Password"
                           required
                           type="password"
                           name="password" value={password} onChange={onchangeHandler}/>
                <div className="buttons-container">
                    <Button type="submit">SIGN IN</Button>
                    <Button type='button' buttonType="google" onClick={logGoogleUser}>SIGN IN WITH GOOGLE</Button>
                </div>
            </form>
        </div>
    )
};
export default SignIn;