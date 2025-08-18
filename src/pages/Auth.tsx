import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Session } from "@supabase/supabase-js";
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
  // Password reset states
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  useEffect(() => {
    // Set up auth state listener
    const {
      data: {
        subscription
      }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      // Enter reset mode when user comes back from the reset link
      if (event === "PASSWORD_RECOVERY") {
        setIsResetMode(true);
        return; // don't navigate away
      }
      if (session?.user) {
        navigate("/");
      }
    });

    // Check for existing session
    supabase.auth.getSession().then(({
      data: {
        session
      }
    }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Avoid redirect if we're handling a password recovery flow
      const urlHasRecovery = window.location.hash.includes("type=recovery");
      if (session?.user && !urlHasRecovery) {
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
  const handleSendResetLink = async () => {
    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer votre email pour réinitialiser le mot de passe.",
        variant: "destructive"
      });
      return;
    }
    setFormLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/auth`;
      const {
        error
      } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });
      if (error) throw error;
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour le lien de réinitialisation."
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      toast({
        title: "Mot de passe trop court",
        description: "Minimum 6 caractères",
        variant: "destructive"
      });
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Les mots de passe ne correspondent pas",
        variant: "destructive"
      });
      return;
    }
    setFormLoading(true);
    try {
      const {
        error
      } = await supabase.auth.updateUser({
        password: newPassword
      });
      if (error) throw error;
      toast({
        title: "Mot de passe mis à jour",
        description: "Vous pouvez vous connecter."
      });
      setIsResetMode(false);
      setNewPassword("");
      setConfirmNewPassword("");
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setFormLoading(false);
    }
  };
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">NutiFit</h1>
          <p className="text-white/80">Votre partenaire nutrition</p>
        </div>

        {isResetMode ? <Card>
            <CardHeader>
              <CardTitle>Réinitialiser le mot de passe</CardTitle>
              <CardDescription>Entrez un nouveau mot de passe sécurisé</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="new-password">Nouveau mot de passe</Label>
                  <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} disabled={formLoading} />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                  <Input id="confirm-password" type="password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} required minLength={6} disabled={formLoading} />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="w-full" disabled={formLoading}>
                    {formLoading ? "Mise à jour..." : "Mettre à jour"}
                  </Button>
                  <Button type="button" variant="outlined" onClick={() => setIsResetMode(false)} disabled={formLoading}>
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card> : <Card>
            <CardHeader>
              <CardTitle>Authentification</CardTitle>
              <CardDescription>Connectez-vous ou créez un compte</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                </TabsList>

                <TabsContent value="signin">
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <div>
                      <Label htmlFor="signin-email">Email</Label>
                      <Input id="signin-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={formLoading} />
                    </div>
                    <div>
                      <Label htmlFor="signin-password">Mot de passe</Label>
                      <Input id="signin-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={formLoading} />
                    </div>
                    <Button type="submit" variant="filled" disabled={formLoading} className="w-full text-slate-600">
                      {formLoading ? "Connexion..." : "Se connecter"}
                    </Button>
                    <div className="text-sm text-center">
                      <button type="button" onClick={handleSendResetLink} className="underline text-[hsl(var(--md-sys-color-primary))] hover:opacity-80" disabled={formLoading}>
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
                        <Input id="first-name" value={firstName} onChange={e => setFirstName(e.target.value)} required disabled={formLoading} />
                      </div>
                      <div>
                        <Label htmlFor="last-name">Nom</Label>
                        <Input id="last-name" value={lastName} onChange={e => setLastName(e.target.value)} required disabled={formLoading} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input id="signup-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required disabled={formLoading} />
                    </div>
                    <div>
                      <Label htmlFor="signup-password">Mot de passe</Label>
                      <Input id="signup-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required disabled={formLoading} minLength={6} />
                    </div>
                    <Button type="submit" className="w-full" disabled={formLoading}>
                      {formLoading ? "Inscription..." : "S'inscrire"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>}
      </div>
    </div>;
};
export default Auth;