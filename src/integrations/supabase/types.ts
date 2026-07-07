export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          request_count: number
          revoked: boolean
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          request_count?: number
          revoked?: boolean
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          request_count?: number
          revoked?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      certifications: {
        Row: {
          badge_color: string
          category: string
          created_at: string
          description: string | null
          id: string
          required_xp: number
          title: string
          updated_at: string
        }
        Insert: {
          badge_color?: string
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          required_xp?: number
          title: string
          updated_at?: string
        }
        Update: {
          badge_color?: string
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          required_xp?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      knowledge_base: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          embedding: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          embedding?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      lab_portfolio: {
        Row: {
          created_at: string | null
          id: string
          is_public: boolean | null
          live_url: string | null
          readme: string
          resume_bullet: string
          submission_id: string | null
          tags: Json | null
          title: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          live_url?: string | null
          readme: string
          resume_bullet: string
          submission_id?: string | null
          tags?: Json | null
          title: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          live_url?: string | null
          readme?: string
          resume_bullet?: string
          submission_id?: string | null
          tags?: Json | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_portfolio_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "lab_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      lab_projects: {
        Row: {
          brief: string
          created_at: string | null
          difficulty: string
          id: string
          language: string
          rubric: Json
          slug: string
          starter_code: string | null
          title: string
          topic: string
        }
        Insert: {
          brief: string
          created_at?: string | null
          difficulty?: string
          id?: string
          language?: string
          rubric?: Json
          slug: string
          starter_code?: string | null
          title: string
          topic: string
        }
        Update: {
          brief?: string
          created_at?: string | null
          difficulty?: string
          id?: string
          language?: string
          rubric?: Json
          slug?: string
          starter_code?: string | null
          title?: string
          topic?: string
        }
        Relationships: []
      }
      lab_roadmaps: {
        Row: {
          current_week: number
          goal: string
          plan: Json
          updated_at: string | null
          user_id: string
        }
        Insert: {
          current_week?: number
          goal?: string
          plan?: Json
          updated_at?: string | null
          user_id: string
        }
        Update: {
          current_week?: number
          goal?: string
          plan?: Json
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lab_submissions: {
        Row: {
          code: string
          created_at: string | null
          id: string
          project_id: string
          review: Json | null
          score: number | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          project_id: string
          review?: Json | null
          score?: number | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          project_id?: string
          review?: Json | null
          score?: number | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lab_submissions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "lab_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          category: string
          content: string | null
          created_at: string | null
          description: string | null
          difficulty: string
          id: string
          title: string
          updated_at: string | null
          xp_reward: number
        }
        Insert: {
          category?: string
          content?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string
          id?: string
          title: string
          updated_at?: string | null
          xp_reward?: number
        }
        Update: {
          category?: string
          content?: string | null
          created_at?: string | null
          description?: string | null
          difficulty?: string
          id?: string
          title?: string
          updated_at?: string | null
          xp_reward?: number
        }
        Relationships: []
      }
      mentor_events: {
        Row: {
          created_at: string | null
          id: string
          kind: string
          meta: Json | null
          summary: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          kind: string
          meta?: Json | null
          summary: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          kind?: string
          meta?: Json | null
          summary?: string
          user_id?: string
        }
        Relationships: []
      }
      mentor_profiles: {
        Row: {
          created_at: string | null
          goal: string | null
          interests: Json | null
          notes: string | null
          strengths: Json | null
          updated_at: string | null
          user_id: string
          weaknesses: Json | null
        }
        Insert: {
          created_at?: string | null
          goal?: string | null
          interests?: Json | null
          notes?: string | null
          strengths?: Json | null
          updated_at?: string | null
          user_id: string
          weaknesses?: Json | null
        }
        Update: {
          created_at?: string | null
          goal?: string | null
          interests?: Json | null
          notes?: string | null
          strengths?: Json | null
          updated_at?: string | null
          user_id?: string
          weaknesses?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          blocked: boolean
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          level: string | null
          phone_number: string | null
          updated_at: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          blocked?: boolean
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          level?: string | null
          phone_number?: string | null
          updated_at?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          blocked?: boolean
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          level?: string | null
          phone_number?: string | null
          updated_at?: string | null
          xp?: number | null
        }
        Relationships: []
      }
      skill_scores: {
        Row: {
          id: string
          score: number
          skill: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          score?: number
          skill: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          score?: number
          skill?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string | null
          display_name: string
          features: Json | null
          id: string
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          display_name: string
          features?: Json | null
          id?: string
          name: string
          price?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          display_name?: string
          features?: Json | null
          id?: string
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          id: string
          plan_id: string
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          plan_id: string
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          plan_id?: string
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_tracking: {
        Row: {
          count: number
          created_at: string | null
          feature: string
          id: string
          reset_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          count?: number
          created_at?: string | null
          feature: string
          id?: string
          reset_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          count?: number
          created_at?: string | null
          feature?: string
          id?: string
          reset_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_certifications: {
        Row: {
          certificate_number: string
          certification_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          certificate_number?: string
          certification_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          certificate_number?: string
          certification_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_certifications_certification_id_fkey"
            columns: ["certification_id"]
            isOneToOne: false
            referencedRelation: "certifications"
            referencedColumns: ["id"]
          },
        ]
      }
      user_lesson_progress: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          lesson_id: string
          user_id: string
          xp_earned: number
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id: string
          user_id: string
          xp_earned?: number
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lesson_id?: string
          user_id?: string
          xp_earned?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      match_knowledge_base: {
        Args: {
          match_count?: number
          match_threshold?: number
          query_embedding: string
        }
        Returns: {
          category: string
          content: string
          id: string
          similarity: number
          title: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
