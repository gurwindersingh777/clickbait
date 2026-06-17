"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authClient } from "@/lib/auth-client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { GitHubIcon, GoogleIcon } from "@/utils/icons"
import { LoginFormValues, loginSchema } from "@/schemas/authSchema"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"


export default function LoginPage() {
  const router = useRouter()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const signInGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard"
    })
  }

  const signInGithub = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard"
    })
  }

  const onSubmit = async (values: LoginFormValues) => {
     await authClient.signIn.email({
      email: values.email,
      password: values.password
    }, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (ctx) => {
        console.log(ctx.error)
        toast.error(ctx.error.message)
      },
    })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-900 px-4 py-4 text-zinc-100">
      <div className="w-full max-w-md ">
        <Card className="border-0 bg-transparent shadow-none">
          <CardHeader className="pb-5 text-center">
            <Link href="/" className="text-lg font-medium tracking-tight text-white">ClickBait</Link>
            <CardTitle className="mt-4 text-2xl font-semibold tracking-tight text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400">Sign in to your account</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-0">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-zinc-200" htmlFor="email">Email</Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="h-10 border-zinc-700 bg-zinc-800 text-white"
                  required
                />

                {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-200" htmlFor="password">Password</Label>

                  <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300">
                    Forgot password?
                  </Link>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className="h-10 border-zinc-700 bg-zinc-800 text-white"
                  required
                />

                {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
              </div>


              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-full bg-violet-600 hover:bg-violet-700"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-800" />
              </div>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-zinc-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={signInGoogle}
                className="h-10 w-full gap-2 border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
              >
                <GoogleIcon />
                Continue with Google
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={signInGithub}
                className="h-10 w-full gap-2 border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 hover:text-white"
              >
                <GitHubIcon />
                Continue with GitHub
              </Button>
            </div>

            <div className="pt-2 text-center">
              <p className="text-sm text-zinc-400">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-medium text-violet-400 hover:text-violet-300"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
