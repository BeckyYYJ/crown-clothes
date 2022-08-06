// import {
//     auth,
//     createUserDocumentFromAuth,
// } from "../../utils/firebase/firebase.utils";
import './authentication.styles.scss'
import {useEffect} from 'react';
import {getRedirectResult} from 'firebase/auth';
import SignUpForm from "../../component/sign-up/sign-up.component";
import SignIn from "../../component/sign-in/sign-in.component";

const Authentication = () =>{
    // const logGoogleUser = async() =>{
    //     const response = await signInWithGooglePopup();
    //     const userDocRef = await createUserDocumentFromAuth(response);
    //     console.log(response);
    // };
    // const logGoogleRedirect = async() =>{
    //     const response = await signInWithGoogleRedirect();
        //rediect 回来是重新生成，下面不执行了
        // const userDocRef = await createUserDocumentFromAuth(response);
        // console.log(response);
    // };
    //改用如下方法：*********
    //用useeffect在每次mount的时候读信息
    //如果已经redirect登录过了，会有记录，通过auth可以获取
    // useEffect(()=>{
    //     async function f() {
    //         const response = await getRedirectResult(auth);
    //         if(response)
    //         {
    //             const userDocRef = await createUserDocumentFromAuth(response);
    //         }
    //     }
    //     f();
    // },[]);
    return(
        <div className='authentication-container'>
            {/*<button onClick={logGoogleUser}> sign in</button>*/}
            {/*<button onClick={signInWithGoogleRedirect}> sign in2</button>*/}
            <SignIn/>
            <SignUpForm/>
        </div>
    );
};
export default Authentication;