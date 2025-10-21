import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
const Auth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  useEffect(() => {
    // Set up auth state listener
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        navigate("/");
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      if (session?.user) {
        navigate("/");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      const {
        error
      } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });
      if (error) throw error;
      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer votre compte."
      });
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const {
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      toast({
        title: "Connexion réussie",
        description: "Bienvenue!"
      });
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#DE6E27]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#DE6E27]/10 blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#2B3210]/5 blur-3xl"
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-5xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">
              NutriFit
            </h1>
          </motion.div>
          <p className="text-[#505631] text-lg">Votre partenaire nutrition</p>
        </motion.div>

        {/* Card with Glass Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-strong shadow-2xl border-2 border-[#DE6E27]/20">
            <CardHeader>
              <CardTitle className="text-[#2B3210]">Authentification</CardTitle>
              <CardDescription className="text-[#505631]">Connectez-vous ou créez un compte</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2 glass p-1">
                  <TabsTrigger 
                    value="signin"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#DE6E27] data-[state=active]:to-[#ff8040] data-[state=active]:text-white"
                  >
                    Connexion
                  </TabsTrigger>
                  <TabsTrigger 
                    value="signup"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#DE6E27] data-[state=active]:to-[#ff8040] data-[state=active]:text-white"
                  >
                    Inscription
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <Input 
                        id="signin-email" 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        disabled={formLoading}
                        className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signin-password">Mot de passe</Label>
                      <Input 
                        id="signin-password" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        disabled={formLoading}
                        className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={formLoading} 
                      className="w-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white py-6 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Connexion...
                        </>
                      ) : (
                        "Se connecter"
                      )}
                    </Button>
                    <div className="text-sm text-center">
                      <button 
                        type="button" 
                        onClick={() => navigate('/reset-password')} 
                        className="underline text-[#DE6E27] hover:opacity-80" 
                        disabled={formLoading}
                      >
                        Mot de passe oublié ?
                      </button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="signup">
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="first-name">Prénom</Label>
                        <Input 
                          id="first-name" 
                          value={firstName} 
                          onChange={e => setFirstName(e.target.value)} 
                          required 
                          disabled={formLoading}
                          className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Nom</Label>
                        <Input 
                          id="last-name" 
                          value={lastName} 
                          onChange={e => setLastName(e.target.value)} 
                          required 
                          disabled={formLoading}
                          className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input 
                        id="signup-email" 
                        type="email" 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                        required 
                        disabled={formLoading}
                        className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <Input 
                        id="signup-password" 
                        type="password" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                        required 
                        disabled={formLoading} 
                        minLength={6}
                        className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={formLoading}
                      className="w-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white py-6 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Inscription...
                        </>
                      ) : (
                        "S'inscrire"
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};
export default Auth;