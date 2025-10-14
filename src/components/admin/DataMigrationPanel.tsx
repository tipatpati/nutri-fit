import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Database, CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";
import { migrateAllMeals } from "@/utils/dataMigration";
import { Progress } from "@/components/ui/progress";

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
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" />
          <CardTitle>Migration des Données</CardTitle>
        </div>
        <CardDescription>
          Migrez vos recettes existantes vers le nouveau système d'ingrédients avec calculs automatiques
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Cette migration va:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Analyser vos recettes existantes</li>
              <li>Les associer aux ingrédients de l'inventaire</li>
              <li>Calculer automatiquement les quantités pour les 3 objectifs nutritionnels</li>
              <li>Les recettes déjà migrées seront ignorées</li>
            </ul>
          </AlertDescription>
        </Alert>

        <div className="flex gap-2">
          <Button
            onClick={handleMigration}
            disabled={migrating}
            className="flex-1"
          >
            {migrating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Migration en cours...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Lancer la migration
              </>
            )}
          </Button>
        </div>

        {results && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{results.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      <p className="text-2xl font-bold text-green-600">{results.migrated}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Migrées</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{results.skipped}</p>
                    <p className="text-xs text-muted-foreground">Ignorées</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <p className="text-2xl font-bold text-red-600">{results.failed}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Échouées</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {results.migrated > 0 && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertTitle className="text-green-900">Migration réussie !</AlertTitle>
                <AlertDescription className="text-green-700">
                  {results.migrated} recette(s) ont été migrées avec succès vers le nouveau système.
                  Les quantités pour chaque objectif nutritionnel ont été calculées automatiquement.
                </AlertDescription>
              </Alert>
            )}

            {results.errors.length > 0 && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Erreurs de migration</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    {results.errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DataMigrationPanel;
