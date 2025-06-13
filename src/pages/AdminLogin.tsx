import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User, ChefHat, Truck } from "lucide-react";

type UserRole = "owner" | "cook" | "delivery";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const roles = [
    {
      id: "owner" as UserRole,
      title: "Propriétaire",
      description: "Accès complet au système",
      icon: User,
      color: "bg-[#113B39]"
    },
    {
      id: "cook" as UserRole,
      title: "Cuisinier",
      description: "Gestion des menus et commandes",
      icon: ChefHat,
      color: "bg-[#FF4D00]"
    },
    {
      id: "delivery" as UserRole,
      title: "Livreur",
      description: "Gestion des livraisons",
      icon: Truck,
      color: "bg-[#113B39]"
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { role: selectedRole, email, password });
    
    // Redirect to appropriate dashboard based on role
    if (selectedRole) {
      navigate(`/admin/${selectedRole}`);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleBack = () => {
    setSelectedRole(null);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: '#113B39' }}>
            NutiFit
          </h1>
          <p className="text-gray-600 mt-2">Administration</p>
        </div>

        {!selectedRole ? (
          /* Role Selection */
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">
              Sélectionnez votre rôle
            </h2>
            {roles.map((role) => {
              const IconComponent = role.icon;
              return (
                <Card
                  key={role.id}
                  className="cursor-pointer transition-all hover:shadow-lg hover:scale-105 border-2 hover:border-[#113B39]"
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`${role.color} p-3 rounded-full`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{role.title}</h3>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          /* Login Form */
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const role = roles.find(r => r.id === selectedRole);
                    const IconComponent = role?.icon;
                    return (
                      <>
                        <div className={`${role?.color} p-2 rounded-full`}>
                          {IconComponent && <IconComponent className="w-5 h-5 text-white" />}
                        </div>
                        <div>
                          <CardTitle className="text-[#113B39]">
                            {roles.find(r => r.id === selectedRole)?.title}
                          </CardTitle>
                          <CardDescription>
                            Connectez-vous à votre compte
                          </CardDescription>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="text-gray-500 hover:text-[#113B39]"
                >
                  Retour
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@nutrifit.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#FF4D00] hover:bg-[#FF4D00]/90 text-white"
                >
                  Se connecter
                </Button>
              </form>
              <div className="mt-4 text-center">
                <a
                  href="#"
                  className="text-sm text-[#113B39] hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
