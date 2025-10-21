import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { migrateAllMeals } from "@/utils/dataMigration";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const DataMigrationPanel = () => {
  const [migrating, setMigrating] = useState(false);
  const [results, setResults] = useState<{
    total: number;
    migrated: number;
    skipped: number;
    failed: number;
    errors: string[];
  } | null>(null);

  const handleMigration = async () => {
    setMigrating(true);
    setResults(null);

    try {
      const migrationResults = await migrateAllMeals();
      setResults(migrationResults);
    } catch (error) {
      console.error('Migration failed:', error);
      setResults({
        total: 0,
        migrated: 0,
        skipped: 0,
        failed: 1,
        errors: [String(error)],
      });
    } finally {
      setMigrating(false);
    }
  };

  return (
    <Card className="glass-strong rounded-3xl shadow-xl border-2 border-[#DE6E27]/20">
      <CardHeader className="bg-gradient-to-br from-[#DE6E27]/10 to-[#ff8040]/10 border-b border-[#DE6E27]/20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#DE6E27] to-[#ff8040] flex items-center justify-center">
            <Database className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="font-['Space_Grotesk'] text-2xl font-bold text-[#2B3210]">
              Migration des Données
            </CardTitle>
            <CardDescription className="text-[#505631]">
              Migrez vos recettes vers le nouveau système
            </CardDescription>
          </div>
        </motion.div>
      </CardHeader>
      <CardContent className="p-8 space-y-6">
        <Alert className="glass border-2 border-warning/30 bg-warning/5">
          <AlertTriangle className="h-5 w-5 text-warning" />
          <AlertTitle className="font-bold text-[#2B3210]">Important</AlertTitle>
          <AlertDescription className="text-[#505631]">
            Cette migration va:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Analyser vos recettes existantes</li>
              <li>Les associer aux ingrédients de l'inventaire</li>
              <li>Calculer automatiquement les quantités pour les 3 objectifs nutritionnels</li>
              <li>Les recettes déjà migrées seront ignorées</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Button
          onClick={handleMigration}
          disabled={migrating}
          className="w-full bg-gradient-to-br from-[#DE6E27] to-[#ff8040] text-white py-6 rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 font-semibold text-lg"
        >
          {migrating ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Migration en cours...
            </>
          ) : (
            <>
              <Database className="mr-2 h-5 w-5" />
              Lancer la Migration
            </>
          )}
        </Button>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total', value: results.total, color: '#2B3210' },
                { label: 'Migrées', value: results.migrated, icon: CheckCircle2, color: '#4CAF50' },
                { label: 'Ignorées', value: results.skipped, color: '#29B6F6' },
                { label: 'Échouées', value: results.failed, icon: XCircle, color: '#dc2626' }
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="glass-strong rounded-2xl border-2 border-transparent hover:border-[#DE6E27]/30 transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      {stat.icon && <stat.icon className="w-6 h-6 mx-auto mb-2" style={{ color: stat.color }} />}
                      <p className="font-['Space_Grotesk'] text-3xl font-bold" style={{ color: stat.color }}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-[#505631] mt-1">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {results.migrated > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Alert className="glass border-2 border-success/30 bg-success/5">
                  <CheckCircle2 className="h-5 w-5 text-success" />
                  <AlertTitle className="font-bold text-[#2B3210]">Migration réussie !</AlertTitle>
                  <AlertDescription className="text-[#505631]">
                    {results.migrated} recette(s) ont été migrées avec succès vers le nouveau système.
                    Les quantités pour chaque objectif nutritionnel ont été calculées automatiquement.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {results.errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Alert className="glass border-2 border-error/30 bg-error/5">
                  <XCircle className="h-5 w-5 text-error" />
                  <AlertTitle className="font-bold text-[#2B3210]">Erreurs de migration</AlertTitle>
                  <AlertDescription className="text-[#505631]">
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      {results.errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataMigrationPanel;
