import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../components/firebase.config";
import { useSession } from "../hooks/useSession";
import { useRoles } from "../hooks/useRoles";
import { useNavigate } from "react-router";

const Login = () => {
  const { setItem } = useSession();
  const { checkRoles } = useRoles();
  const { navigate } = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const onSignIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setItem("user", user, 100000);
        user.getIdToken().then((idToken) => {
          // Save the ID token in session storage
          setItem("token", idToken, 60 * 60 * 1000);
        });

        // route to desired pages
        if (user.email) {
          const role = checkRoles(user.email);
          if (role) {
            
            window.location.href = `/${role}/products`;
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  // after login to the application if wants add custom user details or retrieve added details in seperate data store
  // like in mongodb

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 grid items-center justify-center text-gray-600">
              {" "}
              ---------------------------{" "}
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={onSignIn}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://www.wallpaperup.com/uploads/wallpapers/2014/09/24/455833/4816bfd02322b6bfa75cf5a86655a68e-700.jpg"
          alt=""
        />
      </div>
    </div>
  );
};

export default Login;
