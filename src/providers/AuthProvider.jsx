import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import AuthContext from "../contexts/AuthContext";
import axiosInstance from "../../axiosConfig";

const auth = getAuth(app);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    // setIsLoading(false)
    return signOut(auth);
  };
  const updateUserPassword = async (newPassword) => {
    const signinUser = auth.currentUser;

    return updatePassword(signinUser, newPassword);
  };
  // const deleteUser =  (newPassword) => {
  //     const signinUser = auth.currentUser;

  //     return updatePassword(signinUser, newPassword)
  // }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser, "current User");
      if (currentUser) {
        setIsLoading(true);
        const loggedUser = {
          email: currentUser.email,
        };
        console.log(currentUser.email, "current User");
        axiosInstance.post("/users/verify-email", loggedUser).then((res) => {
          console.log(res);
          // Cookies.set(import.meta.env.VITE_COOKIENAME, res.data.token, {
          //     expires: 1,
          //     secure: true
          // })
          setUser(res.data?.data);
          setIsLoading(false);
        });
      }
      if (!currentUser) {
        setUser(currentUser);
        setIsLoading(false);
      }
    });
    //if access token has expired ,then  user will be signed out
    // const authToken = Cookies.get('BD-Tech-Solution');

    // if (!authToken) {
    //     logout()
    //         .then(() => {

    //         })
    //         .catch((error) => console.log(error))
    // }
    return () => unsubscribe();
  }, []);
  const value = {
    user,
    isLoading,
    signUp,
    signIn,
    logout,
    updateUserPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
