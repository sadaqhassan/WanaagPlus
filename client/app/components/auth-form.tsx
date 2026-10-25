"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type AuthMode = "login" | "signup";

function getErrorMessage(payload: unknown): string {
  if (typeof payload === "object" && payload !== null && "message" in payload) {
    const { message } = payload;
    if (typeof message === "string") return message;
    if (Array.isArray(message) && message.every((item) => typeof item === "string")) {
      return message.join(". ");
    }
  }

  return "Something went wrong. Please try again.";
}

export default function AuthForm() {
  const [mode, setMode] = useState<AuthMode>("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      ...(isSignup ? { name: String(formData.get("name") ?? "").trim() } : {}),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
    };

    try {
      const response = await fetch(`/api/auth/${mode === "signup" ? "signin" : "login"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result: unknown = await response.json();

      if (!response.ok) {
        setFeedback({ type: "error", text: getErrorMessage(result) });
        return;
      }

      const name =
        typeof result === "object" && result !== null && "name" in result && typeof result.name === "string"
          ? result.name
          : payload.name;
      setFeedback({
        type: "success",
        text: isSignup
          ? "Your account is ready. Welcome to WanaagPlus!"
          : `Welcome back${name ? `, ${name}` : ""}! You’re signed in.`,
      });
      form.reset();
    } catch {
      setFeedback({
        type: "error",
        text: "We couldn’t reach the authentication service. Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setFeedback(null);
  }

  return (
    <div className="auth-card">
      <div className="auth-heading">
        <span className="eyebrow">{isSignup ? "BEGIN YOUR JOURNEY" : "GOOD TO SEE YOU"}</span>
        <h1>{isSignup ? "Create your account" : "Welcome back"}</h1>
        <p>
          {isSignup
            ? "A calmer, more intentional day starts here."
            : "Pick up where you left off."}
        </p>
      </div>

      <div className="auth-tabs" role="tablist" aria-label="Account action">
        <button
          className={`auth-tab${!isSignup ? " is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={!isSignup}
          disabled={isSubmitting}
          onClick={() => changeMode("login")}
        >
          Sign in
        </button>
        <button
          className={`auth-tab${isSignup ? " is-active" : ""}`}
          type="button"
          role="tab"
          aria-selected={isSignup}
          disabled={isSubmitting}
          onClick={() => changeMode("signup")}
        >
          Create account
        </button>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignup && (
          <label className="form-field">
            <span>Your name</span>
            <input
              autoComplete="name"
              name="name"
              placeholder="e.g. Amina Hassan"
              required
              type="text"
            />
          </label>
        )}

        <label className="form-field">
          <span>Email address</span>
          <input
            autoComplete="email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>

        <label className="form-field">
          <span>Password</span>
          <span className="password-input">
            <input
              autoComplete={isSignup ? "new-password" : "current-password"}
              minLength={1}
              name="password"
              placeholder="Enter your password"
              required
              type={showPassword ? "text" : "password"}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="password-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              type="button"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </span>
        </label>

        {feedback && (
          <p
            aria-live="polite"
            className={`form-feedback ${feedback.type}`}
            role={feedback.type === "error" ? "alert" : "status"}
          >
            {feedback.text}
          </p>
        )}

        <button className="submit-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <>
              <span className="button-spinner" aria-hidden="true" />
              {isSignup ? "Creating your account…" : "Signing you in…"}
            </>
          ) : (
            <>
              {isSignup ? "Create my account" : "Sign in to your account"}
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </form>

      <p className="mode-switch">
        {isSignup ? "Already have an account?" : "New to WanaagPlus?"}{" "}
        <button type="button" onClick={() => changeMode(isSignup ? "login" : "signup")}>
          {isSignup ? "Sign in" : "Create an account"}
        </button>
      </p>
      <p className="privacy-note">
        <span aria-hidden="true">◇</span> Your personal information stays private.
      </p>
    </div>
  );
}
