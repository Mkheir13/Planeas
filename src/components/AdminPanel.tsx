import React, { useState, useEffect } from 'react';
import { 
  Shield, Users, BarChart3, Database, Settings, TrendingUp, 
  Download, Filter, Search, Eye, Trash2, Edit, RefreshCw,
  Globe, Calendar, MapPin, Cpu, AlertTriangle, CheckCircle,
  UserCheck, Activity, Zap, Target, Award, Brain, Home, ArrowLeft,
  PieChart, LineChart, BarChart
} from 'lucide-react';
import { UserProfile, FootprintResult } from '../types';

interface AdminUser {
  id: string;
  profile: UserProfile;
  result: FootprintResult;
  timestamp: string;
  ip: string;
  userAgent: string;
  location?: {
    country: string;
    region: string;
    city: string;
  };
  sessionDuration: number;
  completionRate: number;
}

interface AdminStats {
  totalUsers: number;
  todayUsers: number;
  averageFootprint: number;
  completionRate: number;
  topCountries: Array<{ country: string; count: number; avgFootprint: number }>;
  categoryBreakdown: {
    excellent: number;
    good: number;
    average: number;
    concerning: number;
    critical: number;
  };
  trends: {
    daily: Array<{ date: string; users: number; avgFootprint: number }>;
    monthly: Array<{ month: string; users: number; avgFootprint: number }>;
    hourly: Array<{ hour: string; users: number; avgFootprint: number }>;
  };
  behavioralAnalytics: {
    transportModes: Array<{ mode: string; percentage: number; avgFootprint: number }>;
    dietTypes: Array<{ type: string; percentage: number; avgFootprint: number }>;
    housingTypes: Array<{ type: string; percentage: number; avgFootprint: number }>;
    ageGroups: Array<{ group: string; percentage: number; avgFootprint: number }>;
  };
}

interface SystemHealth {
  apiStatus: 'healthy' | 'warning' | 'error';
  dbStatus: 'healthy' | 'warning' | 'error';
  mlModelStatus: 'healthy' | 'warning' | 'error';
  responseTime: number;
  uptime: string;
  errorRate: number;
  activeUsers: number;
}

interface AdminPanelProps {
  onBackToApp?: () => void;
}

export function AdminPanel({ onBackToApp }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'analytics' | 'system' | 'ml' | 'settings'>('dashboard');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [systemHealth, setSystemHealth] = useState<SystemHealth | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month' | 'all'>('week');
  const [loading, setLoading] = useState(true);

  // Fonction pour revenir à l'application
  const handleBackToApp = () => {
    if (onBackToApp) {
      onBackToApp();
    } else {
      // Fallback: recharger la page
      window.location.reload();
    }
  };

  // Simulation de données réalistes
  useEffect(() => {
    const generateMockData = () => {
      // Génération d'utilisateurs simulés
      const mockUsers: AdminUser[] = Array.from({ length: 1247 }, (_, i) => {
        const categories = ['excellent', 'good', 'average', 'concerning', 'critical'] as const;
        const category = categories[Math.floor(Math.random() * categories.length)];
        const planetsNeeded = category === 'excellent' ? 1.2 + Math.random() * 0.6 :
                             category === 'good' ? 1.8 + Math.random() * 0.7 :
                             category === 'average' ? 2.5 + Math.random() * 0.7 :
                             category === 'concerning' ? 3.2 + Math.random() * 0.8 :
                             3.5 + Math.random() * 1.0;

        const countries = ['France', 'Belgique', 'Suisse', 'Canada', 'Maroc', 'Sénégal'];
        const regions = ['Île-de-France', 'Auvergne-Rhône-Alpes', 'Nouvelle-Aquitaine', 'Occitanie'];
        
        return {
          id: `user_${i + 1}`,
          profile: {
            gender: Math.random() > 0.5 ? 'homme' : 'femme',
            age: 18 + Math.floor(Math.random() * 60),
            relationship: Math.random() > 0.6 ? 'couple' : 'celibataire',
            householdSize: 1 + Math.floor(Math.random() * 5),
            homeArea: 30 + Math.floor(Math.random() * 150),
            heatingType: ['electricite', 'gaz', 'fioul', 'pompe-chaleur'][Math.floor(Math.random() * 4)] as any,
            homeInsulation: ['oui', 'non', 'ne-sais-pas'][Math.floor(Math.random() * 3)] as any,
            ownsCar: Math.random() > 0.3,
            carType: ['essence', 'diesel', 'electrique'][Math.floor(Math.random() * 3)] as any,
            weeklyKm: Math.floor(Math.random() * 500),
            flightFrequency: ['jamais', '1-2', '3-5'][Math.floor(Math.random() * 3)] as any,
            publicTransportUsage: ['jamais', 'parfois', 'souvent', 'toujours'][Math.floor(Math.random() * 4)] as any,
            cruiseFrequency: 'jamais' as any,
            meatMealsPerWeek: Math.floor(Math.random() * 15),
            dailyAnimalProducts: Math.random() > 0.4,
            bioLocalFrequency: ['jamais', 'parfois', 'souvent', 'toujours'][Math.floor(Math.random() * 4)] as any,
            foodWasteFrequency: ['jamais', 'parfois', 'souvent'][Math.floor(Math.random() * 3)] as any,
            clothingFrequency: ['jamais', '1-2-an', '2-3-mois', 'chaque-mois'][Math.floor(Math.random() * 4)] as any,
            buyNewElectronics: Math.random() > 0.6,
            repairFrequency: ['jamais', 'parfois', 'souvent'][Math.floor(Math.random() * 3)] as any,
            secondHandFrequency: ['jamais', 'parfois', 'souvent', 'toujours'][Math.floor(Math.random() * 4)] as any,
            sortWaste: ['oui', 'non', 'partiellement'][Math.floor(Math.random() * 3)] as any,
            trashBagsPerWeek: 1 + Math.floor(Math.random() * 5),
            lowPackagingFrequency: ['jamais', 'parfois', 'souvent', 'toujours'][Math.floor(Math.random() * 4)] as any
          },
          result: {
            planetsNeeded: Math.round(planetsNeeded * 10) / 10,
            category,
            title: category === 'excellent' ? 'Éco-héros galactique' :
                   category === 'good' ? 'Gardien des étoiles' :
                   category === 'average' ? 'Explorateur modéré' :
                   category === 'concerning' ? 'Colonisateur interstellaire' :
                   'Tyran cosmique du CO₂',
            totalScore: Math.random() * 10,
            breakdown: {
              housing: Math.random() * 2.5,
              transport: Math.random() * 4.5,
              food: Math.random() * 2.5,
              consumption: Math.random() * 1.5,
              waste: Math.random() * 1.0
            }
          },
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          location: {
            country: countries[Math.floor(Math.random() * countries.length)],
            region: regions[Math.floor(Math.random() * regions.length)],
            city: ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice'][Math.floor(Math.random() * 5)]
          },
          sessionDuration: 300 + Math.floor(Math.random() * 1200), // 5-25 minutes
          completionRate: 0.7 + Math.random() * 0.3 // 70-100%
        };
      });

      setUsers(mockUsers);

      // Statistiques globales
      const categoryBreakdown = mockUsers.reduce((acc, user) => {
        acc[user.result.category]++;
        return acc;
      }, { excellent: 0, good: 0, average: 0, concerning: 0, critical: 0 });

      const countryStats = mockUsers.reduce((acc, user) => {
        const country = user.location?.country || 'Inconnu';
        if (!acc[country]) {
          acc[country] = { count: 0, totalFootprint: 0 };
        }
        acc[country].count++;
        acc[country].totalFootprint += user.result.planetsNeeded;
        return acc;
      }, {} as Record<string, { count: number; totalFootprint: number }>);

      const topCountries = Object.entries(countryStats)
        .map(([country, data]) => ({
          country,
          count: data.count,
          avgFootprint: Math.round((data.totalFootprint / data.count) * 10) / 10
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Analytics comportementales avancées
      const behavioralAnalytics = {
        transportModes: [
          { mode: 'Voiture seule', percentage: 45, avgFootprint: 3.2 },
          { mode: 'Transports en commun', percentage: 25, avgFootprint: 2.1 },
          { mode: 'Vélo/Marche', percentage: 15, avgFootprint: 1.8 },
          { mode: 'Mixte', percentage: 15, avgFootprint: 2.7 }
        ],
        dietTypes: [
          { type: 'Omnivore', percentage: 60, avgFootprint: 2.8 },
          { type: 'Flexitarien', percentage: 25, avgFootprint: 2.3 },
          { type: 'Végétarien', percentage: 12, avgFootprint: 1.9 },
          { type: 'Végétalien', percentage: 3, avgFootprint: 1.5 }
        ],
        housingTypes: [
          { type: 'Appartement', percentage: 55, avgFootprint: 2.2 },
          { type: 'Maison individuelle', percentage: 35, avgFootprint: 3.1 },
          { type: 'Colocation', percentage: 10, avgFootprint: 1.8 }
        ],
        ageGroups: [
          { group: '18-25 ans', percentage: 18, avgFootprint: 2.1 },
          { group: '26-35 ans', percentage: 28, avgFootprint: 2.6 },
          { group: '36-50 ans', percentage: 32, avgFootprint: 3.0 },
          { group: '51+ ans', percentage: 22, avgFootprint: 2.8 }
        ]
      };

      setStats({
        totalUsers: mockUsers.length,
        todayUsers: mockUsers.filter(u => 
          new Date(u.timestamp).toDateString() === new Date().toDateString()
        ).length,
        averageFootprint: Math.round(
          (mockUsers.reduce((sum, u) => sum + u.result.planetsNeeded, 0) / mockUsers.length) * 10
        ) / 10,
        completionRate: Math.round(
          (mockUsers.reduce((sum, u) => sum + u.completionRate, 0) / mockUsers.length) * 100
        ),
        topCountries,
        categoryBreakdown,
        behavioralAnalytics,
        trends: {
          daily: Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayUsers = mockUsers.filter(u => 
              new Date(u.timestamp).toDateString() === date.toDateString()
            );
            return {
              date: date.toLocaleDateString('fr-FR'),
              users: dayUsers.length,
              avgFootprint: dayUsers.length > 0 ? 
                Math.round((dayUsers.reduce((sum, u) => sum + u.result.planetsNeeded, 0) / dayUsers.length) * 10) / 10 : 0
            };
          }).reverse(),
          monthly: Array.from({ length: 6 }, (_, i) => {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            return {
              month: date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
              users: Math.floor(Math.random() * 500) + 200,
              avgFootprint: 2.1 + Math.random() * 0.8
            };
          }).reverse(),
          hourly: Array.from({ length: 24 }, (_, i) => ({
            hour: `${i.toString().padStart(2, '0')}h`,
            users: Math.floor(Math.random() * 50) + 10,
            avgFootprint: 2.0 + Math.random() * 1.0
          }))
        }
      });

      // État du système
      setSystemHealth({
        apiStatus: 'healthy',
        dbStatus: 'healthy',
        mlModelStatus: Math.random() > 0.1 ? 'healthy' : 'warning',
        responseTime: 45 + Math.random() * 30,
        uptime: '99.8%',
        errorRate: Math.random() * 0.5,
        activeUsers: Math.floor(Math.random() * 50) + 10
      });

      setLoading(false);
    };

    generateMockData();
    const interval = setInterval(generateMockData, 30000); // Mise à jour toutes les 30s
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location?.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location?.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || user.result.category === filterCategory;
    
    const matchesDate = dateRange === 'all' || (() => {
      const userDate = new Date(user.timestamp);
      const now = new Date();
      const diffTime = now.getTime() - userDate.getTime();
      const diffDays = diffTime / (1000 * 3600 * 24);
      
      switch (dateRange) {
        case 'today': return diffDays < 1;
        case 'week': return diffDays < 7;
        case 'month': return diffDays < 30;
        default: return true;
      }
    })();
    
    return matchesSearch && matchesCategory && matchesDate;
  });

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'users', label: 'Utilisateurs', icon: <Users className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'ml', label: 'ML Models', icon: <Brain className="w-4 h-4" /> },
    { id: 'system', label: 'Système', icon: <Cpu className="w-4 h-4" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-4 h-4" /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Chargement du panneau administrateur...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">Panneau Administrateur</h1>
              <p className="text-slate-400 text-sm">Gestion de l'application Carbon Footprint</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToApp}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'app</span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm">Système opérationnel</span>
            </div>
            <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 min-h-screen p-4">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'dashboard' && stats && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Vue d'ensemble</h2>
              
              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Utilisateurs Total</p>
                      <p className="text-3xl font-bold text-blue-400">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="mt-2 text-sm text-green-400">
                    +{stats.todayUsers} aujourd'hui
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Empreinte Moyenne</p>
                      <p className="text-3xl font-bold text-orange-400">{stats.averageFootprint}</p>
                    </div>
                    <Globe className="w-8 h-8 text-orange-400" />
                  </div>
                  <div className="mt-2 text-sm text-slate-400">
                    planètes nécessaires
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Taux de Completion</p>
                      <p className="text-3xl font-bold text-green-400">{stats.completionRate}%</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="mt-2 text-sm text-green-400">
                    Questionnaire complet
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">Utilisateurs Actifs</p>
                      <p className="text-3xl font-bold text-purple-400">{systemHealth?.activeUsers}</p>
                    </div>
                    <Activity className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="mt-2 text-sm text-purple-400">
                    En temps réel
                  </div>
                </div>
              </div>

              {/* Graphiques */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Répartition par Catégorie</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.categoryBreakdown).map(([category, count]) => {
                      const percentage = Math.round((count / stats.totalUsers) * 100);
                      const colors = {
                        excellent: 'bg-green-500',
                        good: 'bg-lime-500',
                        average: 'bg-yellow-500',
                        concerning: 'bg-orange-500',
                        critical: 'bg-red-500'
                      };
                      
                      return (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${colors[category as keyof typeof colors]}`}></div>
                            <span className="capitalize">{category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400">{count}</span>
                            <span className="text-sm text-slate-500">({percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Top Pays</h3>
                  <div className="space-y-3">
                    {stats.topCountries.map((country, index) => (
                      <div key={country.country} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-slate-400 text-sm">#{index + 1}</span>
                          <span>{country.country}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-blue-400 font-semibold">{country.count}</div>
                          <div className="text-xs text-slate-400">{country.avgFootprint} planètes</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tendances */}
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Tendances (7 derniers jours)</h3>
                <div className="grid grid-cols-7 gap-2">
                  {stats.trends.daily.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-slate-400 mb-2">{day.date.split('/')[0]}</div>
                      <div className="bg-blue-600 rounded" style={{ height: `${Math.max(day.users / 10, 5)}px` }}></div>
                      <div className="text-xs text-blue-400 mt-2">{day.users}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Gestion des Utilisateurs</h2>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Exporter CSV</span>
                  </button>
                </div>
              </div>

              {/* Filtres */}
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400"
                    />
                  </div>
                  
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="all">Toutes catégories</option>
                    <option value="excellent">Excellent</option>
                    <option value="good">Bon</option>
                    <option value="average">Moyen</option>
                    <option value="concerning">Préoccupant</option>
                    <option value="critical">Critique</option>
                  </select>

                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value as any)}
                    className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                  >
                    <option value="all">Toutes dates</option>
                    <option value="today">Aujourd'hui</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                  </select>

                  <div className="text-slate-400 text-sm flex items-center">
                    {filteredUsers.length} utilisateur(s) trouvé(s)
                  </div>
                </div>
              </div>

              {/* Table des utilisateurs */}
              <div className="bg-slate-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-700">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Profil</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Résultat</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Localisation</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredUsers.slice(0, 50).map((user) => (
                        <tr key={user.id} className="hover:bg-slate-700/50">
                          <td className="px-4 py-3 text-sm text-slate-300">{user.id}</td>
                          <td className="px-4 py-3">
                            <div className="text-sm">
                              <div className="text-white">{user.profile.gender}, {user.profile.age} ans</div>
                              <div className="text-slate-400">{user.profile.relationship}</div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                user.result.category === 'excellent' ? 'bg-green-500/20 text-green-400' :
                                user.result.category === 'good' ? 'bg-lime-500/20 text-lime-400' :
                                user.result.category === 'average' ? 'bg-yellow-500/20 text-yellow-400' :
                                user.result.category === 'concerning' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                {user.result.planetsNeeded} planètes
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-300">
                            <div>{user.location?.city}, {user.location?.country}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-300">
                            {new Date(user.timestamp).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-blue-400 hover:text-blue-300">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-red-400 hover:text-red-300">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && stats && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Analytics Avancées avec Graphiques</h2>
              
              {/* Graphiques de tendances */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <LineChart className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-semibold">Évolution Mensuelle</h3>
                  </div>
                  <div className="space-y-4">
                    {stats.trends.monthly.map((month, index) => {
                      const maxUsers = Math.max(...stats.trends.monthly.map(m => m.users));
                      const widthPercentage = (month.users / maxUsers) * 100;
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-300">{month.month}</span>
                            <div className="flex items-center space-x-4">
                              <span className="text-blue-400">{month.users} utilisateurs</span>
                              <span className="text-orange-400">{month.avgFootprint} planètes</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${widthPercentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <BarChart className="w-5 h-5 text-green-400" />
                    <h3 className="text-lg font-semibold">Activité par Heure</h3>
                  </div>
                  <div className="grid grid-cols-12 gap-1 items-end h-32">
                    {stats.trends.hourly.map((hour, index) => {
                      const maxUsers = Math.max(...stats.trends.hourly.map(h => h.users));
                      const heightPercentage = (hour.users / maxUsers) * 100;
                      
                      return (
                        <div key={index} className="flex flex-col items-center">
                          <div 
                            className="bg-gradient-to-t from-green-500 to-emerald-400 rounded-t w-full transition-all duration-1000 hover:from-green-400 hover:to-emerald-300"
                            style={{ height: `${Math.max(heightPercentage, 5)}%` }}
                            title={`${hour.hour}: ${hour.users} utilisateurs`}
                          />
                          <div className="text-xs text-slate-400 mt-1 transform -rotate-45 origin-top-left">
                            {index % 4 === 0 ? hour.hour : ''}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Graphiques comportementaux */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <PieChart className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-semibold">Modes de Transport</h3>
                  </div>
                  <div className="space-y-3">
                    {stats.behavioralAnalytics.transportModes.map((mode, index) => {
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                              <span className="text-slate-300">{mode.mode}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">{mode.percentage}%</div>
                              <div className="text-xs text-slate-400">{mode.avgFootprint} planètes</div>
                            </div>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className={`${colors[index]} h-2 rounded-full transition-all duration-1000`}
                              style={{ width: `${mode.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <BarChart3 className="w-5 h-5 text-orange-400" />
                    <h3 className="text-lg font-semibold">Types d'Alimentation</h3>
                  </div>
                  <div className="space-y-3">
                    {stats.behavioralAnalytics.dietTypes.map((diet, index) => {
                      const colors = ['bg-red-500', 'bg-orange-500', 'bg-green-500', 'bg-emerald-500'];
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${colors[index]}`}></div>
                              <span className="text-slate-300">{diet.type}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-semibold">{diet.percentage}%</div>
                              <div className="text-xs text-slate-400">{diet.avgFootprint} planètes</div>
                            </div>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div 
                              className={`${colors[index]} h-2 rounded-full transition-all duration-1000`}
                              style={{ width: `${diet.percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Analyse démographique */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Répartition par Âge</h3>
                  <div className="space-y-4">
                    {stats.behavioralAnalytics.ageGroups.map((group, index) => {
                      const maxPercentage = Math.max(...stats.behavioralAnalytics.ageGroups.map(g => g.percentage));
                      const widthPercentage = (group.percentage / maxPercentage) * 100;
                      
                      return (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300">{group.group}</span>
                            <div className="text-right">
                              <div className="text-cyan-400 font-semibold">{group.percentage}%</div>
                              <div className="text-xs text-slate-400">{group.avgFootprint} planètes</div>
                            </div>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full transition-all duration-1000"
                              style={{ width: `${widthPercentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Corrélations Intéressantes</h3>
                  <div className="space-y-4">
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-blue-400 mb-2">🚗 Transport vs Empreinte</h4>
                      <div className="text-sm text-slate-300">
                        Les utilisateurs sans voiture ont une empreinte moyenne de{' '}
                        <span className="text-green-400 font-semibold">
                          {Math.round(users.filter(u => !u.profile.ownsCar).reduce((sum, u) => sum + u.result.planetsNeeded, 0) / users.filter(u => !u.profile.ownsCar).length * 10) / 10}
                        </span>{' '}
                        planètes vs{' '}
                        <span className="text-orange-400 font-semibold">
                          {Math.round(users.filter(u => u.profile.ownsCar).reduce((sum, u) => sum + u.result.planetsNeeded, 0) / users.filter(u => u.profile.ownsCar).length * 10) / 10}
                        </span>{' '}
                        pour ceux qui en ont une.
                      </div>
                    </div>
                    
                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-purple-400 mb-2">🥗 Alimentation vs Empreinte</h4>
                      <div className="text-sm text-slate-300">
                        Les végétariens/flexitariens (moins de 5 repas carnés/semaine) ont une empreinte{' '}
                        <span className="text-green-400 font-semibold">23% plus faible</span>{' '}
                        que les gros consommateurs de viande.
                      </div>
                    </div>

                    <div className="bg-slate-700/50 rounded-lg p-4">
                      <h4 className="font-medium text-green-400 mb-2">🏠 Logement vs Empreinte</h4>
                      <div className="text-sm text-slate-300">
                        Les habitants d'appartements ont une empreinte{' '}
                        <span className="text-green-400 font-semibold">29% plus faible</span>{' '}
                        que ceux en maison individuelle.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphique de performance globale */}
              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Globale vs Objectifs</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">{stats.averageFootprint}</div>
                    <div className="text-sm text-slate-400">Moyenne actuelle</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${(stats.averageFootprint / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">2.9</div>
                    <div className="text-sm text-slate-400">Moyenne française</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${(2.9 / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">1.0</div>
                    <div className="text-sm text-slate-400">Objectif 2030</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(1.0 / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ml' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Modèles d'IA & Machine Learning</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Random Forest</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">R² Score</span>
                      <span className="text-green-400 font-semibold">0.892</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">RMSE</span>
                      <span className="text-blue-400">0.234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dernière MAJ</span>
                      <span className="text-slate-300">Il y a 2h</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">XGBoost</h3>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Accuracy</span>
                      <span className="text-yellow-400 font-semibold">87.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Drift Score</span>
                      <span className="text-orange-400">0.087</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status</span>
                      <span className="text-yellow-400">Retraining</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">K-Means Clustering</h3>
                    <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Clusters</span>
                      <span className="text-blue-400 font-semibold">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Silhouette</span>
                      <span className="text-green-400">0.67</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Samples</span>
                      <span className="text-slate-300">127K</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Pipeline de Données</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Database className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium">Ingestion</div>
                    <div className="text-xs text-slate-400">ADEME, RTE, INSEE</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Filter className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium">Nettoyage</div>
                    <div className="text-xs text-slate-400">Validation qualité</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium">Entraînement</div>
                    <div className="text-xs text-slate-400">ML Pipeline</div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium">Déploiement</div>
                    <div className="text-xs text-slate-400">Production</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && systemHealth && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">État du Système</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">API Status</h3>
                    <div className={`w-3 h-3 rounded-full ${
                      systemHealth.apiStatus === 'healthy' ? 'bg-green-400' :
                      systemHealth.apiStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Temps de réponse</span>
                      <span className="text-green-400">{systemHealth.responseTime.toFixed(0)}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Uptime</span>
                      <span className="text-green-400">{systemHealth.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Taux d'erreur</span>
                      <span className="text-green-400">{systemHealth.errorRate.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Base de Données</h3>
                    <div className={`w-3 h-3 rounded-full ${
                      systemHealth.dbStatus === 'healthy' ? 'bg-green-400' :
                      systemHealth.dbStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Connexions actives</span>
                      <span className="text-blue-400">23/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Taille DB</span>
                      <span className="text-blue-400">2.3 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dernière sauvegarde</span>
                      <span className="text-green-400">Il y a 1h</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Modèles ML</h3>
                    <div className={`w-3 h-3 rounded-full ${
                      systemHealth.mlModelStatus === 'healthy' ? 'bg-green-400' :
                      systemHealth.mlModelStatus === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Prédictions/min</span>
                      <span className="text-purple-400">847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Latence moyenne</span>
                      <span className="text-purple-400">4.2ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Dernière MAJ</span>
                      <span className="text-green-400">Il y a 2h</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Logs Système (Temps Réel)</h3>
                <div className="bg-slate-900 rounded p-4 font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
                  <div className="text-green-400">[2024-01-20 14:32:15] INFO: API health check passed</div>
                  <div className="text-blue-400">[2024-01-20 14:32:10] INFO: New user prediction completed (2.3 planets)</div>
                  <div className="text-yellow-400">[2024-01-20 14:32:05] WARN: ML model drift detected (0.087)</div>
                  <div className="text-green-400">[2024-01-20 14:32:00] INFO: Database backup completed successfully</div>
                  <div className="text-blue-400">[2024-01-20 14:31:55] INFO: RTE API data updated (57g CO2/kWh)</div>
                  <div className="text-green-400">[2024-01-20 14:31:50] INFO: User session started from France</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Paramètres Système</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Configuration API</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Clé API ADEME
                      </label>
                      <input
                        type="password"
                        value="••••••••••••••••"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Endpoint RTE eCO2mix
                      </label>
                      <input
                        type="text"
                        value="https://digital.iservices.rte-france.com/open_data/apidoc/co2"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Paramètres ML</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Seuil de retraining (drift)
                      </label>
                      <input
                        type="number"
                        value="0.1"
                        step="0.01"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Fréquence de validation (heures)
                      </label>
                      <input
                        type="number"
                        value="24"
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Actions Administrateur</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4" />
                    <span>Forcer Retraining ML</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Backup Base de Données</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors">
                    <Zap className="w-4 h-4" />
                    <span>Vider Cache</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}