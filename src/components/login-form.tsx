"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { validateAttendance } from "@/lib/validateAttendance"
import { Spinner } from "./ui/spinner"

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate()

  const [email, setEmail] = useState("student@example.com")
  const [password, setPassword] = useState("123456")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const mockUser = {
    email: "student@example.com",
    password: "123456",
    name: "Patrick Budiman",
    nim: "25741540221",
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email === mockUser.email && password === mockUser.password) {
      setLoading(true);
      localStorage.setItem("user", JSON.stringify(mockUser))

      const result = await validateAttendance()
      localStorage.setItem("attendanceStatus", JSON.stringify(result));

      setLoading(false);
      navigate("/")
    } else {
      setError("Email atau password salah.")
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <Field>
                <Button type="submit" className="w-full bg-teal-800 hover:bg-teal-700" disabled={loading}>
                  Login
                  {loading &&
                    <Spinner />
                  }
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
