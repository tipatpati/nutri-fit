
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, User, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock credentials for testing
  const mockCredentials = {
    owner: { email: "owner@nutrifit.com", password: "owner123" },
    cook: { email: "cook@nutrifit.com", password: "cook123" },
    delivery: { email: "delivery@nutrifit.com", password: "delivery123" }
  };

  const roles = [
    {
      id: "owner",
      title: "Propriétaire",
      description: "Accès complet à toutes les fonctionnalités",
      icon: User,
      color: "bg-[#113B39]"
    },
    {
      id: "cook",
      title: "Cuisinier",
      description: "Gestion des commandes et préparation",
      icon: ChefHat,
      color: "bg-[#FF4D00]"
    },
    {
      id: "delivery",
      title: "Livreur",
      description: "Gestion des livraisons",
      icon: Truck,
      color: "bg-green-600"
    }
  ];

  const handleRoleSelect = (roleId: string) => {
    setSelectedRole(roleId);
    const mockCred = mockCredentials[roleId as keyof typeof mockCredentials];
    setEmail(mockCred.email);
    setPassword(mockCred.password);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Login attempt:", { role: selectedRole, email, password });

    if (!selectedRole) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un rôle",
        variant: "destructive"
      });
      return;
    }

    const mockCred = mockCredentials[selectedRole as keyof typeof mockCredentials];
    
    if (email === mockCred.email && password === mockCred.password) {
      toast({
        title: "Connexion réussie",
        description: `Bienvenue ${selectedRole}!`
      });
      
      // Navigate to appropriate dashboard
      navigate(`/admin/${selectedRole}`);
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive"
      });
    }
  };

  const goBack = () => {
    setSelectedRole(null);
    setEmail("");
    setPassword("");
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#113B39] to-[#FF4D00] flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">NutiFit Admin</h1>
            <p className="text-white/80">Choisissez votre rôle pour accéder au dashboard</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card 
                key={role.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-[#113B39]">{role.title}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Sélectionner
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Données de test:<br/>
              Owner: owner@nutrifit.com / owner123<br/>
              Cook: cook@nutrifit.com / cook123<br/>
              Delivery: delivery@nutrifit.com / delivery123
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#113B39] to-[#FF4D00] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className={`w-16 h-16 ${selectedRoleData?.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {selectedRoleData && <selectedRoleData.icon className="w-8 h-8 text-white" />}
          </div>
          <CardTitle className="text-[#113B39]">Connexion {selectedRoleData?.title}</CardTitle>
          <CardDescription>Entrez vos identifiants pour accéder au dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={goBack} className="flex-1">
                Retour
              </Button>
              <Button type="submit" className="flex-1 bg-[#113B39] hover:bg-[#113B39]/90">
                Se connecter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
