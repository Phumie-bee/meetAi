"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onError: () => {
          window.alert("Something went Wrong");
        },
        onSuccess: () => {
          window.alert("Success!");
        },
      }
    );
  };
  const handleSubmit = () => {
    authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onError: () => {
          window.alert("Something went Wrong");
        },
        onSuccess: () => {
          window.alert("Success!");
        },
      }
    );
  };
  if (session) {
    return (
      <div className="flex flex-col gap-y-3 mx-5 mt-5">
        <p>Logged in as {session.user.name}</p>
        <Button
          onClick={() => authClient.signOut()}
          className="bg-gray-800 text-white p-2 rounded-xl"
        >
          Sign Out
        </Button>
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col gap-y-3 mx-5 mt-5">
        <Input
          className=" p-2 rounded-xl"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className=" p-2 rounded-xl"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-gray-800 text-white p-2 rounded-xl"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div className="flex flex-col gap-y-3 mx-5 mt-5">
        <Input
          className=" p-2 rounded-xl"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          className=" p-2 rounded-xl"
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          className=" p-2 rounded-xl"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-gray-800 text-white p-2 rounded-xl"
          onClick={handleSubmit}
        >
          Create User
        </button>
      </div>
    </div>
  );
}
