import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { emailSchema } from "@/shared/validation/authSchema";
import { z } from "zod";

const emailRequestSchema = z.object({
  email: emailSchema,
});

type EmailRequestData = z.infer<typeof emailRequestSchema>;

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const emailForm = useForm<EmailRequestData>({
    resolver: zodResolver(emailRequestSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSendResetLink = async (data: EmailRequestData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: 'https://nutri-fit.net/update-password',
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


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">NutiFit</h1>
          <p className="text-white/80">Mot de passe oublié</p>
        </div>

        <Card>
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
        </Card>
      </div>
    </div>
  );
};

export default ResetPassword;