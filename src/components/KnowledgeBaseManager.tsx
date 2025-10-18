import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Plus, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
}

export const KnowledgeBaseManager = () => {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    content: "",
    category: "general",
  });

  useEffect(() => {
    loadKnowledgeBase();
  }, []);

  const loadKnowledgeBase = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("knowledge_base")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      toast.error("Failed to load knowledge base");
    } finally {
      setLoading(false);
    }
  };

  const addToKnowledge = async () => {
    if (!newItem.title.trim() || !newItem.content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    setAdding(true);
    try {
      const { data, error } = await supabase.functions.invoke("prompt-ai", {
        body: {
          action: "embed",
          addToKnowledge: newItem,
        },
      });

      if (error) {
        throw error;
      }

      toast.success("Added to knowledge base!");
      setNewItem({ title: "", content: "", category: "general" });
      loadKnowledgeBase();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to add to knowledge base");
    } finally {
      setAdding(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase.from("knowledge_base").delete().eq("id", id);

      if (error) throw error;
      toast.success("Deleted from knowledge base");
      loadKnowledgeBase();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          Knowledge Base Manager
        </CardTitle>
        <CardDescription>
          Add documentation and content for RAG-powered responses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new item form */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h3 className="font-semibold">Add New Content</h3>
          <Input
            placeholder="Title (e.g., 'Chain of Thought Technique')"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <Textarea
            placeholder="Content (detailed information about this topic)"
            value={newItem.content}
            onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
            className="min-h-[120px]"
          />
          <Input
            placeholder="Category (e.g., 'techniques', 'best-practices')"
            value={newItem.category}
            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          />
          <Button onClick={addToKnowledge} disabled={adding} className="w-full">
            {adding ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Add to Knowledge Base
              </>
            )}
          </Button>
        </div>

        {/* List existing items */}
        <div className="space-y-2">
          <h3 className="font-semibold">Current Knowledge ({items.length} items)</h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No content yet. Add some documentation above!
            </p>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border rounded-lg flex items-start justify-between gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{item.title}</h4>
                      <Badge variant="secondary" className="shrink-0">
                        {item.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.content}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteItem(item.id)}
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
