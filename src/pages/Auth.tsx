import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import Logo from '@/components/Logo';
import Footer from '@/components/Footer';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    checkAuth();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "مرحباً بك في لوحة التحكم",
        });
        
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "تم إنشاء الحساب بنجاح",
          description: "يرجى التحقق من بريدك الإلكتروني",
        });
      }
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "خطأ",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dotted-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <Logo />
          </div>

          {/* Auth Form */}
          <Card className="w-full">
            <CardHeader className="text-center">
              <CardTitle className="arabic-title">
                {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
              </CardTitle>
              <p className="arabic-text text-muted-foreground mt-2">
                {isLogin 
                  ? 'قم بتسجيل الدخول للوصول إلى لوحة التحكم' 
                  : 'أنشئ حساباً جديداً للوصول إلى لوحة التحكم'
                }
              </p>
            </CardHeader>
            
            <CardContent>
              {error && (
                <Alert className="mb-4" variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="arabic-text text-sm font-medium mb-2 block">
                    البريد الإلكتروني
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@alwaslsaudi.com"
                    required
                    className="w-full"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <label className="arabic-text text-sm font-medium mb-2 block">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full pr-10"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full arabic-text"
                  disabled={loading}
                >
                  {loading ? (
                    'جاري التحميل...'
                  ) : (
                    <>
                      <LogIn className="w-4 h-4 ml-2" />
                      {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="arabic-text text-sm text-primary hover:underline"
                >
                  {isLogin 
                    ? 'ليس لديك حساب؟ أنشئ حساباً جديداً' 
                    : 'لديك حساب بالفعل؟ سجل الدخول'
                  }
                </button>
              </div>
            </CardContent>
          </Card>
          
          {/* Back to Home */}
          <div className="text-center mt-6">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="arabic-text"
            >
              العودة للصفحة الرئيسية
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Auth;