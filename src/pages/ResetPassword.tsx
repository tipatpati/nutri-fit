import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { emailSchema, resetPasswordSchema, type ResetPasswordData } from "@/shared/validation/authSchema";
import { z } from "zod";

const emailRequestSchema = z.object({
  email: emailSchema,
});

type EmailRequestData = z.infer<typeof emailRequestSchema>;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState<boolean | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form for requesting reset link
  const emailForm = useForm<EmailRequestData>({
    resolver: zodResolver(emailRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  // Form for setting new password
  const passwordForm = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const checkRecoveryToken = async () => {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      if (accessToken && type === 'recovery') {
        // Sign out any existing session before showing password reset form
        await supabase.auth.signOut();
        setValidToken(true);
      } else {
        // No token means user navigated directly - show email request form
        setValidToken(false);
      }
    };
    
    checkRecoveryToken();
  }, []);

  const handleSendResetLink = async (data: EmailRequestData) => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      setEmailSent(true);
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte mail pour le lien de réinitialisation.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (data: ResetPasswordData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      toast({
        title: "Mot de passe mis à jour",
        description: "Votre mot de passe a été mis à jour avec succès.",
      });

      // Clean up the URL hash after successful password update
      if (typeof window !== 'undefined' && window.location.hash) {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      }

      // Redirect to home page - user will be automatically signed in
      setTimeout(() => navigate('/'), 1500);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (validToken === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Chargement...</CardTitle>
            <CardDescription>Vérification en cours</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">NutiFit</h1>
          <p className="text-white/80">
            {validToken ? "Réinitialisation du mot de passe" : "Mot de passe oublié"}
          </p>
        </div>

        <Card>
          {validToken ? (
            <>
              <CardHeader>
                <CardTitle>Nouveau mot de passe</CardTitle>
                <CardDescription>
                  Entrez un nouveau mot de passe sécurisé (min. 6 caractères, 1 majuscule, 1 minuscule, 1 chiffre)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nouveau mot de passe</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Minimum 6 caractères"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirmer le mot de passe</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirmez votre mot de passe"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button type="submit" variant="filled" disabled={loading} className="flex-1">
                        {loading ? "Mise à jour..." : "Mettre à jour"}
                      </Button>
                      <Button
                        type="button"
                        variant="outlined"
                        onClick={() => navigate("/auth")}
                        disabled={loading}
                      >
                        Annuler
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader>
                <CardTitle>Réinitialiser le mot de passe</CardTitle>
                <CardDescription>
                  {emailSent
                    ? "Email envoyé ! Vérifiez votre boîte mail."
                    : "Entrez votre email pour recevoir un lien de réinitialisation"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {emailSent ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Un email avec un lien de réinitialisation a été envoyé à votre adresse. Le lien est
                      valide pendant 1 heure.
                    </p>
                    <div className="flex gap-2">
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setEmailSent(false);
                          emailForm.reset();
                        }}
                        className="flex-1"
                      >
                        Renvoyer
                      </Button>
                      <Button variant="outlined" onClick={() => navigate("/auth")}>
                        Retour
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Form {...emailForm}>
                    <form onSubmit={emailForm.handleSubmit(handleSendResetLink)} className="space-y-4">
                      <FormField
                        control={emailForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="votre.email@exemple.com"
                                disabled={loading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-2">
                        <Button type="submit" variant="filled" disabled={loading} className="flex-1">
                          {loading ? "Envoi..." : "Envoyer le lien"}
                        </Button>
                        <Button
                          type="button"
                          variant="outlined"
                          onClick={() => navigate("/auth")}
                          disabled={loading}
                        >
                          Annuler
                        </Button>
                      </div>
                    </form>
                  </Form>
                )}
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;