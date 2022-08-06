import {initializeApp} from 'firebase/app'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,

    collection,
    writeBatch,

    query,
    getDocs
} from 'firebase/firestore'
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCw4cj2Nctet4VmjnhrxHUfLP7cih7FJ_o",
    authDomain: "crwn-1c31b.firebaseapp.com",
    projectId: "crwn-1c31b",
    storageBucket: "crwn-1c31b.appspot.com",
    messagingSenderId: "521897716421",
    appId: "1:521897716421:web:08fe9f58e45f68bf175eac"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});
//不是实体(new className)的原因，auth keep tracking
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth,provider);

export const  db =  getFirestore();

// export const addCollectionAndDocuments = async (collectionKey,objectsToAdd)=>{
//     const collectionRef = collection(db,collectionKey);//find ref (no need to create)
//     //transaction  yihua transfer 100 to liu
//     // yihua 1000 -100
//     // liu 1000 +100
//     //transaction makes sure that if step 2 fails step 1 also fails
//     //
//     //use writeBatch
//     const batch = writeBatch(db);//returns a batch
//     objectsToAdd.forEach((obj)=>{
//         const docRef = doc(collectionRef,obj.title.toLowerCase());
//         batch.set(docRef,obj);
//     });
//     await batch.commit();
// };

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach(async (object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};
export const getCategoriesAndDocuments = async ()=>{
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    // const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
    //     const {title,items} = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // },{});
    const categoryMap = querySnapshot.docs.map((docSnapshot)=>(docSnapshot.data()));
    // console.log(categoryMap);
    return categoryMap
};
export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) =>{
    const userDocRef = doc(db,'users',userAuth.uid);//reference，指向这个doc的地址，即使里面是空的
    const userSnapshot = await getDoc(userDocRef);
    //在您首次向文档添加数据时，Cloud Firestore 就会隐式创建集合和文档。
    // 您不需要显式创建集合或文档。
    //check if doc exists
    if(!userSnapshot.exists())
    {
        const {displayName,email} = userAuth;
        const createAt = new Date();
        try{
            //await setDoc(doc(db, "cities", "new-city-id"), data);
            //当您使用 set() 创建文档时，必须为要创建的文档指定 ID
            //但有些时候，无法为文档指定有意义的 ID，这时让 Cloud Firestore 为您自动生成 ID 会更加方便。您可以通过调用 add() 来实现此目的：
            //addDoc
            await setDoc(userDocRef,{
                displayName:displayName,
                email:email,
                createAt:createAt,
                ...additionalInformation,
            })
        }catch (e) {
            console.log('error creating the user',e.message);
        }
    }
    //exists
    return userDocRef;
};
export const createUserWithEP = async (email,password)=>{
    if(!email||!password)   return;
    return await createUserWithEmailAndPassword(auth,email,password);
};

export const signInWithEP = async (email,password)=>{
    if(!email||!password)   return;
    return await signInWithEmailAndPassword(auth,email,password);
};

export const signOutUser = async ()=>{
    await signOut(auth);
};

export const OnAuthStateChangedListener = (callback)=>{
    //open listener 一旦绑定了就会一直监听
    //所以需要sign-out了就去掉这个listener
    //而这个函数自己就会return他的解绑函数
    onAuthStateChanged(auth,callback);
};