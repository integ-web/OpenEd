import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "./AppShell";
import { AppProviders, useAuth, type OpenEdRole } from "./providers";
import { RoleRoute } from "./router";

function RoleProbe() {
  const { role, signUp } = useAuth();
  return (
    <>
      <output aria-label="role">{role}</output>
      <button type="button" onClick={() => void signUp("new@example.com", "password123", "New Learner")}>
        Sign up
      </button>
    </>
  );
}

function seedProfile(role: OpenEdRole) {
  localStorage.setItem(
    "opened.mockProfile",
    JSON.stringify({
      id: "local-dev-user",
      email: `${role}@example.com`,
      full_name: role,
      role,
    }),
  );
}

describe("auth hardening", () => {
  it("public signup creates learner only", async () => {
    render(
      <AppProviders>
        <RoleProbe />
      </AppProviders>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => expect(screen.getByLabelText("role")).toHaveTextContent("learner"));
    expect(JSON.parse(localStorage.getItem("opened.mockProfile") ?? "{}")).toMatchObject({ role: "learner" });
  });

  it("hides the role switcher when the explicit dev flag is absent", async () => {
    vi.stubEnv("VITE_ENABLE_DEV_ROLE_SWITCHER", "false");
    seedProfile("learner");

    render(
      <MemoryRouter>
        <AppProviders>
          <AppShell />
        </AppProviders>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.queryByLabelText("Preview role")).not.toBeInTheDocument());
    vi.unstubAllEnvs();
  });

  it("blocks learners from educator routes", async () => {
    seedProfile("learner");

    render(
      <MemoryRouter initialEntries={["/educator"]}>
        <AppProviders>
          <Routes>
            <Route element={<RoleRoute allowed={["educator", "opened_team"]} />}>
              <Route path="/educator" element={<div>Educator Studio</div>} />
            </Route>
            <Route path="/learn" element={<div>Learner Dashboard</div>} />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText("Learner Dashboard")).toBeInTheDocument());
    expect(screen.queryByText("Educator Studio")).not.toBeInTheDocument();
  });

  it("blocks educators from team routes", async () => {
    seedProfile("educator");

    render(
      <MemoryRouter initialEntries={["/team"]}>
        <AppProviders>
          <Routes>
            <Route element={<RoleRoute allowed={["opened_team"]} />}>
              <Route path="/team" element={<div>Team Console</div>} />
            </Route>
            <Route path="/learn" element={<div>Learner Dashboard</div>} />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText("Learner Dashboard")).toBeInTheDocument());
    expect(screen.queryByText("Team Console")).not.toBeInTheDocument();
  });

  it("persists multiple mock users in localStorage and resolves them on sign in", async () => {
    localStorage.removeItem("opened.mockUsers");
    localStorage.removeItem("opened.mockProfile");

    function AuthTestComponent() {
      const { signUp, signIn, profile, signOut } = useAuth();
      return (
        <div>
          <output aria-label="name">{profile?.full_name ?? "No Name"}</output>
          <output aria-label="role">{profile?.role ?? "No Role"}</output>
          <button type="button" onClick={() => void signUp("jane@example.com", "password", "Jane Doe")}>
            Sign up Jane
          </button>
          <button type="button" onClick={() => void signIn("jane@example.com", "password")}>
            Sign in Jane
          </button>
          <button type="button" onClick={() => void signIn("john@example.com", "password")}>
            Sign in John
          </button>
          <button type="button" onClick={() => void signOut()}>
            Sign out
          </button>
        </div>
      );
    }

    render(
      <AppProviders>
        <AuthTestComponent />
      </AppProviders>,
    );

    expect(screen.getByLabelText("name")).toHaveTextContent("No Name");

    await userEvent.click(screen.getByRole("button", { name: "Sign up Jane" }));
    await waitFor(() => expect(screen.getByLabelText("name")).toHaveTextContent("Jane Doe"));
    expect(screen.getByLabelText("role")).toHaveTextContent("learner");

    const usersList = JSON.parse(localStorage.getItem("opened.mockUsers") ?? "[]");
    expect(usersList).toContainEqual(
      expect.objectContaining({
        email: "jane@example.com",
        full_name: "Jane Doe",
        role: "learner",
      })
    );

    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    await waitFor(() => expect(screen.getByLabelText("name")).toHaveTextContent("No Name"));

    await userEvent.click(screen.getByRole("button", { name: "Sign in John" }));
    await waitFor(() => expect(screen.getByLabelText("name")).toHaveTextContent("john"));
    expect(screen.getByLabelText("role")).toHaveTextContent("learner");

    const updatedUsersList = JSON.parse(localStorage.getItem("opened.mockUsers") ?? "[]");
    expect(updatedUsersList).toContainEqual(
      expect.objectContaining({
        email: "john@example.com",
        full_name: "john",
        role: "learner",
      })
    );

    await userEvent.click(screen.getByRole("button", { name: "Sign out" }));
    await waitFor(() => expect(screen.getByLabelText("name")).toHaveTextContent("No Name"));

    await userEvent.click(screen.getByRole("button", { name: "Sign in Jane" }));
    await waitFor(() => expect(screen.getByLabelText("name")).toHaveTextContent("Jane Doe"));
  });
});
