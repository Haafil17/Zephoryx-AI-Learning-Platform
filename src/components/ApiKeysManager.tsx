import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Copy, Ban, Plus, KeyRound, Trash2 } from 'lucide-react';

interface ApiKeyRow {
  id: string;
  name: string;
  key_prefix: string;
  revoked: boolean;
  last_used_at: string | null;
  request_count: number;
  created_at: string;
}

const PROJECT_REF = 'xnkedyucvknvzrkvogog';
const API_BASE = `https://${PROJECT_REF}.supabase.co/functions/v1/public-api`;

async function sha256Hex(input: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

function generateKey() {
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  const raw = Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
  return `zpx_${raw}`;
}

export function ApiKeysManager() {
  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [newKeyName, setNewKeyName] = useState('');
  const [creating, setCreating] = useState(false);
  const [freshKey, setFreshKey] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('api_keys')
      .select('id, name, key_prefix, revoked, last_used_at, request_count, created_at')
      .order('created_at', { ascending: false });
    if (error) toast.error(error.message);
    else setKeys((data || []) as ApiKeyRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createKey = async () => {
    if (!newKeyName.trim()) { toast.error('Name required'); return; }
    setCreating(true);
    const raw = generateKey();
    const hash = await sha256Hex(raw);
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from('api_keys').insert({
      name: newKeyName.trim(),
      key_hash: hash,
      key_prefix: raw.slice(0, 12),
      created_by: userData.user?.id,
    });
    setCreating(false);
    if (error) { toast.error(error.message); return; }
    setFreshKey(raw);
    setNewKeyName('');
    load();
  };

  const toggleRevoke = async (row: ApiKeyRow) => {
    const { error } = await supabase.from('api_keys').update({ revoked: !row.revoked }).eq('id', row.id);
    if (error) toast.error(error.message);
    else { toast.success(row.revoked ? 'Key re-enabled' : 'Key revoked'); load(); }
  };

  const deleteKey = async (id: string) => {
    if (!confirm('Delete this API key permanently?')) return;
    const { error } = await supabase.from('api_keys').delete().eq('id', id);
    if (error) toast.error(error.message);
    else { toast.success('Deleted'); load(); }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold font-display flex items-center gap-2">
          <KeyRound className="w-6 h-6" /> Public API Keys
        </h2>
        <p className="text-sm text-muted-foreground">Issue keys so other websites can call the Zephoryx AI Lab API.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create new key</CardTitle>
          <CardDescription>The full key is shown once — copy it now, we only store its hash.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="e.g. Partner Website" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} />
            <Button onClick={createKey} disabled={creating}>
              <Plus className="w-4 h-4 mr-1" /> Create
            </Button>
          </div>
          {freshKey && (
            <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 rounded-lg p-4 space-y-2">
              <p className="text-sm font-semibold text-amber-900 dark:text-amber-200">Save this key now — it won't be shown again:</p>
              <div className="flex gap-2 items-center">
                <code className="flex-1 text-xs bg-background p-2 rounded border break-all">{freshKey}</code>
                <Button size="sm" variant="outline" onClick={() => copy(freshKey)}><Copy className="w-3 h-3" /></Button>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setFreshKey(null)}>Dismiss</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing keys ({keys.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <p className="text-sm text-muted-foreground">Loading…</p> : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Prefix</TableHead>
                  <TableHead>Requests</TableHead>
                  <TableHead>Last used</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((k) => (
                  <TableRow key={k.id}>
                    <TableCell className="font-medium">{k.name}</TableCell>
                    <TableCell><code className="text-xs">{k.key_prefix}…</code></TableCell>
                    <TableCell>{k.request_count}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{k.last_used_at ? new Date(k.last_used_at).toLocaleString() : '—'}</TableCell>
                    <TableCell>
                      {k.revoked ? <Badge variant="destructive">Revoked</Badge> : <Badge className="bg-green-600">Active</Badge>}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button size="sm" variant="outline" onClick={() => toggleRevoke(k)}>
                        <Ban className="w-3 h-3 mr-1" /> {k.revoked ? 'Enable' : 'Revoke'}
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => deleteKey(k.id)}>
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {keys.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-6">No API keys yet</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>Base URL: <code className="text-xs">{API_BASE}</code></CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <p className="font-semibold mb-1">Authentication</p>
            <p className="text-muted-foreground">Send your key in the <code>X-API-Key</code> header on every request.</p>
          </div>

          <div>
            <p className="font-semibold mb-1">Endpoints</p>
            <ul className="space-y-1 text-muted-foreground">
              <li><code>GET  /topics</code> — list all learning topics</li>
              <li><code>GET  /lessons</code> — full lesson catalog</li>
              <li><code>GET  /models</code> — AI model comparison data</li>
              <li><code>GET  /certificate/verify?number=ZEPH-XXXX</code> — verify certificate</li>
              <li><code>POST /ai/chat</code> — body: <code>{'{ prompt, system? }'}</code></li>
              <li><code>POST /ai/analyze-prompt</code> — body: <code>{'{ prompt }'}</code></li>
              <li><code>POST /ai/embed</code> — body: <code>{'{ input }'}</code> (vector embeddings)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-1">Example (curl)</p>
            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`curl -X POST ${API_BASE}/ai/chat \\
  -H "X-API-Key: YOUR_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt":"Explain RAG in one sentence"}'`}
            </pre>
          </div>

          <div>
            <p className="font-semibold mb-1">Example (JavaScript)</p>
            <pre className="bg-muted p-3 rounded text-xs overflow-x-auto">
{`const res = await fetch("${API_BASE}/ai/chat", {
  method: "POST",
  headers: {
    "X-API-Key": "YOUR_KEY",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ prompt: "Explain RAG in one sentence" }),
});
const { result } = await res.json();`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
