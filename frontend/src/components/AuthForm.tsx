"use client";

import React, { useState, useRef } from "react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/toast-provider";
import { getAuthErrorMessage } from "@/lib/auth-errors";

interface AuthFormProps {
  type: "login" | "signup";
}

interface InputFieldProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  focusedField: string | null;
  onFocus: () => void;
  onBlur: () => void;
}

const InputField = React.memo(({ icon: Icon, label, type, placeholder, value, onChange, autoComplete, inputRef, focusedField, onFocus, onBlur }: InputFieldProps) => (
  <div className="relative group mb-4 animate-fade-in-up">
    <label htmlFor={label} className="sr-only">{label}</label>
    <div className="relative flex items-center">
      <Icon className={`absolute left-3 h-5 w-5 transition-colors duration-300 ${focusedField === label ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`} />
      <input
        ref={inputRef}
        id={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required
        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
      />
    </div>
  </div>
));

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  focusedField: string | null;
  onFocus: () => void;
  onBlur: () => void;
  showPassword: boolean;
  onToggleShowPassword: () => void;
}

const PasswordField = React.memo(({ label, placeholder, value, onChange, autoComplete, inputRef, focusedField, onFocus, onBlur, showPassword, onToggleShowPassword }: PasswordFieldProps) => (
  <div className="relative group mb-4 animate-fade-in-up">
    <label htmlFor={label} className="sr-only">{label}</label>
    <div className="relative flex items-center">
      <Lock className={`absolute left-3 h-5 w-5 transition-colors duration-300 ${focusedField === label ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'}`} />
      <input
        ref={inputRef}
        id={label}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required
        className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 focus:outline-none focus:bg-white dark:focus:bg-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 hover:border-gray-300 dark:hover:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
      />
      <button
        type="button"
        onClick={onToggleShowPassword}
        className="absolute right-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none transition-colors duration-300"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  </div>
));

export function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { showToast } = useToast();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const isLogin = type === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error: authError } = await signIn.email({
          email,
          password,
        });
        if (authError) throw authError;
        showToast("Welcome back! Redirecting to dashboard...", "success");
        setTimeout(() => router.push("/dashboard"), 800);
      } else {
        const { error: authError } = await signUp.email({
          email,
          password,
          name,
        });
        if (authError) throw authError;
        showToast("Account created! Redirecting to login...", "success");
        setTimeout(() => router.push("/login?message=Signup successful. Please log in."), 800);
      }
    } catch (err: unknown) {
      const errorMessage = getAuthErrorMessage(err);
      setError(errorMessage);
      showToast(errorMessage, "error");
      setLoading(false);
    }
  };

  const handleFocus = (label: string) => {
    setFocusedField(label);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  return (
    <div className="w-full space-y-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up">
      {message && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg relative text-sm text-center animate-pulse-slow" role="alert">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {message}
          </div>
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        {!isLogin && (
          <InputField
            icon={User}
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            autoComplete="name"
            inputRef={nameInputRef}
            focusedField={focusedField}
            onFocus={() => handleFocus("Full Name")}
            onBlur={handleBlur}
          />
        )}

        <InputField
          icon={Mail}
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          autoComplete="email"
          inputRef={emailInputRef}
          focusedField={focusedField}
          onFocus={() => handleFocus("Email")}
          onBlur={handleBlur}
        />

        <PasswordField
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          autoComplete="current-password"
          inputRef={passwordInputRef}
          focusedField={focusedField}
          onFocus={() => handleFocus("Password")}
          onBlur={handleBlur}
          showPassword={showPassword}
          onToggleShowPassword={() => setShowPassword(!showPassword)}
        />

        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm font-medium bg-red-50 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-2 animate-shake">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <button
          ref={submitButtonRef}
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6 animate-fade-in-up group"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin h-5 w-5" />
              <span>{isLogin ? "Signing in..." : "Creating account..."}</span>
            </>
          ) : (
            <>
              <span>{isLogin ? "Sign in" : "Create account"}</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            href={isLogin ? "/signup" : "/login"}
            className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors duration-200 inline-flex items-center gap-1"
          >
            {isLogin ? "Sign up" : "Sign in"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </p>
      </div>
    </div>
  );
}
