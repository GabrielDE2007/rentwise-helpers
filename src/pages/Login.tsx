
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: FormValues) {
    setError(null);
    setIsSubmitting(true);
    
    try {
      await login(data.email, data.password);
      toast({
        title: "Login successful",
        description: "Welcome back to RentWise Helpers!",
      });
      navigate('/');
    } catch (err: any) {
      setError(getFirebaseErrorMessage(err.code));
    } finally {
      setIsSubmitting(false);
    }
  }

  function getFirebaseErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Invalid email or password';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later';
      default:
        return 'An error occurred during login. Please try again';
    }
  }

  return (
    <div className="container max-w-md mx-auto py-16 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Log in to RentWise Helpers</h1>
        <p className="text-muted-foreground mt-2">
          Enter your credentials to access your account
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </Button>

          <div className="text-center">
            <Link to="/signup" className="text-primary hover:underline text-sm">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
