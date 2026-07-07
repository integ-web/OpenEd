import { FormEvent, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/providers";
import { sanitizeRedirectTarget } from "../../shared/utils/authRedirects";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { SignIn, SignUp } from "@clerk/clerk-react";

type AuthPageProps = {
  mode: "login" | "signup";
};

export function AuthPage({ mode }: AuthPageProps) {
  const { isAuthenticated, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const from = sanitizeRedirectTarget((location.state as { from?: { pathname?: string } } | null)?.from?.pathname);

  const isClerkActive = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  if (isClerkActive) {
    return (
      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-background">
        {mode === "login" ? (
          <SignIn routing="path" path="/login" signUpUrl="/signup" />
        ) : (
          <SignUp routing="path" path="/signup" signInUrl="/login" />
        )}
      </section>
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    const password = String(data.get("password") ?? "");
    const fullName = String(data.get("fullName") ?? "OpenEd learner");

    try {
      if (mode === "signup") {
        await signUp(email, password, fullName);
      } else {
        await signIn(email, password);
      }
      navigate(from, { replace: true });
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : "Auth failed");
    }
  }

  return (
    <section className="flex min-h-[calc(100vh-64px)] items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{mode === "login" ? "Welcome back" : "Join OpenEd"}</CardTitle>
          <CardDescription>
            {mode === "login" ? "Log in to your account" : "Create an account to track your progress"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" placeholder="Your name" required />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" placeholder="At least 8 characters" required />
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            <Button type="submit" className="w-full">
              {mode === "login" ? "Log in" : "Sign up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          {mode === "login" ? (
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
              </Link>
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          )}
          {mode === "login" && (
            <Link to="/forgot-password" className="text-sm text-primary hover:underline mt-2">
              Forgot password?
            </Link>
          )}
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Local browser storage is active. Your session is saved locally.
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
