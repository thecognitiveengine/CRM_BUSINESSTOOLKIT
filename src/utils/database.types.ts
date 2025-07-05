export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          company_name: string | null;
          industry: string | null;
          team_size: number;
          timezone: string;
          preferences: any;
          subscription_tier: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['user_profiles']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['user_profiles']['Insert']>;
      };
      contacts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string | null;
          company: string | null;
          position: string | null;
          tags: string[];
          status: 'Lead' | 'Active' | 'Past';
          notes: string | null;
          address: any;
          social_links: any;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contacts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['contacts']['Insert']>;
      };
      tasks: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          status: 'todo' | 'in-progress' | 'completed';
          priority: 'low' | 'medium' | 'high';
          due_date: string | null;
          contact_id: string | null;
          project_id: string | null;
          estimated_hours: number | null;
          actual_hours: number | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tasks']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tasks']['Insert']>;
      };
      calendar_events: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          start_date: string;
          end_date: string;
          all_day: boolean;
          location: string | null;
          contact_id: string | null;
          event_type: 'meeting' | 'call' | 'deadline' | 'reminder' | 'other';
          recurrence_rule: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['calendar_events']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['calendar_events']['Insert']>;
      };
      deals: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          value: number;
          currency: string;
          stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
          probability: number;
          contact_id: string | null;
          expected_close_date: string | null;
          actual_close_date: string | null;
          source: string | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['deals']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['deals']['Insert']>;
      };
      activities: {
        Row: {
          id: string;
          user_id: string;
          type: 'call' | 'email' | 'meeting' | 'note' | 'task' | 'deal_update';
          title: string;
          description: string;
          contact_id: string | null;
          deal_id: string | null;
          task_id: string | null;
          duration_minutes: number | null;
          outcome: string | null;
          follow_up_date: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['activities']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['activities']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          description: string | null;
          status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
          priority: 'low' | 'medium' | 'high' | 'urgent';
          start_date: string | null;
          end_date: string | null;
          budget: number | null;
          spent: number;
          progress: number;
          contact_id: string | null;
          tags: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
    };
  };
}