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
  Ban, CheckCircle, Loader2, RefreshCw, Pencil, Trash2, Plus, Search
} from 'lucide-react';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  phone_number: string | null;
  xp: number | null;
  level: string | null;
  created_at: string | null;
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
  created_at: string;
}

const AdminPanel = () => {
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const navigate = useNavigate();

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [lessons, setLessons] = useState<LessonRow[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [editingLesson, setEditingLesson] = useState<LessonRow | null>(null);
  const [newLesson, setNewLesson] = useState({ title: '', description: '', category: 'general', difficulty: 'beginner', content: '', xp_reward: 100 });
  const [showAddLesson, setShowAddLesson] = useState(false);

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
    const [profilesRes, subsRes, lessonsRes, plansRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('subscriptions').select('*').order('created_at', { ascending: false }),
      supabase.from('lessons').select('*').order('created_at', { ascending: false }),
      supabase.from('subscription_plans').select('*').order('price'),
    ]);
    
    if (profilesRes.data) setUsers(profilesRes.data);
    if (subsRes.data) setSubscriptions(subsRes.data);
    if (lessonsRes.data) setLessons(lessonsRes.data);
    if (plansRes.data) setPlans(plansRes.data);
    setLoadingData(false);
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
    if (error) {
      toast.error('Failed to delete lesson');
    } else {
      toast.success('Lesson deleted');
      fetchAllData();
    }
  };

  const handleAddLesson = async () => {
    if (!newLesson.title || !newLesson.content) {
      toast.error('Title and content are required');
      return;
    }
    const { error } = await supabase.from('lessons').insert({
      title: newLesson.title,
      description: newLesson.description,
      category: newLesson.category,
      difficulty: newLesson.difficulty,
      content: newLesson.content,
      xp_reward: newLesson.xp_reward,
    });
    if (error) {
      toast.error('Failed to add lesson');
    } else {
      toast.success('Lesson added');
      setNewLesson({ title: '', description: '', category: 'general', difficulty: 'beginner', content: '', xp_reward: 100 });
      setShowAddLesson(false);
      fetchAllData();
    }
  };

  const filteredUsers = users.filter(u => 
    (u.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (u.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
  );

  if (adminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{users.length}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CreditCard className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{subscriptions.filter(s => s.status === 'active').length}</p>
                  <p className="text-sm text-muted-foreground">Active Subs</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-purple-500" />
                <div>
                  <p className="text-2xl font-bold">{lessons.length}</p>
                  <p className="text-sm text-muted-foreground">Lessons</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-orange-500" />
                <div>
                  <p className="text-2xl font-bold">{plans.length}</p>
                  <p className="text-sm text-muted-foreground">Plans</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users">
          <TabsList className="mb-6">
            <TabsTrigger value="users"><Users className="w-4 h-4 mr-1" /> Users</TabsTrigger>
            <TabsTrigger value="subscriptions"><CreditCard className="w-4 h-4 mr-1" /> Subscriptions</TabsTrigger>
            <TabsTrigger value="content"><FileText className="w-4 h-4 mr-1" /> Content</TabsTrigger>
            <TabsTrigger value="pricing"><Settings className="w-4 h-4 mr-1" /> Pricing</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
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
                        <TableHead>Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map(u => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">{u.email || '-'}</TableCell>
                          <TableCell>{u.full_name || '-'}</TableCell>
                          <TableCell>{u.phone_number || '-'}</TableCell>
                          <TableCell><Badge variant="outline">{u.level || 'AI Beginner'}</Badge></TableCell>
                          <TableCell>{u.xp || 0}</TableCell>
                          <TableCell>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</TableCell>
                        </TableRow>
                      ))}
                      {filteredUsers.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No users found</TableCell>
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
                        <TableHead>User ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Payment Provider</TableHead>
                        <TableHead>Period End</TableHead>
                        <TableHead>Created</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptions.map(s => (
                        <TableRow key={s.id}>
                          <TableCell className="font-mono text-xs">{s.user_id.slice(0, 8)}...</TableCell>
                          <TableCell>
                            <Badge variant={s.status === 'active' ? 'default' : 'destructive'}>
                              {s.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{s.payment_provider || 'None'}</TableCell>
                          <TableCell>{new Date(s.current_period_end).toLocaleDateString()}</TableCell>
                          <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                      {subscriptions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No subscriptions</TableCell>
                        </TableRow>
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
                          <TableCell>{l.xp_reward}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteLesson(l.id)}>
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {lessons.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No lessons yet</TableCell>
                        </TableRow>
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
                                type="number" 
                                className="w-32" 
                                value={editingPlan.price} 
                                onChange={e => setEditingPlan({...editingPlan, price: parseInt(e.target.value) || 0})} 
                              />
                              <Button size="sm" onClick={() => handleUpdatePlanPrice(plan.id, editingPlan.price)}>Save</Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <span className="text-2xl font-bold">₹{plan.price}</span>
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
