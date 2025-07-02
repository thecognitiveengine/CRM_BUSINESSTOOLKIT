import { supabase } from '../utils/supabaseClient';
import type { Database } from '../utils/supabaseClient';

// 🆕 NEW ENHANCEMENT: Comprehensive CRM service with full CRUD operations
type Contact = Database['public']['Tables']['contacts']['Row'];
type ContactInsert = Database['public']['Tables']['contacts']['Insert'];
type ContactUpdate = Database['public']['Tables']['contacts']['Update'];

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskUpdate = Database['public']['Tables']['tasks']['Update'];

type CalendarEvent = Database['public']['Tables']['calendar_events']['Row'];
type CalendarEventInsert = Database['public']['Tables']['calendar_events']['Insert'];
type CalendarEventUpdate = Database['public']['Tables']['calendar_events']['Update'];

type Deal = Database['public']['Tables']['deals']['Row'];
type DealInsert = Database['public']['Tables']['deals']['Insert'];
type DealUpdate = Database['public']['Tables']['deals']['Update'];

type Activity = Database['public']['Tables']['activities']['Row'];
type ActivityInsert = Database['public']['Tables']['activities']['Insert'];

class CRMService {
  // 🆕 NEW: CONTACTS CRUD OPERATIONS
  async getContacts(userId: string): Promise<Contact[]> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  }

  async getContact(id: string): Promise<Contact | null> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  }

  async createContact(contact: ContactInsert): Promise<Contact> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          ...contact,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  async updateContact(id: string, updates: ContactUpdate): Promise<Contact> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  async deleteContact(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }

  // 🆕 NEW: TASKS CRUD OPERATIONS
  async getTasks(userId: string): Promise<Task[]> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          *,
          contacts (
            id,
            name,
            email
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(task: TaskInsert): Promise<Task> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          ...task,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id: string, updates: TaskUpdate): Promise<Task> {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  // 🆕 NEW: CALENDAR EVENTS CRUD OPERATIONS
  async getCalendarEvents(userId: string): Promise<CalendarEvent[]> {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .select(`
          *,
          contacts (
            id,
            name,
            email
          )
        `)
        .eq('user_id', userId)
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }

  async createCalendarEvent(event: CalendarEventInsert): Promise<CalendarEvent> {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .insert({
          ...event,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      throw error;
    }
  }

  async updateCalendarEvent(id: string, updates: CalendarEventUpdate): Promise<CalendarEvent> {
    try {
      const { data, error } = await supabase
        .from('calendar_events')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating calendar event:', error);
      throw error;
    }
  }

  async deleteCalendarEvent(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('calendar_events')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      throw error;
    }
  }

  // 🆕 NEW: DEALS CRUD OPERATIONS
  async getDeals(userId: string): Promise<Deal[]> {
    try {
      const { data, error } = await supabase
        .from('deals')
        .select(`
          *,
          contacts (
            id,
            name,
            email
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  }

  async createDeal(deal: DealInsert): Promise<Deal> {
    try {
      const { data, error } = await supabase
        .from('deals')
        .insert({
          ...deal,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  }

  async updateDeal(id: string, updates: DealUpdate): Promise<Deal> {
    try {
      const { data, error } = await supabase
        .from('deals')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  }

  async deleteDeal(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting deal:', error);
      throw error;
    }
  }

  // 🆕 NEW: ACTIVITIES CRUD OPERATIONS
  async getActivities(userId: string, contactId?: string, dealId?: string): Promise<Activity[]> {
    try {
      let query = supabase
        .from('activities')
        .select(`
          *,
          contacts (
            id,
            name,
            email
          ),
          deals (
            id,
            title,
            value
          )
        `)
        .eq('user_id', userId);

      if (contactId) {
        query = query.eq('contact_id', contactId);
      }

      if (dealId) {
        query = query.eq('deal_id', dealId);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  }

  async createActivity(activity: ActivityInsert): Promise<Activity> {
    try {
      const { data, error } = await supabase
        .from('activities')
        .insert(activity)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }

  // 🆕 NEW: ANALYTICS AND REPORTING
  async getDashboardStats(userId: string) {
    try {
      const [contactsResult, tasksResult, dealsResult, activitiesResult] = await Promise.all([
        supabase.from('contacts').select('id, status').eq('user_id', userId),
        supabase.from('tasks').select('id, status').eq('user_id', userId),
        supabase.from('deals').select('id, stage, value').eq('user_id', userId),
        supabase.from('activities').select('id, type').eq('user_id', userId)
      ]);

      const contacts = contactsResult.data || [];
      const tasks = tasksResult.data || [];
      const deals = dealsResult.data || [];
      const activities = activitiesResult.data || [];

      return {
        contacts: {
          total: contacts.length,
          leads: contacts.filter(c => c.status === 'Lead').length,
          active: contacts.filter(c => c.status === 'Active').length,
          past: contacts.filter(c => c.status === 'Past').length
        },
        tasks: {
          total: tasks.length,
          todo: tasks.filter(t => t.status === 'todo').length,
          inProgress: tasks.filter(t => t.status === 'in-progress').length,
          completed: tasks.filter(t => t.status === 'completed').length
        },
        deals: {
          total: deals.length,
          totalValue: deals.reduce((sum, d) => sum + d.value, 0),
          won: deals.filter(d => d.stage === 'closed-won').length,
          lost: deals.filter(d => d.stage === 'closed-lost').length,
          active: deals.filter(d => !['closed-won', 'closed-lost'].includes(d.stage)).length
        },
        activities: {
          total: activities.length,
          calls: activities.filter(a => a.type === 'call').length,
          emails: activities.filter(a => a.type === 'email').length,
          meetings: activities.filter(a => a.type === 'meeting').length,
          notes: activities.filter(a => a.type === 'note').length
        }
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  // 🆕 NEW: SEARCH AND FILTERING
  async searchContacts(userId: string, query: string): Promise<Contact[]> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', userId)
        .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error searching contacts:', error);
      throw error;
    }
  }

  // 🆕 NEW: BULK OPERATIONS
  async bulkUpdateContacts(ids: string[], updates: ContactUpdate): Promise<Contact[]> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .in('id', ids)
        .select();

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error bulk updating contacts:', error);
      throw error;
    }
  }

  async bulkDeleteContacts(ids: string[]): Promise<void> {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .in('id', ids);

      if (error) throw error;
    } catch (error) {
      console.error('Error bulk deleting contacts:', error);
      throw error;
    }
  }
}

export const crmService = new CRMService();
export default crmService;