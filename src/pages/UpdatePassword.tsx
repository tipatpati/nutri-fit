import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Lock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const passwordResetSchema = z.object({
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type PasswordResetData = z.infer<typeof passwordResetSchema>;

const UpdatePassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState<boolean | null>(null);

  const passwordForm = useForm<PasswordResetData>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  useEffect(() => {
    const checkRecoveryToken = async () => {
      console.log('[UpdatePassword] Component mounted, checking for recovery token');
      console.log('[UpdatePassword] Current URL:', window.location.href);
      console.log('[UpdatePassword] Hash:', window.location.hash);
      
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const type = hashParams.get('type');
      
      console.log('[UpdatePassword] Access token present?', !!accessToken);
      console.log('[UpdatePassword] Type:', type);
      
      if (accessToken && type === 'recovery') {
        console.log('[UpdatePassword] Valid recovery token found, recovery session active');
        setValidToken(true);
      } else {
        console.log('[UpdatePassword] No recovery token found, redirecting to /reset-password');
        // No token means user navigated directly - redirect to forgot password page
        toast({
          variant: "destructive",
          title: "Lien invalide",
          description: "Veuillez demander un nouveau lien de réinitialisation.",
        });
        navigate("/reset-password");
      }
    };

    checkRecoveryToken();
  }, [navigate, toast]);

  const handlePasswordUpdate = async (data: PasswordResetData) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: error.message,
        });
        return;
      }

      // Clean up the hash
      window.history.replaceState(null, "", window.location.pathname);

      toast({
        title: "Succès",
        description: "Votre mot de passe a été réinitialisé avec succès.",
      });

      // Redirect to home page
      setTimeout(() => navigate("/"), 1000);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Une erreur est survenue",
      });
    } finally {
      setLoading(false);
    }
  };

  if (validToken === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#DE6E27]" />
      </div>
    );
  }

  if (!validToken) {
    return null;
  }

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
          <p className="text-[#505631] text-lg">Nouveau mot de passe</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-strong shadow-2xl border-2 border-[#DE6E27]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#2B3210]">
                <Lock className="w-5 h-5 text-[#DE6E27]" />
                Nouveau mot de passe
              </CardTitle>
              <CardDescription className="text-[#505631]">
                Entrez votre nouveau mot de passe
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handlePasswordUpdate)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                            {...field}
                            disabled={loading}
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
                            placeholder="••••••••"
                            className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                            {...field}
                            disabled={loading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white py-6 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Réinitialiser le mot de passe
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdatePassword;
