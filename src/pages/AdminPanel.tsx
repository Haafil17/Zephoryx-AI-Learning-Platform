import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAdmin } from '@/hooks/useAdmin';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { 
  Shield, Users, CreditCard, FileText, Settings, ArrowLeft, 
  Ban, CheckCircle, Loader2, RefreshCw, Pencil, Trash2, Plus, Search, UserX, UserCheck,
  BarChart3, BookOpen, Activity, Globe, TrendingUp, Eye, Clock
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
    if (error) {
      toast.error('Failed to update price');
    } else {
      toast.success('Price updated');
      setEditingPlan(null);
      fetchAllData();
    }
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

  const filteredUsers = users.filter(u => 
    (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (u.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  // Analytics calculations
  const totalXP = users.reduce((sum, u) => sum + (u.xp || 0), 0);
  const activeUsers = users.filter(u => !u.blocked).length;
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

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold font-display">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{user?.email}</Badge>
            <Button variant="outline" size="sm" onClick={fetchAllData}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="dashboard"><BarChart3 className="w-4 h-4 mr-1" /> Dashboard</TabsTrigger>
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-1" /> Users</TabsTrigger>
            <TabsTrigger value="subscriptions"><CreditCard className="w-4 h-4 mr-1" /> Subscriptions</TabsTrigger>
            <TabsTrigger value="content"><FileText className="w-4 h-4 mr-1" /> Content</TabsTrigger>
            <TabsTrigger value="knowledge"><BookOpen className="w-4 h-4 mr-1" /> Knowledge Base</TabsTrigger>
            <TabsTrigger value="pricing"><Settings className="w-4 h-4 mr-1" /> Pricing</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold font-display">{users.length}</p>
                    </div>
                    <Users className="w-10 h-10 text-blue-500/30" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {newUsersThisMonth} new this month
                  </p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Blocked Users</p>
                      <p className="text-3xl font-bold font-display">{users.filter(u => u.blocked).length}</p>
                    </div>
                    <UserX className="w-10 h-10 text-red-500/30" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{activeUsers} active</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-green-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Subs</p>
                      <p className="text-3xl font-bold font-display">{subscriptions.filter(s => s.status === 'active').length}</p>
                    </div>
                    <CreditCard className="w-10 h-10 text-green-500/30" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{subscriptions.length} total</p>
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Content</p>
                      <p className="text-3xl font-bold font-display">{lessons.length + knowledgeBase.length}</p>
                    </div>
                    <FileText className="w-10 h-10 text-purple-500/30" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{lessons.length} lessons · {knowledgeBase.length} KB items</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Level Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5" /> User Level Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(levelDistribution).sort((a, b) => b[1] - a[1]).map(([level, count]) => (
                      <div key={level} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{level}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary/60 rounded-full"
                              style={{ width: `${(count / users.length) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Platform Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Total XP Earned</span>
                      <span className="font-bold font-display">{totalXP.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Average XP per User</span>
                      <span className="font-bold font-display">{avgXP.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">Subscription Plans</span>
                      <span className="font-bold font-display">{plans.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <span className="text-sm">New Users This Month</span>
                      <span className="font-bold font-display text-green-600">{newUsersThisMonth}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Users */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" /> Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.slice(0, 5).map(u => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">{u.email || '-'}</TableCell>
                          <TableCell>{u.full_name || '-'}</TableCell>
                          <TableCell><Badge variant="outline">{u.level || 'AI Beginner'}</Badge></TableCell>
                          <TableCell>
                            {u.blocked ? (
                              <Badge variant="destructive" className="gap-1"><Ban className="w-3 h-3" /> Blocked</Badge>
                            ) : (
                              <Badge className="gap-1 bg-green-600"><CheckCircle className="w-3 h-3" /> Active</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users, block/unblock accounts, view details</CardDescription>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users by email or name..." 
                    value={searchQuery} 
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                {loadingData ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>XP</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(u => (
                        <TableRow key={u.id} className={u.blocked ? 'opacity-60 bg-destructive/5' : ''}>
                          <TableCell className="font-medium">{u.email || '-'}</TableCell>
                          <TableCell>{u.full_name || '-'}</TableCell>
                          <TableCell className="font-mono text-sm">{u.phone_number || '-'}</TableCell>
                          <TableCell><Badge variant="outline">{u.level || 'AI Beginner'}</Badge></TableCell>
                          <TableCell className="font-mono">{u.xp || 0}</TableCell>
                          <TableCell>
                            {u.blocked ? (
                              <Badge variant="destructive" className="gap-1"><Ban className="w-3 h-3" /> Blocked</Badge>
                            ) : (
                              <Badge className="gap-1 bg-green-600"><CheckCircle className="w-3 h-3" /> Active</Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</TableCell>
                          <TableCell>
                            {u.email !== 'haafil006@gmail.com' && (
                              <Button
                                variant={u.blocked ? "outline" : "destructive"}
                                size="sm"
                                onClick={() => handleBlockUser(u.id, !u.blocked)}
                              >
                                {u.blocked ? (
                                  <><UserCheck className="w-4 h-4 mr-1" /> Unblock</>
                                ) : (
                                  <><UserX className="w-4 h-4 mr-1" /> Block</>
                                )}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                      {filteredUsers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No users found</TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions Tab */}
          <TabsContent value="subscriptions">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Management</CardTitle>
                <CardDescription>View all user subscriptions and payment status</CardDescription>
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
                        <TableHead>Payment Provider</TableHead>
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
                            <TableCell>
                              <Badge variant={s.status === 'active' ? 'default' : 'destructive'}>{s.status}</Badge>
                            </TableCell>
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

          {/* Content Tab */}
          <TabsContent value="content">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Lesson Management</CardTitle>
                  <CardDescription>Add, edit, or remove lessons</CardDescription>
                </div>
                <Button onClick={() => setShowAddLesson(!showAddLesson)}>
                  <Plus className="w-4 h-4 mr-1" /> Add Lesson
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {showAddLesson && (
                  <Card className="border-dashed border-2 border-primary/30">
                    <CardContent className="pt-6 space-y-3">
                      <Input placeholder="Lesson title" value={newLesson.title} onChange={e => setNewLesson({...newLesson, title: e.target.value})} />
                      <Input placeholder="Description" value={newLesson.description} onChange={e => setNewLesson({...newLesson, description: e.target.value})} />
                      <div className="grid grid-cols-3 gap-3">
                        <Input placeholder="Category" value={newLesson.category} onChange={e => setNewLesson({...newLesson, category: e.target.value})} />
                        <Input placeholder="Difficulty" value={newLesson.difficulty} onChange={e => setNewLesson({...newLesson, difficulty: e.target.value})} />
                        <Input type="number" placeholder="XP Reward" value={newLesson.xp_reward} onChange={e => setNewLesson({...newLesson, xp_reward: parseInt(e.target.value) || 100})} />
                      </div>
                      <Textarea placeholder="Lesson content..." value={newLesson.content} onChange={e => setNewLesson({...newLesson, content: e.target.value})} className="min-h-[100px]" />
                      <div className="flex gap-2">
                        <Button onClick={handleAddLesson}>Save Lesson</Button>
                        <Button variant="outline" onClick={() => setShowAddLesson(false)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {editingLesson && (
                  <Card className="border-2 border-primary/50 bg-primary/5">
                    <CardHeader><CardTitle className="text-lg">Editing: {editingLesson.title}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <Input placeholder="Title" value={editingLesson.title} onChange={e => setEditingLesson({...editingLesson, title: e.target.value})} />
                      <Input placeholder="Description" value={editingLesson.description || ''} onChange={e => setEditingLesson({...editingLesson, description: e.target.value})} />
                      <div className="grid grid-cols-3 gap-3">
                        <Input placeholder="Category" value={editingLesson.category} onChange={e => setEditingLesson({...editingLesson, category: e.target.value})} />
                        <Input placeholder="Difficulty" value={editingLesson.difficulty} onChange={e => setEditingLesson({...editingLesson, difficulty: e.target.value})} />
                        <Input type="number" placeholder="XP" value={editingLesson.xp_reward} onChange={e => setEditingLesson({...editingLesson, xp_reward: parseInt(e.target.value) || 100})} />
                      </div>
                      <Textarea placeholder="Content..." value={editingLesson.content} onChange={e => setEditingLesson({...editingLesson, content: e.target.value})} className="min-h-[150px]" />
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateLesson}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditingLesson(null)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loadingData ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead>XP</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lessons.map(l => (
                        <TableRow key={l.id}>
                          <TableCell className="font-medium">{l.title}</TableCell>
                          <TableCell><Badge variant="outline">{l.category}</Badge></TableCell>
                          <TableCell><Badge variant="secondary">{l.difficulty}</Badge></TableCell>
                          <TableCell className="font-mono">{l.xp_reward}</TableCell>
                          <TableCell className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setEditingLesson(l)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteLesson(l.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {lessons.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No lessons yet</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Knowledge Base Tab */}
          <TabsContent value="knowledge">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Knowledge Base Management</CardTitle>
                  <CardDescription>Manage AI knowledge base entries used by the chat assistant</CardDescription>
                </div>
                <Button onClick={() => setShowAddKB(!showAddKB)}>
                  <Plus className="w-4 h-4 mr-1" /> Add Entry
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {showAddKB && (
                  <Card className="border-dashed border-2 border-primary/30">
                    <CardContent className="pt-6 space-y-3">
                      <Input placeholder="Title" value={newKB.title} onChange={e => setNewKB({...newKB, title: e.target.value})} />
                      <Input placeholder="Category (optional)" value={newKB.category} onChange={e => setNewKB({...newKB, category: e.target.value})} />
                      <Textarea placeholder="Content..." value={newKB.content} onChange={e => setNewKB({...newKB, content: e.target.value})} className="min-h-[120px]" />
                      <div className="flex gap-2">
                        <Button onClick={handleAddKB}>Save</Button>
                        <Button variant="outline" onClick={() => setShowAddKB(false)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {editingKB && (
                  <Card className="border-2 border-primary/50 bg-primary/5">
                    <CardHeader><CardTitle className="text-lg">Editing: {editingKB.title}</CardTitle></CardHeader>
                    <CardContent className="space-y-3">
                      <Input placeholder="Title" value={editingKB.title} onChange={e => setEditingKB({...editingKB, title: e.target.value})} />
                      <Input placeholder="Category" value={editingKB.category || ''} onChange={e => setEditingKB({...editingKB, category: e.target.value})} />
                      <Textarea placeholder="Content..." value={editingKB.content} onChange={e => setEditingKB({...editingKB, content: e.target.value})} className="min-h-[150px]" />
                      <div className="flex gap-2">
                        <Button onClick={handleUpdateKB}>Save Changes</Button>
                        <Button variant="outline" onClick={() => setEditingKB(null)}>Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {loadingData ? (
                  <div className="flex justify-center py-8"><Loader2 className="w-6 h-6 animate-spin" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Content Preview</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {knowledgeBase.map(kb => (
                        <TableRow key={kb.id}>
                          <TableCell className="font-medium">{kb.title}</TableCell>
                          <TableCell><Badge variant="outline">{kb.category || 'General'}</Badge></TableCell>
                          <TableCell className="max-w-xs truncate text-sm text-muted-foreground">{kb.content.slice(0, 80)}...</TableCell>
                          <TableCell className="text-sm text-muted-foreground">{kb.created_at ? new Date(kb.created_at).toLocaleDateString() : '-'}</TableCell>
                          <TableCell className="flex gap-1">
                            <Button variant="ghost" size="sm" onClick={() => setEditingKB(kb)}><Pencil className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteKB(kb.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {knowledgeBase.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No knowledge base entries</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Tab */}
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Management</CardTitle>
                <CardDescription>Manage subscription plan pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {plans.map(plan => (
                    <Card key={plan.id} className="border">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold">{plan.display_name}</h3>
                            <p className="text-muted-foreground text-sm">Plan: {plan.name}</p>
                          </div>
                          {editingPlan?.id === plan.id ? (
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold">₹</span>
                              <Input 
                                type="number" className="w-32" value={editingPlan.price} 
                                onChange={e => setEditingPlan({...editingPlan, price: parseInt(e.target.value) || 0})} 
                              />
                              <Button size="sm" onClick={() => handleUpdatePlanPrice(plan.id, editingPlan.price)}>Save</Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold font-display">₹{plan.price}</span>
                              <span className="text-muted-foreground">/month</span>
                              {plan.name !== 'free' && (
                                <Button variant="ghost" size="sm" onClick={() => setEditingPlan(plan)}>
                                  <Pencil className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {Object.entries(plan.features || {}).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="text-xs">
                              {key}: {String(value)}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
