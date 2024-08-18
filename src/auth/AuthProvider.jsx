import { useEffect, useState } from "react";
import AuthContext from "./AuthContext.js";
import auth from "./firebase.config";
import PropTypes from "prop-types";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import useAxiosSecure from "../hooks/useAxiosSecure.jsx";
const AuthProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      const userEmail = currentUser?.email || user?.email;
      if (currentUser) {
        axiosSecure
          .post("/jwt", { email: userEmail })
          .then((res) => console.log(res.data));
      } else {
        axiosSecure
          .post("/out", { email: userEmail })
          .then((res) => console.log(res.data));
      }
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, [axiosSecure, user]);
  console.log(user);

  function googleSignIn() {
    return signInWithPopup(auth, googleProvider);
  }

  function logOut() {
    return signOut(auth);
  }

  const authInfo = {
    user,
    loading,
    logOut,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
