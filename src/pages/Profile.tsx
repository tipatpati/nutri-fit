import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useUserRole } from "@/hooks/useUserRole";
import { useToast } from "@/hooks/use-toast";
import { PageLayout } from "@/presentation/components/templates/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Shield, Lock, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema, ProfileUpdateData, resetPasswordSchema, ResetPasswordData } from "@/shared/validation/authSchema";

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { roles, loading: roleLoading } = useUserRole();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profileLoading, setProfileLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors },
    setValue,
  } = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors },
    reset: resetPasswordForm,
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }

    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setValue('firstName', data.first_name || '');
          setValue('lastName', data.last_name || '');
          setValue('phone', data.phone || '');
          setValue('dietary_preferences', data.dietary_preferences || []);
          setValue('allergens', data.allergens || []);
          setValue('fitness_goals', data.fitness_goals || []);
          if (data.activity_level && 
              ['sedentary', 'light', 'moderate', 'active', 'very_active'].includes(data.activity_level)) {
            setValue('activity_level', data.activity_level as 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active');
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger votre profil",
          variant: "destructive",
        });
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user, authLoading, navigate, setValue, toast]);

  const onUpdateProfile = async (data: ProfileUpdateData) => {
    if (!user) return;

    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone || null,
          dietary_preferences: data.dietary_preferences,
          allergens: data.allergens,
          fitness_goals: data.fitness_goals,
          activity_level: data.activity_level,
        })
        .eq('user_id', user.id);

      if (error) throw error;

      toast({
        title: "✅ Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const onUpdatePassword = async (data: ResetPasswordData) => {
    setUpdating(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      toast({
        title: "✅ Mot de passe mis à jour",
        description: "Votre mot de passe a été modifié avec succès",
      });
      resetPasswordForm();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (authLoading || profileLoading || roleLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-md-4 py-md-6 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-md-primary" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout className="bg-gradient-to-br from-[#FBF8EF] via-[#FBF8EF] to-[#E5E2D9]">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-['Space_Grotesk'] text-5xl font-bold text-[#2B3210] mb-2">
            Mon Profil
          </h1>
          <p className="text-[#505631] text-lg">
            Gérez vos informations personnelles et vos préférences
          </p>
        </motion.div>

        {/* Account Info Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="glass shadow-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-[#2B3210]">
                    <User className="w-5 h-5 text-[#DE6E27]" />
                    Informations du compte
                  </CardTitle>
                  <CardDescription className="text-[#505631]">
                    Email: {user?.email}
                  </CardDescription>
                </div>
                {roles.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#DE6E27]" />
                    <div className="flex gap-2">
                      {roles.map(role => (
                        <Badge 
                          key={role}
                          className="bg-gradient-to-r from-[#DE6E27] to-[#ff8040] text-white"
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 glass p-1 h-auto">
              <TabsTrigger 
                value="profile"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#DE6E27] data-[state=active]:to-[#ff8040] data-[state=active]:text-white rounded-lg py-3"
              >
                Informations personnelles
              </TabsTrigger>
              <TabsTrigger 
                value="security"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#DE6E27] data-[state=active]:to-[#ff8040] data-[state=active]:text-white rounded-lg py-3"
              >
                <Lock className="h-4 w-4 mr-2" />
                Sécurité
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="glass shadow-xl">
                <CardHeader>
                  <CardTitle className="text-[#2B3210]">Informations personnelles</CardTitle>
                  <CardDescription className="text-[#505631]">
                    Mettez à jour vos informations de profil
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitProfile(onUpdateProfile)} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Prénom</Label>
                        <Input
                          id="firstName"
                          {...registerProfile('firstName')}
                          disabled={updating}
                          className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                        />
                        {profileErrors.firstName && (
                          <p className="text-sm text-error mt-1">{profileErrors.firstName.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          {...registerProfile('lastName')}
                          disabled={updating}
                          className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                        />
                        {profileErrors.lastName && (
                          <p className="text-sm text-error mt-1">{profileErrors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Téléphone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+213 555 123 456"
                        {...registerProfile('phone')}
                        disabled={updating}
                        className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                      />
                      {profileErrors.phone && (
                        <p className="text-sm text-error mt-1">{profileErrors.phone.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      disabled={updating} 
                      className="w-full py-6 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {updating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enregistrement...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Enregistrer les modifications
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card className="glass shadow-xl">
                <CardHeader>
                  <CardTitle className="text-[#2B3210]">Modifier le mot de passe</CardTitle>
                  <CardDescription className="text-[#505631]">
                    Changez votre mot de passe pour sécuriser votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitPassword(onUpdatePassword)} className="space-y-6">
                    <div>
                      <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        {...registerPassword('newPassword')}
                        disabled={updating}
                        className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                      />
                      {passwordErrors.newPassword && (
                        <p className="text-sm text-error mt-1">{passwordErrors.newPassword.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        {...registerPassword('confirmPassword')}
                        disabled={updating}
                        className="glass border-[#E5E2D9] focus:border-[#DE6E27] mt-2"
                      />
                      {passwordErrors.confirmPassword && (
                        <p className="text-sm text-error mt-1">{passwordErrors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      disabled={updating} 
                      className="w-full py-6 bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      {updating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mise à jour...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Changer le mot de passe
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Profile;
