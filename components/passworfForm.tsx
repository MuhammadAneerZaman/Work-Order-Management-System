"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function PasswordForm({ id, email, type }: { id: string, email: string, type: string }) {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // We will build the backend endpoint for this soon!
    console.log("Setting password for", email, password);
  };

  return (
    <Card className="w-[350px] space-y-9">
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Set your password for {email}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <Button type="submit" className="w-full cursor-pointer">Set Password</Button>
        </form>
      </CardContent>
    </Card>
  );
}