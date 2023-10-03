import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "../components/firebase.config";
import { useSession } from "../hooks/useSession";
import { useRoles } from "../hooks/useRoles";
import { emailRegex, passwordRegex } from "../utill/regrex";

const Register = () => {
  const { setItem } = useSession();
  const { checkRoles } = useRoles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSignUp = () => {
    if (!password) {
      setPasswordError("Password required");
    } else if (!passwordRegex.test(password)) {
      setPasswordError(
        "Your password must be at least 6 characters long, contain at least one number, special character, and have a mix of uppercase and lowercase letters."
      );
    } else {
      setPasswordError("");
    }

    if (!email) {
      setEmailError("Email required");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        setItem("user", user, 100000);
        user.getIdToken().then((idToken) => {
          // Save the ID token in session storage
          setItem("token", idToken, 60 * 60 * 1000);
        });

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

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Sign up to your account
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
                    Email address Ex: abc.admin@example.com
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className={`appearance-none block w-full px-3 py-2 border ${
                        emailError ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Validate the email using the regex
                        if (!emailRegex.test(value)) {
                          setEmailError("Invalid email address");
                        } else {
                          setEmail(value);
                          setEmailError("");
                        }
                      }}
                    />
                    {emailError && (
                      <p className="mt-2 text-sm text-red-500">{emailError}</p>
                    )}
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
                      className={`appearance-none block w-full px-3 py-2 border ${
                        passwordError ? "border-red-500" : "border-gray-300"
                      } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                      onChange={(e) => {
                        const value = e.target.value;
                        setPassword(value);
                        // Validate the password using the regex
                        if (!passwordRegex.test(value)) {
                          setPasswordError(
                            "Your password must be at least 6 characters long, contain at least one number, special character, and have a mix of uppercase and lowercase letters."
                          );
                        } else {
                          setPasswordError("");
                        }
                      }}
                    />
                    {passwordError && (
                      <p className="mt-2 text-sm text-red-500">
                        {passwordError}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    onClick={onSignUp}
                  >
                    Sign Up
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

export default Register;
