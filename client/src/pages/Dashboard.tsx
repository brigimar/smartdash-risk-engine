import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { RiskScoreCard } from "@/components/RiskScoreCard";
import { AlertCard } from "@/components/AlertCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "wouter";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Package, 
  MessageSquare, 
  Clock,
  Plus,
  RefreshCw,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();

  // Get ML accounts
  const { data: accounts, isLoading: accountsLoading } = trpc.mlAccounts.list.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  // Get risk score for first account (or selected account)
  const selectedAccountId = accounts?.[0]?.id;
  const { data: riskScore, isLoading: riskLoading } = trpc.risk.getScore.useQuery(
    { accountId: selectedAccountId! },
    { enabled: !!selectedAccountId }
  );

  // Get active alerts
  const { data: alerts, isLoading: alertsLoading } = trpc.alerts.getActive.useQuery(
    { accountId: selectedAccountId! },
    { enabled: !!selectedAccountId }
  );

  // Get latest metrics
  const { data: metrics, isLoading: metricsLoading } = trpc.metrics.getLatest.useQuery(
    { accountId: selectedAccountId!, days: 7 },
    { enabled: !!selectedAccountId }
  );

  // Sync metrics mutation
  const syncMutation = trpc.mlAccounts.syncMetrics.useMutation({
    onSuccess: () => {
      toast.success("Métricas sincronizadas correctamente");
      utils.risk.getScore.invalidate();
      utils.alerts.getActive.invalidate();
      utils.metrics.getLatest.invalidate();
    },
    onError: (error) => {
      toast.error(`Error al sincronizar: ${error.message}`);
    }
  });

  // Update alert status mutations
  const updateAlertMutation = trpc.alerts.updateStatus.useMutation({
    onSuccess: () => {
      utils.alerts.getActive.invalidate();
      utils.alerts.getAll.invalidate();
    }
  });

  const handleSyncMetrics = () => {
    if (selectedAccountId) {
      syncMutation.mutate({ accountId: selectedAccountId });
    }
  };

  const handleAcknowledgeAlert = (alertId: number) => {
    updateAlertMutation.mutate({ alertId, status: "acknowledged" });
    toast.success("Alerta reconocida");
  };

  const handleResolveAlert = (alertId: number) => {
    updateAlertMutation.mutate({ alertId, status: "resolved" });
    toast.success("Alerta marcada como resuelta");
  };

  const handleIgnoreAlert = (alertId: number) => {
    updateAlertMutation.mutate({ alertId, status: "ignored" });
    toast.info("Alerta ignorada");
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-8">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Debes iniciar sesión para acceder al dashboard.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (accountsLoading) {
    return (
      <div className="container py-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  if (!accounts || accounts.length === 0) {
    return (
      <div className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenido a SmartDash Risk Engine</CardTitle>
            <CardDescription>
              Conecta tu cuenta de Mercado Libre para comenzar a monitorear tus riesgos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/connect-ml">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Conectar Cuenta de Mercado Libre
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const latestMetric = metrics?.[0];
  const activeAlerts = alerts || [];
  const criticalAlerts = activeAlerts.filter(a => a.severity === "critical").length;
  const highAlerts = activeAlerts.filter(a => a.severity === "high").length;

  return (
    <div className="container py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            {accounts[0]?.nickname || "Tu cuenta de Mercado Libre"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSyncMetrics}
            disabled={syncMutation.isPending}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${syncMutation.isPending ? 'animate-spin' : ''}`} />
            Sincronizar
          </Button>
          <Link href="/analytics">
            <Button variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analíticas
            </Button>
          </Link>
        </div>
      </div>

      {/* Risk Score Card */}
      {riskLoading ? (
        <Skeleton className="h-64" />
      ) : riskScore ? (
        <RiskScoreCard
          score={riskScore.score}
          level={riskScore.level}
          accountName={accounts[0]?.nickname ?? undefined}
        />
      ) : null}

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas Activas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {criticalAlerts} críticas, {highAlerts} altas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasa de Cancelaciones</CardTitle>
            {latestMetric && parseFloat(latestMetric.cancellationRate) > 5 ? (
              <TrendingUp className="h-4 w-4 text-red-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-green-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestMetric ? `${parseFloat(latestMetric.cancellationRate).toFixed(1)}%` : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {latestMetric && parseFloat(latestMetric.cancellationRate) > 5 
                ? "Por encima del umbral (5%)" 
                : "Dentro del rango seguro"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reclamos</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestMetric ? latestMetric.totalClaims : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              {latestMetric ? `${latestMetric.excludedClaims} excluibles` : "Sin datos"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Crítico</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestMetric ? latestMetric.outOfStock : "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Productos sin stock
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Alertas Activas</h2>
          <Link href="/alerts">
            <Button variant="outline" size="sm">Ver todas</Button>
          </Link>
        </div>

        {alertsLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48" />
            <Skeleton className="h-48" />
          </div>
        ) : activeAlerts.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">
                ¡Excelente! No tienes alertas activas en este momento.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {activeAlerts.slice(0, 3).map((alert) => (
              <AlertCard
                key={alert.id}
                id={alert.id}
                type={alert.type}
                severity={alert.severity}
                title={alert.title}
                description={alert.description}
                actionRequired={alert.actionRequired ?? ""}
                aiSuggestion={alert.aiSuggestion ?? undefined}
                status={alert.status}
                createdAt={alert.createdAt}
                onAcknowledge={handleAcknowledgeAlert}
                onResolve={handleResolveAlert}
                onIgnore={handleIgnoreAlert}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
