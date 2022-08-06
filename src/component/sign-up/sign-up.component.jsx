import {useState} from 'react';
import {createUserDocumentFromAuth, createUserWithEP} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-up.styles.scss'
import Button from "../button/button.component";
import {UserContext} from "../../contexts/user.context";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const SignUpForm = () => {
    // const  {setUser} = useContext(UserContext);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
        // console.log(formFields);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("password do not match");
            return;
        }
        try {
            const response = await createUserWithEP(email, password);
            await createUserDocumentFromAuth(response, {displayName});
            // setUser(response);
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else console.log('user create encountered an error', e);
        }
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" type="text" required
                           name="displayName" value={displayName} onChange={handleChange}/>
                <FormInput label="Email" type="email" required
                           name="email" value={email} onChange={handleChange}/>
                <FormInput label="Password" type="password" required
                           name="password" value={password} onChange={handleChange}/>
                <FormInput label="confirmPassword" type="password" required
                           name="confirmPassword" value={confirmPassword} onChange={handleChange}/>
                <Button type="submit">SIGN UP</Button>
            </form>
        </div>
    )
};
export default SignUpForm;