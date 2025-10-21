import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
import { Loader2, Mail, ArrowLeft } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#DE6E27]/10 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#2B3210]/5 blur-3xl"
      />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-2xl">N</span>
            </div>
            <h1 className="font-['Space_Grotesk'] text-5xl font-bold bg-gradient-to-r from-[#2B3210] to-[#DE6E27] bg-clip-text text-transparent">
              NutriFit
            </h1>
          </motion.div>
          <p className="text-[#505631] text-lg">Mot de passe oublié</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-strong shadow-2xl border-2 border-[#DE6E27]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#2B3210]">
                <Mail className="w-5 h-5 text-[#DE6E27]" />
                Réinitialiser le mot de passe
              </CardTitle>
              <CardDescription className="text-[#505631]">
                {emailSent
                  ? "Email envoyé ! Vérifiez votre boîte mail."
                  : "Entrez votre email pour recevoir un lien de réinitialisation"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {emailSent ? (
                <div className="space-y-4">
                  <p className="text-sm text-[#505631]">
                    Un email avec un lien de réinitialisation a été envoyé à votre adresse. Le lien est
                    valide pendant 1 heure.
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEmailSent(false);
                        emailForm.reset();
                      }}
                      className="flex-1 glass border-[#E5E2D9] hover:border-[#DE6E27]"
                    >
                      Renvoyer
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/auth")}
                      className="glass border-[#E5E2D9] hover:border-[#DE6E27]"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
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
                              className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button 
                        type="submit" 
                        disabled={loading} 
                        className="flex-1 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white py-6 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Envoi...
                          </>
                        ) : (
                          "Envoyer le lien"
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate("/auth")}
                        disabled={loading}
                        className="glass border-[#E5E2D9] hover:border-[#DE6E27]"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;