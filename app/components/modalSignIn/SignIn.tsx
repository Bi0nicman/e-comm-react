"use client";
import { useState } from "react";
import styles from "./SignIn.module.css";

export function SignInModal() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isOpened = isHovered || isFocused;

  return (

    console.log("isHovered:", isHovered, "isFocused:", isFocused, "isOpened:", isOpened),
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

              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={styles.input}
                    placeholder="your@email.com"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={styles.input}
                    placeholder="••••••••"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                  />
                </div>

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
                  <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold">
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
