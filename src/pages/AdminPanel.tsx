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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  ChevronDown, ChevronUp, Copy, ExternalLink, Filter
} from 'lucide-react';

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

const ADMIN_EMAILS = ['haafil006@gmail.com', 'syedmusheer982@gmail.com'];

const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }: { 
  icon: any; title: string; value: string | number; subtitle?: string; color: string; trend?: string 
}) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
    <Card className={`relative overflow-hidden border-l-4 hover:shadow-lg transition-shadow ${color}`}>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold font-display mt-1">{value}</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/50">
            <Icon className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
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
  const [loadingData, setLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [editingLesson, setEditingLesson] = useState<LessonRow | null>(null);
  const [editingKB, setEditingKB] = useState<KnowledgeItem | null>(null);
  const [newLesson, setNewLesson] = useState({ title: '', description: '', category: 'general', difficulty: 'beginner', content: '', xp_reward: 100 });
  const [newKB, setNewKB] = useState({ title: '', content: '', category: '' });
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAddKB, setShowAddKB] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userFilter, setUserFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [lessonFilter, setLessonFilter] = useState('all');

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
    const [profilesRes, subsRes, lessonsRes, plansRes, kbRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('*').order('created_at', { ascending: false }),
      supabase.from('lessons').select('*').order('created_at', { ascending: false }),
      supabase.from('subscription_plans').select('*').order('price'),
      supabase.from('knowledge_base').select('id, title, content, category, created_at').order('created_at', { ascending: false }),
    ]);
    
    if (profilesRes.data) setUsers(profilesRes.data as UserProfile[]);
    if (subsRes.data) setSubscriptions(subsRes.data);
    if (lessonsRes.data) setLessons(lessonsRes.data as LessonRow[]);
    if (plansRes.data) setPlans(plansRes.data);
    if (kbRes.data) setKnowledgeBase(kbRes.data as KnowledgeItem[]);
    setLoadingData(false);
  };

  const handleBlockUser = async (userId: string, blocked: boolean) => {
    const { error } = await supabase.from('profiles').update({ blocked }).eq('id', userId);
    if (error) {
      toast.error(`Failed to ${blocked ? 'block' : 'unblock'} user`);
    } else {
      toast.success(`User ${blocked ? 'blocked' : 'unblocked'} successfully`);
      fetchAllData();
    }
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

  const exportUsersCSV = () => {
    const headers = ['Email', 'Name', 'Phone', 'Level', 'XP', 'Status', 'Joined'];
    const rows = users.map(u => [
      u.email || '', u.full_name || '', u.phone_number || '', u.level || '', 
      String(u.xp || 0), u.blocked ? 'Blocked' : 'Active', u.created_at ? new Date(u.created_at).toLocaleDateString() : ''
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

  // Analytics
  const totalXP = users.reduce((sum, u) => sum + (u.xp || 0), 0);
  const activeUsers = users.filter(u => !u.blocked).length;
  const blockedUsers = users.filter(u => u.blocked).length;
  const newUsersThisMonth = users.filter(u => {
    if (!u.created_at) return false;
    const d = new Date(u.created_at);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const avgXP = users.length ? Math.round(totalXP / users.length) : 0;
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/90 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Site
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold font-display">Admin Panel</h1>
                <p className="text-xs text-muted-foreground">Manage your platform</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="hidden md:flex gap-1">
              <Mail className="w-3 h-3" /> {user?.email}
            </Badge>
            <Button variant="outline" size="sm" onClick={fetchAllData} className="gap-1">
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 flex-wrap h-auto gap-1 p-1.5 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger value="dashboard" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BarChart3 className="w-4 h-4" /> Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4" /> Users ({users.length})
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4" /> Content ({lessons.length})
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="w-4 h-4" /> Knowledge ({knowledgeBase.length})
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="gap-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CreditCard className="w-4 h-4" /> Billing
            </TabsTrigger>
          </TabsList>

          {/* ==================== DASHBOARD ==================== */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard icon={Users} title="Total Users" value={users.length} subtitle={`${newUsersThisMonth} new this month`} color="border-l-blue-500" trend="up" />
              <StatCard icon={UserCheck} title="Active Users" value={activeUsers} subtitle={`${blockedUsers} blocked`} color="border-l-green-500" />
              <StatCard icon={Zap} title="Total XP" value={totalXP.toLocaleString()} subtitle={`Avg: ${avgXP} per user`} color="border-l-amber-500" />
              <StatCard icon={Database} title="Content Items" value={lessons.length + knowledgeBase.length} subtitle={`${lessons.length} lessons · ${knowledgeBase.length} KB`} color="border-l-purple-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Level Distribution */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2"><Activity className="w-4 h-4" /> User Levels</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(levelDistribution).sort((a, b) => b[1] - a[1]).map(([level, count]) => (
                    <div key={level}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium truncate">{level}</span>
                        <span className="text-muted-foreground">{count}</span>
                      </div>
                      <Progress value={(count / users.length) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Top Users */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2"><Star className="w-4 h-4" /> Top Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topUsers.map((u, i) => (
                      <div key={u.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          i === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300' : 
                          i === 1 ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
                        }`}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{u.email || 'Unknown'}</p>
                          <p className="text-xs text-muted-foreground">{u.level || 'AI Beginner'}</p>
                        </div>
                        <Badge variant="secondary" className="font-mono">{u.xp || 0} XP</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions & Content Stats */}
              <Card className="lg:col-span-1">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2"><Zap className="w-4 h-4" /> Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={() => { setActiveTab('users'); }}>
                    <Users className="w-4 h-4" /> Manage Users
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={() => { setActiveTab('content'); setShowAddLesson(true); }}>
                    <Plus className="w-4 h-4" /> Add New Lesson
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={() => { setActiveTab('knowledge'); setShowAddKB(true); }}>
                    <BookOpen className="w-4 h-4" /> Add Knowledge Entry
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" onClick={exportUsersCSV}>
                    <Download className="w-4 h-4" /> Export Users CSV
                  </Button>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Content Breakdown</p>
                    {Object.entries(difficultyDistribution).map(([diff, count]) => (
                      <div key={diff} className="flex justify-between text-sm">
                        <span className="capitalize">{diff}</span>
                        <Badge variant="outline" className="text-xs">{count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Users Table */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><Clock className="w-4 h-4" /> Recent Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead>XP</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.slice(0, 8).map(u => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">{u.email || '-'}</TableCell>
                        <TableCell>{u.full_name || '-'}</TableCell>
                        <TableCell><Badge variant="outline" className="text-xs">{u.level || 'AI Beginner'}</Badge></TableCell>
                        <TableCell className="font-mono text-sm">{u.xp || 0}</TableCell>
                        <TableCell>
                          {u.blocked ? (
                            <Badge variant="destructive" className="gap-1 text-xs"><Ban className="w-3 h-3" /> Blocked</Badge>
                          ) : (
                            <Badge className="gap-1 text-xs bg-green-600"><CheckCircle className="w-3 h-3" /> Active</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== USERS ==================== */}
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5" /> User Management</CardTitle>
                    <CardDescription>Manage all registered users, block/unblock accounts</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={exportUsersCSV} className="gap-1">
                      <Download className="w-4 h-4" /> Export CSV
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search by email, name, or phone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
                  </div>
                  <div className="flex gap-1">
                    {(['all', 'active', 'blocked'] as const).map(f => (
                      <Button key={f} variant={userFilter === f ? 'default' : 'outline'} size="sm" onClick={() => setUserFilter(f)} className="capitalize">
                        {f} {f === 'all' ? `(${users.length})` : f === 'active' ? `(${activeUsers})` : `(${blockedUsers})`}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Level & XP</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map(u => (
                          <TableRow key={u.id} className={u.blocked ? 'opacity-60 bg-destructive/5' : ''}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{u.email || '-'}</p>
                                <p className="text-xs text-muted-foreground">{u.full_name || 'No name'}</p>
                              </div>
                            </TableCell>
                            <TableCell className="font-mono text-sm">{u.phone_number || '-'}</TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Badge variant="outline" className="text-xs">{u.level || 'AI Beginner'}</Badge>
                                <p className="text-xs font-mono text-muted-foreground">{u.xp || 0} XP</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              {u.blocked ? (
                                <Badge variant="destructive" className="gap-1"><Ban className="w-3 h-3" /> Blocked</Badge>
                              ) : (
                                <Badge className="gap-1 bg-emerald-600 text-primary-foreground"><CheckCircle className="w-3 h-3" /> Active</Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-1">
                                <Button variant="ghost" size="sm" onClick={() => setSelectedUser(selectedUser?.id === u.id ? null : u)}>
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {!ADMIN_EMAILS.includes(u.email || '') && (
                                  <Button variant={u.blocked ? "outline" : "destructive"} size="sm" onClick={() => handleBlockUser(u.id, !u.blocked)}>
                                    {u.blocked ? <><Unlock className="w-4 h-4 mr-1" /> Unblock</> : <><Lock className="w-4 h-4 mr-1" /> Block</>}
                                  </Button>
                                )}
                                {ADMIN_EMAILS.includes(u.email || '') && (
                                  <Badge variant="secondary" className="gap-1"><Shield className="w-3 h-3" /> Admin</Badge>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                        {filteredUsers.length === 0 && (
                          <TableRow><TableCell colSpan={6} className="text-center py-12 text-muted-foreground">No users found</TableCell></TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                Showing {filteredUsers.length} of {users.length} users
              </CardFooter>
            </Card>

            {/* User Detail Panel */}
            {selectedUser && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="border-primary/30">
                  <CardHeader>
                    <CardTitle className="text-base">User Details: {selectedUser.email}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Full Name</p>
                        <p className="font-medium">{selectedUser.full_name || 'Not set'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="font-medium font-mono">{selectedUser.phone_number || 'Not set'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Level</p>
                        <p className="font-medium">{selectedUser.level || 'AI Beginner'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">XP</p>
                        <p className="font-medium font-mono">{selectedUser.xp || 0}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Status</p>
                        <p className="font-medium">{selectedUser.blocked ? '🚫 Blocked' : '✅ Active'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Joined</p>
                        <p className="font-medium">{selectedUser.created_at ? new Date(selectedUser.created_at).toLocaleString() : '-'}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">User ID</p>
                        <p className="font-mono text-xs truncate">{selectedUser.id}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground">Subscription</p>
                        <p className="font-medium">{subscriptions.find(s => s.user_id === selectedUser.id)?.status || 'None'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </TabsContent>

          {/* ==================== CONTENT ==================== */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2"><FileText className="w-5 h-5" /> Lesson Management</CardTitle>
                    <CardDescription>{lessons.length} lessons across {lessonCategories.length} categories</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddLesson(!showAddLesson)} className="gap-1">
                    <Plus className="w-4 h-4" /> Add Lesson
                  </Button>
                </div>
                {lessonCategories.length > 0 && (
                  <div className="flex gap-1 mt-3 flex-wrap">
                    <Button variant={lessonFilter === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setLessonFilter('all')}>All</Button>
                    {lessonCategories.map(cat => (
                      <Button key={cat} variant={lessonFilter === cat ? 'default' : 'outline'} size="sm" onClick={() => setLessonFilter(cat)} className="capitalize">{cat}</Button>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {showAddLesson && (
                  <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                    <CardHeader className="pb-3"><CardTitle className="text-base">New Lesson</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <Input placeholder="Lesson title" value={newLesson.title} onChange={e => setNewLesson({...newLesson, title: e.target.value})} />
                      <Input placeholder="Description" value={newLesson.description} onChange={e => setNewLesson({...newLesson, description: e.target.value})} />
                      <div className="grid grid-cols-3 gap-3">
                        <Input placeholder="Category" value={newLesson.category} onChange={e => setNewLesson({...newLesson, category: e.target.value})} />
                        <Input placeholder="Difficulty" value={newLesson.difficulty} onChange={e => setNewLesson({...newLesson, difficulty: e.target.value})} />
                        <Input type="number" placeholder="XP" value={newLesson.xp_reward} onChange={e => setNewLesson({...newLesson, xp_reward: parseInt(e.target.value) || 100})} />
                      </div>
                      <Textarea placeholder="Lesson content (supports markdown)..." value={newLesson.content} onChange={e => setNewLesson({...newLesson, content: e.target.value})} className="min-h-[120px]" />
                      <div className="flex gap-2">
                        <Button onClick={handleAddLesson} className="gap-1"><Plus className="w-4 h-4" /> Save Lesson</Button>
                        <Button variant="outline" onClick={() => setShowAddLesson(false)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {editingLesson && (
                  <Card className="border-2 border-primary/50 bg-primary/5">
                    <CardHeader className="pb-3"><CardTitle className="text-base">Editing: {editingLesson.title}</CardTitle></CardHeader>
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
                        <Button onClick={handleUpdateLesson}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditingLesson(null)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loadingData ? (
                  <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : (
                  <div className="grid gap-3">
                    {filteredLessons.map(l => (
                      <div key={l.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">{l.title}</h4>
                            <Badge variant="outline" className="text-xs capitalize shrink-0">{l.category}</Badge>
                            <Badge variant="secondary" className="text-xs capitalize shrink-0">{l.difficulty}</Badge>
                          </div>
                          {l.description && <p className="text-sm text-muted-foreground truncate">{l.description}</p>}
                        </div>
                        <Badge className="font-mono shrink-0">{l.xp_reward} XP</Badge>
                        <div className="flex gap-1 shrink-0">
                          <Button variant="ghost" size="icon" onClick={() => setEditingLesson(l)}><Pencil className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteLesson(l.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                        </div>
                      </div>
                    ))}
                    {filteredLessons.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No lessons yet. Create your first lesson above!</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== KNOWLEDGE BASE ==================== */}
          <TabsContent value="knowledge" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2"><BookOpen className="w-5 h-5" /> Knowledge Base</CardTitle>
                    <CardDescription>Manage AI knowledge entries used by the chat assistant</CardDescription>
                  </div>
                  <Button onClick={() => setShowAddKB(!showAddKB)} className="gap-1">
                    <Plus className="w-4 h-4" /> Add Entry
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {showAddKB && (
                  <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
                    <CardHeader className="pb-3"><CardTitle className="text-base">New Knowledge Entry</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <Input placeholder="Title" value={newKB.title} onChange={e => setNewKB({...newKB, title: e.target.value})} />
                      <Input placeholder="Category (optional)" value={newKB.category} onChange={e => setNewKB({...newKB, category: e.target.value})} />
                      <Textarea placeholder="Content..." value={newKB.content} onChange={e => setNewKB({...newKB, content: e.target.value})} className="min-h-[120px]" />
                      <div className="flex gap-2">
                        <Button onClick={handleAddKB} className="gap-1"><Plus className="w-4 h-4" /> Save</Button>
                        <Button variant="outline" onClick={() => setShowAddKB(false)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {editingKB && (
                  <Card className="border-2 border-primary/50 bg-primary/5">
                    <CardHeader className="pb-3"><CardTitle className="text-base">Editing: {editingKB.title}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <Input value={editingKB.title} onChange={e => setEditingKB({...editingKB, title: e.target.value})} />
                      <Input value={editingKB.category || ''} onChange={e => setEditingKB({...editingKB, category: e.target.value})} />
                      <Textarea value={editingKB.content} onChange={e => setEditingKB({...editingKB, content: e.target.value})} className="min-h-[150px]" />
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateKB}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditingKB(null)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loadingData ? (
                  <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : (
                  <div className="grid gap-3">
                    {knowledgeBase.map(kb => (
                      <div key={kb.id} className="p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium">{kb.title}</h4>
                              <Badge variant="outline" className="text-xs">{kb.category || 'General'}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">{kb.content}</p>
                            <p className="text-xs text-muted-foreground mt-2">{kb.created_at ? new Date(kb.created_at).toLocaleDateString() : ''}</p>
                          </div>
                          <div className="flex gap-1 shrink-0">
                            <Button variant="ghost" size="icon" onClick={() => setEditingKB(kb)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteKB(kb.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {knowledgeBase.length === 0 && (
                      <div className="text-center py-12 text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
                        <p>No knowledge entries yet.</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ==================== BILLING ==================== */}
          <TabsContent value="subscriptions" className="space-y-6">
            {/* Plans */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" /> Subscription Plans</CardTitle>
                <CardDescription>Manage pricing for subscription tiers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {plans.map(plan => (
                    <Card key={plan.id} className="relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/50" />
                      <CardContent className="pt-6">
                        <h3 className="text-lg font-bold">{plan.display_name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">Plan: {plan.name}</p>
                        {editingPlan?.id === plan.id ? (
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">₹</span>
                            <Input type="number" className="w-24" value={editingPlan.price} onChange={e => setEditingPlan({...editingPlan, price: parseInt(e.target.value) || 0})} />
                            <Button size="sm" onClick={() => handleUpdatePlanPrice(plan.id, editingPlan.price)}>Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingPlan(null)}>✕</Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-3xl font-bold font-display">₹{plan.price}</span>
                            <span className="text-muted-foreground">/mo</span>
                            {plan.name !== 'free' && (
                              <Button variant="ghost" size="icon" onClick={() => setEditingPlan(plan)}><Pencil className="w-4 h-4" /></Button>
                            )}
                          </div>
                        )}
                        <div className="mt-4 flex flex-wrap gap-1">
                          {Object.entries(plan.features || {}).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="text-xs">{key}: {String(value)}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Active Subscriptions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Active Subscriptions ({subscriptions.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Period End</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptions.map(s => {
                        const subUser = users.find(u => u.id === s.user_id);
                        return (
                          <TableRow key={s.id}>
                            <TableCell className="font-medium">{subUser?.email || s.user_id.slice(0, 8) + '...'}</TableCell>
                            <TableCell><Badge variant={s.status === 'active' ? 'default' : 'destructive'}>{s.status}</Badge></TableCell>
                            <TableCell>{s.payment_provider || 'None'}</TableCell>
                            <TableCell>{new Date(s.current_period_end).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell>
                          </TableRow>
                        );
                      })}
                      {subscriptions.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No subscriptions</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
