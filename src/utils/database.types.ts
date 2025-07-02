export interface Database {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone?: string;
          tags?: string[];
          status: 'Lead' | 'Active' | 'Past';
          notes?: string;
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
          description?: string;
          status: 'todo' | 'in-progress' | 'completed';
          priority: 'low' | 'medium' | 'high';
          due_date?: string;
          contact_id?: string;
          project_id?: string;
          estimated_hours?: number;
          actual_hours?: number;
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
          description?: string;
          start_date: string;
          end_date: string;
          contact_id?: string;
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
          value: number;
          stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
          contact_id?: string;
          expected_close_date?: string;
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
          type: 'call' | 'email' | 'meeting' | 'note';
          title: string;
          description: string;
          contact_id?: string;
          deal_id?: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['activities']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['activities']['Insert']>;
      };
    };
  };
}
