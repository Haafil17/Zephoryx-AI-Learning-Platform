import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  Shield, Users, CreditCard, FileText, ArrowLeft, 
  Ban, CheckCircle, Loader2, RefreshCw, Pencil, Trash2, Plus, Search, UserX, UserCheck,
  BarChart3, BookOpen, Activity, TrendingUp, Clock, Download, Database,
  AlertTriangle, Eye, Mail, Phone, Star, Zap, Globe, Lock, Unlock,
  ChevronDown, ChevronUp, Copy, ExternalLink, Filter, Award,
  LayoutDashboard, Settings, Menu, X, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone_number: string | null;
  xp: number | null;
  level: string | null;
  created_at: string | null;
  blocked: boolean;
}

interface Subscription {
  id: string;
  user_id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  plan_id: string;
  payment_provider: string | null;
  payment_id: string | null;
  created_at: string;
}

interface LessonRow {
  id: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: string;
  xp_reward: number;
  content: string;
  created_at: string;
}

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string | null;
  created_at: string | null;
}

interface CertificationRow {
  id: string;
  title: string;
  description: string | null;
  category: string;
  required_xp: number;
  badge_color: string;
  created_at: string;
}

const ADMIN_EMAILS = ['haafil006@gmail.com', 'syedmusheer982@gmail.com', 'syedmuheer982@gmail.com'];

const sidebarSections = [
  {
    label: 'OVERVIEW',
    items: [
      { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { key: 'analytics', icon: BarChart3, label: 'Analytics' },
    ],
  },
  {
    label: 'MANAGEMENT',
    items: [
      { key: 'users', icon: Users, label: 'Users' },
      { key: 'content', icon: FileText, label: 'Lessons' },
      { key: 'knowledge', icon: BookOpen, label: 'Knowledge Base' },
      { key: 'certifications', icon: Award, label: 'Certifications' },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { key: 'subscriptions', icon: CreditCard, label: 'Billing & Plans' },
    ],
  },
  {
    label: 'SYSTEM',
    items: [
      { key: 'settings', icon: Settings, label: 'Settings' },
    ],
  },
];

const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }: { 
  icon: any; title: string; value: string | number; subtitle?: string; color: string; trend?: string 
}) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <Card className={`relative overflow-hidden border-l-4 hover:shadow-lg transition-shadow ${color}`}>
      <CardContent className="pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold font-display mt-1">{value}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-muted/50">
            <Icon className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            {trend === 'up' && <TrendingUp className="w-3 h-3 text-green-500" />}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const AdminPanel = () => {
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeItem[]>([]);
  const [certifications, setCertifications] = useState<CertificationRow[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [editingLesson, setEditingLesson] = useState<LessonRow | null>(null);
  const [editingKB, setEditingKB] = useState<KnowledgeItem | null>(null);
  const [editingCert, setEditingCert] = useState<CertificationRow | null>(null);
  const [newLesson, setNewLesson] = useState({ title: '', description: '', category: 'general', difficulty: 'beginner', content: '', xp_reward: 100 });
  const [newKB, setNewKB] = useState({ title: '', content: '', category: '' });
  const [newCert, setNewCert] = useState({ title: '', description: '', category: 'general', required_xp: 500, badge_color: 'blue' });
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAddKB, setShowAddKB] = useState(false);
  const [showAddCert, setShowAddCert] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userFilter, setUserFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [lessonFilter, setLessonFilter] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      navigate('/');
      toast.error('Access denied');
    }
  }, [isAdmin, adminLoading, navigate]);

  useEffect(() => {
    if (isAdmin) fetchAllData();
  }, [isAdmin]);

  const fetchAllData = async () => {
    setLoadingData(true);
    const [profilesRes, subsRes, lessonsRes, plansRes, kbRes, certsRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('*').order('created_at', { ascending: false }),
      supabase.from('lessons').select('*').order('created_at', { ascending: false }),
      supabase.from('subscription_plans').select('*').order('price'),
      supabase.from('knowledge_base').select('id, title, content, category, created_at').order('created_at', { ascending: false }),
      supabase.from('certifications').select('*').order('required_xp'),
    ]);
    
    if (profilesRes.data) setUsers(profilesRes.data as UserProfile[]);
    if (subsRes.data) setSubscriptions(subsRes.data);
    if (lessonsRes.data) setLessons(lessonsRes.data as LessonRow[]);
    if (plansRes.data) setPlans(plansRes.data);
    if (kbRes.data) setKnowledgeBase(kbRes.data as KnowledgeItem[]);
    if (certsRes.data) setCertifications(certsRes.data as CertificationRow[]);
    setLoadingData(false);
  };

  const handleBlockUser = async (userId: string, blocked: boolean) => {
    const { error } = await supabase.from('profiles').update({ blocked }).eq('id', userId);
    if (error) toast.error(`Failed to ${blocked ? 'block' : 'unblock'} user`);
    else { toast.success(`User ${blocked ? 'blocked' : 'unblocked'}`); fetchAllData(); }
  };

  const handleUpdatePlanPrice = async (planId: string, newPrice: number) => {
    const { error } = await supabase.from('subscription_plans').update({ price: newPrice }).eq('id', planId);
    if (error) toast.error('Failed to update price');
    else { toast.success('Price updated'); setEditingPlan(null); fetchAllData(); }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    const { error } = await supabase.from('lessons').delete().eq('id', lessonId);
    if (error) toast.error('Failed to delete lesson');
    else { toast.success('Lesson deleted'); fetchAllData(); }
  };

  const handleAddLesson = async () => {
    if (!newLesson.title || !newLesson.content) { toast.error('Title and content required'); return; }
    const { error } = await supabase.from('lessons').insert({ ...newLesson });
    if (error) toast.error('Failed to add lesson');
    else {
      toast.success('Lesson added');
      setNewLesson({ title: '', description: '', category: 'general', difficulty: 'beginner', content: '', xp_reward: 100 });
      setShowAddLesson(false);
      fetchAllData();
    }
  };

  const handleUpdateLesson = async () => {
    if (!editingLesson) return;
    const { error } = await supabase.from('lessons').update({
      title: editingLesson.title, description: editingLesson.description,
      category: editingLesson.category, difficulty: editingLesson.difficulty,
      content: editingLesson.content, xp_reward: editingLesson.xp_reward,
    }).eq('id', editingLesson.id);
    if (error) toast.error('Failed to update lesson');
    else { toast.success('Lesson updated'); setEditingLesson(null); fetchAllData(); }
  };

  const handleAddKB = async () => {
    if (!newKB.title || !newKB.content) { toast.error('Title and content required'); return; }
    const { error } = await supabase.from('knowledge_base').insert({ title: newKB.title, content: newKB.content, category: newKB.category || null });
    if (error) toast.error('Failed to add knowledge item');
    else { toast.success('Knowledge item added'); setNewKB({ title: '', content: '', category: '' }); setShowAddKB(false); fetchAllData(); }
  };

  const handleDeleteKB = async (id: string) => {
    const { error } = await supabase.from('knowledge_base').delete().eq('id', id);
    if (error) toast.error('Failed to delete');
    else { toast.success('Deleted'); fetchAllData(); }
  };

  const handleUpdateKB = async () => {
    if (!editingKB) return;
    const { error } = await supabase.from('knowledge_base').update({
      title: editingKB.title, content: editingKB.content, category: editingKB.category,
    }).eq('id', editingKB.id);
    if (error) toast.error('Failed to update');
    else { toast.success('Updated'); setEditingKB(null); fetchAllData(); }
  };

  const handleAddCert = async () => {
    if (!newCert.title) { toast.error('Title required'); return; }
    const { error } = await supabase.from('certifications').insert({
      title: newCert.title, description: newCert.description || null,
      category: newCert.category, required_xp: newCert.required_xp, badge_color: newCert.badge_color,
    });
    if (error) toast.error('Failed to add certification');
    else { toast.success('Certification added'); setNewCert({ title: '', description: '', category: 'general', required_xp: 500, badge_color: 'blue' }); setShowAddCert(false); fetchAllData(); }
  };

  const handleDeleteCert = async (id: string) => {
    const { error } = await supabase.from('certifications').delete().eq('id', id);
    if (error) toast.error('Failed to delete');
    else { toast.success('Deleted'); fetchAllData(); }
  };

  const handleUpdateCert = async () => {
    if (!editingCert) return;
    const { error } = await supabase.from('certifications').update({
      title: editingCert.title, description: editingCert.description,
      category: editingCert.category, required_xp: editingCert.required_xp, badge_color: editingCert.badge_color,
    }).eq('id', editingCert.id);
    if (error) toast.error('Failed to update');
    else { toast.success('Updated'); setEditingCert(null); fetchAllData(); }
  };

  const exportUsersCSV = () => {
    const headers = ['Email', 'Name', 'Phone', 'Level', 'Status', 'Joined'];
    const rows = users.map(u => [
      u.email || '', u.full_name || '', u.phone_number || '', u.level || '', 
      u.blocked ? 'Blocked' : 'Active', u.created_at ? new Date(u.created_at).toLocaleDateString() : ''
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    toast.success('Users exported as CSV');
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (u.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (u.phone_number || '').includes(searchQuery);
    if (userFilter === 'blocked') return matchesSearch && u.blocked;
    if (userFilter === 'active') return matchesSearch && !u.blocked;
    return matchesSearch;
  });

  const filteredLessons = lessonFilter === 'all' ? lessons : lessons.filter(l => l.category === lessonFilter);
  const lessonCategories = [...new Set(lessons.map(l => l.category))];

  const activeUsers = users.filter(u => !u.blocked).length;
  const blockedUsers = users.filter(u => u.blocked).length;
  const newUsersThisMonth = users.filter(u => {
    if (!u.created_at) return false;
    const d = new Date(u.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const levelDistribution = users.reduce((acc, u) => {
    const level = u.level || 'AI Beginner';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const topUsers = [...users].sort((a, b) => (b.xp || 0) - (a.xp || 0)).slice(0, 5);
  const difficultyDistribution = lessons.reduce((acc, l) => {
    acc[l.difficulty] = (acc[l.difficulty] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardContent />;
      case 'analytics':
        return <AnalyticsContent />;
      case 'users':
        return <UsersContent />;
      case 'content':
        return <ContentTab />;
      case 'knowledge':
        return <KnowledgeTab />;
      case 'certifications':
        return <CertificationsTab />;
      case 'subscriptions':
        return <BillingTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardContent />;
    }
  };

  function DashboardContent() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-display">Dashboard</h2>
          <p className="text-sm text-muted-foreground">Platform overview and quick actions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard icon={Users} title="Total Users" value={users.length} subtitle={`${newUsersThisMonth} new this month`} color="border-l-blue-500" trend="up" />
          <StatCard icon={UserCheck} title="Active Users" value={activeUsers} subtitle={`${blockedUsers} blocked`} color="border-l-green-500" />
          <StatCard icon={Award} title="Certifications" value={certifications.length} subtitle="Available to earn" color="border-l-amber-500" />
          <StatCard icon={Database} title="Content Items" value={lessons.length + knowledgeBase.length} subtitle={`${lessons.length} lessons · ${knowledgeBase.length} KB`} color="border-l-purple-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2"><Activity className="w-4 h-4" /> User Levels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(levelDistribution).sort((a, b) => b[1] - a[1]).map(([level, count]) => (
                <div key={level}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium truncate text-xs">{level}</span>
                    <span className="text-muted-foreground text-xs">{count}</span>
                  </div>
                  <Progress value={(count / users.length) * 100} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2"><Star className="w-4 h-4" /> Top Users by XP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {topUsers.map((u, i) => (
                  <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs",
                      i === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' : 
                      i === 1 ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{u.full_name || u.email || 'Unknown'}</p>
                      <p className="text-xs text-muted-foreground">{u.xp || 0} XP</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2"><Zap className="w-4 h-4" /> Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs" onClick={() => setActiveTab('users')}>
                <Users className="w-3.5 h-3.5" /> Manage Users
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs" onClick={() => { setActiveTab('content'); setShowAddLesson(true); }}>
                <Plus className="w-3.5 h-3.5" /> Add New Lesson
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs" onClick={() => { setActiveTab('knowledge'); setShowAddKB(true); }}>
                <BookOpen className="w-3.5 h-3.5" /> Add Knowledge Entry
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs" onClick={exportUsersCSV}>
                <Download className="w-3.5 h-3.5" /> Export Users CSV
              </Button>
              <Separator className="my-2" />
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Content</p>
                {Object.entries(difficultyDistribution).map(([diff, count]) => (
                  <div key={diff} className="flex justify-between text-xs">
                    <span className="capitalize">{diff}</span>
                    <Badge variant="outline" className="text-[10px] h-5">{count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> Recent Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Email</TableHead>
                  <TableHead className="text-xs">Name</TableHead>
                  <TableHead className="text-xs">Level</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 6).map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="text-xs font-medium">{u.email || '-'}</TableCell>
                    <TableCell className="text-xs">{u.full_name || '-'}</TableCell>
                    <TableCell><Badge variant="outline" className="text-[10px]">{u.level || 'AI Beginner'}</Badge></TableCell>
                    <TableCell>
                      {u.blocked ? (
                        <Badge variant="destructive" className="gap-1 text-[10px]"><Ban className="w-2.5 h-2.5" /> Blocked</Badge>
                      ) : (
                        <Badge className="gap-1 text-[10px] bg-green-600"><CheckCircle className="w-2.5 h-2.5" /> Active</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  }

  function AnalyticsContent() {
    const kbCategories = knowledgeBase.reduce((acc, kb) => {
      const cat = kb.category || 'General';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-display">Analytics</h2>
          <p className="text-sm text-muted-foreground">Deep dive into platform metrics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">User Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">New this month</span>
                  <span className="text-2xl font-bold">{newUsersThisMonth}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active rate</span>
                  <span className="text-2xl font-bold">{users.length > 0 ? Math.round((activeUsers / users.length) * 100) : 0}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Blocked rate</span>
                  <span className="text-2xl font-bold text-destructive">{users.length > 0 ? Math.round((blockedUsers / users.length) * 100) : 0}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Content Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lessonCategories.map(cat => {
                  const count = lessons.filter(l => l.category === cat).length;
                  return (
                    <div key={cat}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="capitalize">{cat}</span>
                        <span>{count} lessons</span>
                      </div>
                      <Progress value={(count / lessons.length) * 100} className="h-1.5" />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Knowledge Base Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(kbCategories).sort((a, b) => b[1] - a[1]).map(([cat, count]) => (
                  <div key={cat} className="flex justify-between items-center text-sm">
                    <span>{cat}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                ))}
                {Object.keys(kbCategories).length === 0 && <p className="text-sm text-muted-foreground">No knowledge base entries</p>}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Subscription Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Subscriptions</span>
                  <span className="text-2xl font-bold">{subscriptions.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active</span>
                  <span className="text-2xl font-bold text-green-600">{subscriptions.filter(s => s.status === 'active').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Available Plans</span>
                  <span className="text-2xl font-bold">{plans.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  function UsersContent() {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display">User Management</h2>
            <p className="text-sm text-muted-foreground">Manage all registered users</p>
          </div>
          <Button variant="outline" size="sm" onClick={exportUsersCSV} className="gap-1">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by email, name, or phone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
          <div className="flex gap-1">
            {(['all', 'active', 'blocked'] as const).map(f => (
              <Button key={f} variant={userFilter === f ? 'default' : 'outline'} size="sm" onClick={() => setUserFilter(f)} className="capitalize text-xs">
                {f} {f === 'all' ? `(${users.length})` : f === 'active' ? `(${activeUsers})` : `(${blockedUsers})`}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {loadingData ? (
              <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">User</TableHead>
                      <TableHead className="text-xs">Phone</TableHead>
                      <TableHead className="text-xs">Level & XP</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Joined</TableHead>
                      <TableHead className="text-right text-xs">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map(u => (
                      <TableRow key={u.id} className={u.blocked ? 'opacity-60 bg-destructive/5' : ''}>
                        <TableCell>
                          <div>
                            <p className="text-xs font-medium">{u.email || '-'}</p>
                            <p className="text-[11px] text-muted-foreground">{u.full_name || 'No name'}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-xs">{u.phone_number || '-'}</TableCell>
                        <TableCell>
                          <div className="space-y-0.5">
                            <Badge variant="outline" className="text-[10px]">{u.level || 'AI Beginner'}</Badge>
                            <p className="text-[11px] font-mono text-muted-foreground">{u.xp || 0} XP</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          {u.blocked ? (
                            <Badge variant="destructive" className="gap-1 text-[10px]"><Ban className="w-2.5 h-2.5" /> Blocked</Badge>
                          ) : (
                            <Badge className="gap-1 text-[10px] bg-emerald-600 text-primary-foreground"><CheckCircle className="w-2.5 h-2.5" /> Active</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setSelectedUser(selectedUser?.id === u.id ? null : u)}>
                              <Eye className="w-3.5 h-3.5" />
                            </Button>
                            {!ADMIN_EMAILS.includes(u.email || '') && (
                              <Button variant={u.blocked ? "outline" : "destructive"} size="sm" className="h-7 text-xs" onClick={() => handleBlockUser(u.id, !u.blocked)}>
                                {u.blocked ? <><Unlock className="w-3 h-3 mr-1" /> Unblock</> : <><Lock className="w-3 h-3 mr-1" /> Block</>}
                              </Button>
                            )}
                            {ADMIN_EMAILS.includes(u.email || '') && (
                              <Badge variant="secondary" className="gap-1 text-[10px]"><Shield className="w-2.5 h-2.5" /> Admin</Badge>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground text-sm">No users found</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground py-3">
            Showing {filteredUsers.length} of {users.length} users
          </CardFooter>
        </Card>

        {selectedUser && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-primary/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">User Details: {selectedUser.email}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Full Name', value: selectedUser.full_name || 'Not set' },
                    { label: 'Phone', value: selectedUser.phone_number || 'Not set' },
                    { label: 'Level', value: selectedUser.level || 'AI Beginner' },
                    { label: 'XP', value: String(selectedUser.xp || 0) },
                    { label: 'Status', value: selectedUser.blocked ? '🚫 Blocked' : '✅ Active' },
                    { label: 'Joined', value: selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : '-' },
                    { label: 'User ID', value: selectedUser.id.slice(0, 12) + '...' },
                    { label: 'Subscription', value: subscriptions.find(s => s.user_id === selectedUser.id)?.status || 'None' },
                  ].map(item => (
                    <div key={item.label} className="p-2.5 rounded-lg bg-muted/50">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{item.label}</p>
                      <p className="text-xs font-medium mt-0.5">{item.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    );
  }

  function ContentTab() {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display">Lesson Management</h2>
            <p className="text-sm text-muted-foreground">{lessons.length} lessons across {lessonCategories.length} categories</p>
          </div>
          <Button onClick={() => setShowAddLesson(!showAddLesson)} size="sm" className="gap-1">
            <Plus className="w-4 h-4" /> Add Lesson
          </Button>
        </div>

        {lessonCategories.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            <Button variant={lessonFilter === 'all' ? 'default' : 'outline'} size="sm" className="text-xs" onClick={() => setLessonFilter('all')}>All</Button>
            {lessonCategories.map(cat => (
              <Button key={cat} variant={lessonFilter === cat ? 'default' : 'outline'} size="sm" className="capitalize text-xs" onClick={() => setLessonFilter(cat)}>{cat}</Button>
            ))}
          </div>
        )}

        {showAddLesson && (
          <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
            <CardHeader className="pb-3"><CardTitle className="text-sm">New Lesson</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Lesson title" value={newLesson.title} onChange={e => setNewLesson({...newLesson, title: e.target.value})} />
              <Input placeholder="Description" value={newLesson.description} onChange={e => setNewLesson({...newLesson, description: e.target.value})} />
              <div className="grid grid-cols-3 gap-3">
                <Input placeholder="Category" value={newLesson.category} onChange={e => setNewLesson({...newLesson, category: e.target.value})} />
                <Input placeholder="Difficulty" value={newLesson.difficulty} onChange={e => setNewLesson({...newLesson, difficulty: e.target.value})} />
                <Input type="number" placeholder="XP" value={newLesson.xp_reward} onChange={e => setNewLesson({...newLesson, xp_reward: parseInt(e.target.value) || 100})} />
              </div>
              <Textarea placeholder="Lesson content..." value={newLesson.content} onChange={e => setNewLesson({...newLesson, content: e.target.value})} className="min-h-[120px]" />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddLesson} className="gap-1"><Plus className="w-4 h-4" /> Save</Button>
                <Button variant="outline" size="sm" onClick={() => setShowAddLesson(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {editingLesson && (
          <Card className="border-2 border-primary/50 bg-primary/5">
            <CardHeader className="pb-3"><CardTitle className="text-sm">Editing: {editingLesson.title}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Input value={editingLesson.title} onChange={e => setEditingLesson({...editingLesson, title: e.target.value})} />
              <Input value={editingLesson.description || ''} onChange={e => setEditingLesson({...editingLesson, description: e.target.value})} />
              <div className="grid grid-cols-3 gap-3">
                <Input value={editingLesson.category} onChange={e => setEditingLesson({...editingLesson, category: e.target.value})} />
                <Input value={editingLesson.difficulty} onChange={e => setEditingLesson({...editingLesson, difficulty: e.target.value})} />
                <Input type="number" value={editingLesson.xp_reward} onChange={e => setEditingLesson({...editingLesson, xp_reward: parseInt(e.target.value) || 100})} />
              </div>
              <Textarea value={editingLesson.content} onChange={e => setEditingLesson({...editingLesson, content: e.target.value})} className="min-h-[150px]" />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleUpdateLesson}>Save</Button>
                <Button variant="outline" size="sm" onClick={() => setEditingLesson(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-2">
          {loadingData ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : filteredLessons.map(l => (
            <div key={l.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-medium truncate">{l.title}</h4>
                  <Badge variant="outline" className="text-[10px] capitalize shrink-0">{l.category}</Badge>
                  <Badge variant="secondary" className="text-[10px] capitalize shrink-0">{l.difficulty}</Badge>
                </div>
                {l.description && <p className="text-xs text-muted-foreground truncate">{l.description}</p>}
              </div>
              <Badge className="font-mono text-[10px] shrink-0">{l.xp_reward} XP</Badge>
              <div className="flex gap-0.5 shrink-0">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditingLesson(l)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleDeleteLesson(l.id)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
              </div>
            </div>
          ))}
          {!loadingData && filteredLessons.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No lessons yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  function KnowledgeTab() {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display">Knowledge Base</h2>
            <p className="text-sm text-muted-foreground">Manage AI knowledge entries for chat assistant</p>
          </div>
          <Button onClick={() => setShowAddKB(!showAddKB)} size="sm" className="gap-1">
            <Plus className="w-4 h-4" /> Add Entry
          </Button>
        </div>

        {showAddKB && (
          <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
            <CardHeader className="pb-3"><CardTitle className="text-sm">New Knowledge Entry</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Title" value={newKB.title} onChange={e => setNewKB({...newKB, title: e.target.value})} />
              <Input placeholder="Category (optional)" value={newKB.category} onChange={e => setNewKB({...newKB, category: e.target.value})} />
              <Textarea placeholder="Content..." value={newKB.content} onChange={e => setNewKB({...newKB, content: e.target.value})} className="min-h-[120px]" />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddKB} className="gap-1"><Plus className="w-4 h-4" /> Save</Button>
                <Button variant="outline" size="sm" onClick={() => setShowAddKB(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {editingKB && (
          <Card className="border-2 border-primary/50 bg-primary/5">
            <CardHeader className="pb-3"><CardTitle className="text-sm">Editing: {editingKB.title}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Input value={editingKB.title} onChange={e => setEditingKB({...editingKB, title: e.target.value})} />
              <Input value={editingKB.category || ''} onChange={e => setEditingKB({...editingKB, category: e.target.value})} />
              <Textarea value={editingKB.content} onChange={e => setEditingKB({...editingKB, content: e.target.value})} className="min-h-[150px]" />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleUpdateKB}>Save</Button>
                <Button variant="outline" size="sm" onClick={() => setEditingKB(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-2">
          {loadingData ? (
            <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
          ) : knowledgeBase.map(kb => (
            <div key={kb.id} className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-medium">{kb.title}</h4>
                    <Badge variant="outline" className="text-[10px]">{kb.category || 'General'}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{kb.content}</p>
                </div>
                <div className="flex gap-0.5 shrink-0">
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditingKB(kb)}><Pencil className="w-3.5 h-3.5" /></Button>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleDeleteKB(kb.id)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                </div>
              </div>
            </div>
          ))}
          {!loadingData && knowledgeBase.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No knowledge entries yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  function CertificationsTab() {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold font-display">Certification Management</h2>
            <p className="text-sm text-muted-foreground">{certifications.length} certifications available</p>
          </div>
          <Button onClick={() => setShowAddCert(!showAddCert)} size="sm" className="gap-1">
            <Plus className="w-4 h-4" /> Add Certification
          </Button>
        </div>

        {showAddCert && (
          <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
            <CardHeader className="pb-3"><CardTitle className="text-sm">New Certification</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Certification title" value={newCert.title} onChange={e => setNewCert({...newCert, title: e.target.value})} />
              <Textarea placeholder="Description" value={newCert.description} onChange={e => setNewCert({...newCert, description: e.target.value})} />
              <div className="grid grid-cols-3 gap-3">
                <Input placeholder="Category" value={newCert.category} onChange={e => setNewCert({...newCert, category: e.target.value})} />
                <Input type="number" placeholder="Required XP" value={newCert.required_xp} onChange={e => setNewCert({...newCert, required_xp: parseInt(e.target.value) || 500})} />
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={newCert.badge_color} onChange={e => setNewCert({...newCert, badge_color: e.target.value})}>
                  <option value="blue">Blue</option><option value="purple">Purple</option><option value="pink">Pink</option>
                  <option value="cyan">Cyan</option><option value="green">Green</option><option value="gold">Gold</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleAddCert} className="gap-1"><Plus className="w-4 h-4" /> Save</Button>
                <Button variant="outline" size="sm" onClick={() => setShowAddCert(false)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {editingCert && (
          <Card className="border-2 border-primary/50 bg-primary/5">
            <CardHeader className="pb-3"><CardTitle className="text-sm">Editing: {editingCert.title}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <Input value={editingCert.title} onChange={e => setEditingCert({...editingCert, title: e.target.value})} />
              <Textarea value={editingCert.description || ''} onChange={e => setEditingCert({...editingCert, description: e.target.value})} />
              <div className="grid grid-cols-3 gap-3">
                <Input value={editingCert.category} onChange={e => setEditingCert({...editingCert, category: e.target.value})} />
                <Input type="number" value={editingCert.required_xp} onChange={e => setEditingCert({...editingCert, required_xp: parseInt(e.target.value) || 500})} />
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={editingCert.badge_color} onChange={e => setEditingCert({...editingCert, badge_color: e.target.value})}>
                  <option value="blue">Blue</option><option value="purple">Purple</option><option value="pink">Pink</option>
                  <option value="cyan">Cyan</option><option value="green">Green</option><option value="gold">Gold</option>
                </select>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleUpdateCert}>Save</Button>
                <Button variant="outline" size="sm" onClick={() => setEditingCert(null)}>Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-2">
          {certifications.map(cert => (
            <div key={cert.id} className="flex items-center gap-3 p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                cert.badge_color === 'gold' ? 'bg-amber-100 dark:bg-amber-900/30' :
                cert.badge_color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/30' :
                cert.badge_color === 'pink' ? 'bg-pink-100 dark:bg-pink-900/30' :
                cert.badge_color === 'cyan' ? 'bg-cyan-100 dark:bg-cyan-900/30' :
                cert.badge_color === 'green' ? 'bg-emerald-100 dark:bg-emerald-900/30' :
                'bg-blue-100 dark:bg-blue-900/30'
              )}>
                <Award className={cn("w-5 h-5",
                  cert.badge_color === 'gold' ? 'text-amber-600' :
                  cert.badge_color === 'purple' ? 'text-purple-600' :
                  cert.badge_color === 'pink' ? 'text-pink-600' :
                  cert.badge_color === 'cyan' ? 'text-cyan-600' :
                  cert.badge_color === 'green' ? 'text-emerald-600' :
                  'text-blue-600'
                )} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-sm font-medium truncate">{cert.title}</h4>
                  <Badge variant="outline" className="text-[10px] capitalize shrink-0">{cert.category}</Badge>
                </div>
                {cert.description && <p className="text-xs text-muted-foreground truncate">{cert.description}</p>}
              </div>
              <Badge className="font-mono text-[10px] shrink-0">{cert.required_xp} XP</Badge>
              <div className="flex gap-0.5 shrink-0">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditingCert(cert)}><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => handleDeleteCert(cert.id)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
              </div>
            </div>
          ))}
          {certifications.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Award className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No certifications yet</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  function BillingTab() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-display">Billing & Plans</h2>
          <p className="text-sm text-muted-foreground">Manage subscription plans and view billing</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {plans.map(plan => (
            <Card key={plan.id} className="relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
              <CardContent className="pt-6">
                <h3 className="text-lg font-bold">{plan.display_name}</h3>
                <p className="text-xs text-muted-foreground mb-3">Plan: {plan.name}</p>
                {editingPlan?.id === plan.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">₹</span>
                    <Input type="number" className="w-24" value={editingPlan.price} onChange={e => setEditingPlan({...editingPlan, price: parseInt(e.target.value) || 0})} />
                    <Button size="sm" onClick={() => handleUpdatePlanPrice(plan.id, editingPlan.price)}>Save</Button>
                    <Button size="sm" variant="outline" onClick={() => setEditingPlan(null)}>✕</Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold font-display">₹{plan.price}</span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                    {plan.name !== 'free' && (
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => setEditingPlan(plan)}><Pencil className="w-3.5 h-3.5" /></Button>
                    )}
                  </div>
                )}
                <div className="mt-3 flex flex-wrap gap-1">
                  {Object.entries(plan.features || {}).map(([key, value]) => (
                    <Badge key={key} variant="outline" className="text-[10px]">{key}: {String(value)}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Subscriptions ({subscriptions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">User</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs">Provider</TableHead>
                    <TableHead className="text-xs">Period End</TableHead>
                    <TableHead className="text-xs">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map(s => {
                    const subUser = users.find(u => u.id === s.user_id);
                    return (
                      <TableRow key={s.id}>
                        <TableCell className="text-xs font-medium">{subUser?.email || s.user_id.slice(0, 8) + '...'}</TableCell>
                        <TableCell><Badge variant={s.status === 'active' ? 'default' : 'destructive'} className="text-[10px]">{s.status}</Badge></TableCell>
                        <TableCell className="text-xs">{s.payment_provider || 'None'}</TableCell>
                        <TableCell className="text-xs">{new Date(s.current_period_end).toLocaleDateString()}</TableCell>
                        <TableCell className="text-xs">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    );
                  })}
                  {subscriptions.length === 0 && (
                    <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground text-sm">No subscriptions</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  function SettingsTab() {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-display">Settings</h2>
          <p className="text-sm text-muted-foreground">Platform configuration</p>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Admin Accounts</CardTitle>
            <CardDescription className="text-xs">These email addresses have admin access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ADMIN_EMAILS.map(email => (
                <div key={email} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{email}</span>
                  <Badge variant="secondary" className="text-[10px] ml-auto">Admin</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Platform Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Users</p>
                <p className="text-lg font-bold">{users.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Content</p>
                <p className="text-lg font-bold">{lessons.length + knowledgeBase.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Certifications</p>
                <p className="text-lg font-bold">{certifications.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-muted/50">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Active Plans</p>
                <p className="text-lg font-bold">{plans.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col border-r border-border bg-card transition-all duration-300",
        sidebarOpen ? "w-60" : "w-16"
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          {sidebarOpen && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h1 className="text-sm font-bold font-display truncate">Admin Panel</h1>
                <p className="text-[10px] text-muted-foreground truncate">ZEPHORYX AI LAB</p>
              </div>
            </div>
          )}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 shrink-0" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {sidebarSections.map((section) => (
            <div key={section.label} className="mb-4">
              {sidebarOpen && (
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-1.5">{section.label}</p>
              )}
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setActiveTab(item.key)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      activeTab === item.key
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="border-t border-border p-3">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            {sidebarOpen && <span>Back to Site</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "ml-60" : "ml-16"
      )}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-4 h-4" />
              </Button>
              <h2 className="text-sm font-semibold capitalize">{activeTab === 'subscriptions' ? 'Billing & Plans' : activeTab}</h2>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="hidden md:flex gap-1 text-xs">
                <Mail className="w-3 h-3" /> {user?.email}
              </Badge>
              <Button variant="outline" size="sm" onClick={fetchAllData} className="gap-1 h-8 text-xs">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
