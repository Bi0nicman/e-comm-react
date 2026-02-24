"use client";
import { useState } from "react";
import styles from "./SignIn.module.css";
import { authenticateUser } from "@/app/lib/services/eStoreApi";
import { errorsLabels } from "./consts/const";
export function SignInModal() {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{3,}$/;
  const regex1 = /^.{3,}$/;
  const errors = errorsLabels;
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState({
    username: false,
    password: false,
  });
  const [formFields, setformFields] = useState({
    username: "",
    password: "",
  });

  const formErrors = {
    username: isFocused.username && formFields.username.length < 3 ? errors.username : "",
    password: isFocused.password && !regex1.test(formFields.password) ? errors.password : "" ,
  }

  const isOpened = isHovered || isFocused.username || isFocused.password;

   const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
    const formData = new FormData();
    formData.append("username", formFields.username);
    formData.append("password", formFields.password);
    await authenticateUser(formData);
  } 

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setformFields((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log("Form data updated:", { ...formFields, [name]: value });
  }
  return (

    <div
      className="relative"
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
      }
      }
    >
      <span className="text-sm text-purple-500 font-semibold hover:underline cursor-pointer">
        Sign in <span aria-hidden="true">→</span>
      </span>

      {
        isOpened && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h3 className="text-lg font-bold text-white mb-4">Sign In</h3>

                <form onSubmit={signIn} className="space-y-4">
                  <div>
                    <label htmlFor="username" 
                    className="block text-sm font-medium text-gray-300 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      className={styles.input}
                      value={formFields.username}
                      placeholder="username"
                      onChange={handleChange}
                      onFocus={() => setIsFocused(() => ({ ...isFocused, username: true }))}
                      onBlur={() => setIsFocused(() => ({ ...isFocused, username: false }))}
                    />
                  </div>
                  {formErrors.username && <p className="text-xs text-red-500">{formErrors.username}</p>}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className={styles.input}
                      value={formFields.password}
                      placeholder="••••••••"
                      onChange={handleChange}
                      onFocus={() => setIsFocused(() => ({ ...isFocused, password: true }))}
                      onBlur={() => setIsFocused(() => ({ ...isFocused, password: false }))}
                    />
                  </div>
                  {formErrors.password && <p className="text-xs text-red-500">{formErrors.password}</p>}
                  <button
                    type="submit"
                    className={styles.submitButton}
                  >
                    Sign In
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <a href="#" className="text-xs text-purple-400 hover:text-purple-300">
                    Forgot password?
                  </a>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-700 text-center">
                  <p className="text-xs text-gray-400">
                    Don't have an account?{" "}
                    <a href={`/signUp`} className="text-purple-400 hover:text-purple-300 font-semibold">
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
        )}
    </div>
  );
}
