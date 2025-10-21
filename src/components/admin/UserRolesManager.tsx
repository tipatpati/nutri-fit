import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UserPlus, Trash2 } from 'lucide-react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type UserRole = 'admin' | 'owner' | 'cook' | 'delivery_driver' | 'support';

const UserRolesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');

  // Fetch all users with their roles
  const { data: usersWithRoles, isLoading } = useQuery({
    queryKey: ['users-with-roles'],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('user_id, email, first_name, last_name')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('active', true);

      if (rolesError) throw rolesError;

      return profiles?.map(profile => ({
        ...profile,
        roles: roles?.filter(r => r.user_id === profile.user_id).map(r => r.role) || []
      })) || [];
    }
  });

  // Mutation to assign role
  const assignRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: UserRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role,
          active: true
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
      toast({
        title: 'Rôle assigné',
        description: 'Le rôle a été assigné avec succès'
      });
      setSelectedUser('');
      setSelectedRole('');
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  // Mutation to remove role
  const removeRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: UserRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .update({ active: false })
        .eq('user_id', userId)
        .eq('role', role);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-roles'] });
      toast({
        title: 'Rôle retiré',
        description: 'Le rôle a été retiré avec succès'
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  const handleAssignRole = () => {
    if (selectedUser && selectedRole) {
      assignRoleMutation.mutate({ userId: selectedUser, role: selectedRole as UserRole });
    }
  };

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      admin: 'bg-error/20 text-error border-error',
      owner: 'bg-[#7c3aed]/20 text-[#7c3aed] border-[#7c3aed]',
      cook: 'bg-info/20 text-info border-info',
      delivery_driver: 'bg-success/20 text-success border-success',
      support: 'bg-warning/20 text-warning border-warning'
    };
    return colors[role] || 'bg-[#E5E2D9] text-[#505631]';
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'Admin',
      owner: 'Propriétaire',
      cook: 'Cuisinier',
      delivery_driver: 'Livreur',
      support: 'Support'
    };
    return labels[role] || role;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-md-primary" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="glass-strong rounded-3xl shadow-xl border-2 border-[#DE6E27]/20">
        <CardHeader className="bg-gradient-to-br from-[#DE6E27]/10 to-[#ff8040]/10 border-b border-[#DE6E27]/20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CardTitle className="font-['Space_Grotesk'] text-3xl font-bold text-[#2B3210]">
              Gestion des Rôles
            </CardTitle>
            <CardDescription className="text-lg text-[#505631] mt-2">
              Assignez et gérez les permissions utilisateurs
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border-2 border-[#E5E2D9] mb-8"
          >
            <h3 className="font-['Space_Grotesk'] text-xl font-bold text-[#2B3210] mb-6 flex items-center gap-2">
              <UserPlus className="w-6 h-6 text-[#DE6E27]" />
              Assigner un Rôle
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] rounded-xl py-6">
                  <SelectValue placeholder="Sélectionner un utilisateur" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-2 border-[#DE6E27]/30">
                  {usersWithRoles?.map((user) => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center text-white font-bold text-sm">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </div>
                        <span>{user.first_name} {user.last_name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <SelectTrigger className="glass-strong border-2 border-[#E5E2D9] focus:border-[#DE6E27] rounded-xl py-6">
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent className="glass-strong border-2 border-[#DE6E27]/30">
                  {[
                    { value: 'admin', label: 'Admin', icon: '👑' },
                    { value: 'owner', label: 'Propriétaire', icon: '🏢' },
                    { value: 'cook', label: 'Cuisinier', icon: '👨‍🍳' },
                    { value: 'delivery_driver', label: 'Livreur', icon: '🚚' },
                    { value: 'support', label: 'Support', icon: '💬' }
                  ].map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex items-center gap-2">
                        <span>{role.icon}</span>
                        <span>{role.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button 
                onClick={handleAssignRole}
                disabled={!selectedUser || !selectedRole || assignRoleMutation.isPending}
                className="bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 font-semibold py-6"
              >
                {assignRoleMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Assigner le Rôle
                  </>
                )}
              </Button>
            </div>
          </motion.div>

          <div className="glass-strong rounded-2xl overflow-hidden border-2 border-[#E5E2D9]">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#E5E2D9]/50 hover:bg-[#E5E2D9]/50">
                  <TableHead className="font-bold text-[#2B3210]">Utilisateur</TableHead>
                  <TableHead className="font-bold text-[#2B3210]">Email</TableHead>
                  <TableHead className="font-bold text-[#2B3210]">Rôles</TableHead>
                  <TableHead className="font-bold text-[#2B3210]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usersWithRoles?.map((user, idx) => (
                  <motion.tr
                    key={user.user_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-[#DE6E27]/5 transition-colors duration-200 border-b border-[#E5E2D9]"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center text-white font-bold">
                          {user.first_name?.[0]}{user.last_name?.[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-[#2B3210]">
                            {user.first_name} {user.last_name}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#505631]">{user.email}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        {user.roles.length > 0 ? (
                          user.roles.map((role) => (
                            <Badge 
                              key={role} 
                              className={cn(
                                "font-bold",
                                getRoleBadgeColor(role)
                              )}
                            >
                              {getRoleLabel(role)}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-sm text-[#505631] italic">Aucun rôle</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {user.roles.map((role) => (
                          <Button
                            key={role}
                            variant="outline"
                            size="sm"
                            onClick={() => removeRoleMutation.mutate({ userId: user.user_id, role: role as UserRole })}
                            disabled={removeRoleMutation.isPending}
                            className="hover:bg-error/10 hover:border-error hover:text-error"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ))}
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRolesManager;
