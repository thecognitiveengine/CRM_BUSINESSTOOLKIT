import { describe, it, expect, beforeEach, vi } from 'vitest';
import { crmService } from '../src/services/crmService';

// 🆕 PRODUCTION-GRADE TESTING SUITE
// Mock Supabase client
vi.mock('../src/utils/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            data: [],
            error: null
          }))
        }))
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({
            data: { id: '123', title: 'Test Task' },
            error: null
          }))
        }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(() => ({
              data: { id: '123', title: 'Updated Task' },
              error: null
            }))
          }))
        }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({
          error: null
        }))
      }))
    }))
  }
}));

describe('CRM Service', () => {
  const mockUserId = 'user-123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Contacts CRUD', () => {
    it('should fetch contacts for a user', async () => {
      const contacts = await crmService.getContacts(mockUserId);
      expect(Array.isArray(contacts)).toBe(true);
    });

    it('should create a new contact', async () => {
      const contactData = {
        user_id: mockUserId,
        name: 'John Doe',
        email: 'john@example.com',
        status: 'Lead' as const
      };

      const result = await crmService.createContact(contactData);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
    });

    it('should update an existing contact', async () => {
      const contactId = '123';
      const updates = { name: 'Jane Doe' };

      const result = await crmService.updateContact(contactId, updates);
      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Updated Task');
    });

    it('should delete a contact', async () => {
      const contactId = '123';
      await expect(crmService.deleteContact(contactId)).resolves.not.toThrow();
    });
  });

  describe('Tasks CRUD', () => {
    it('should fetch tasks for a user', async () => {
      const tasks = await crmService.getTasks(mockUserId);
      expect(Array.isArray(tasks)).toBe(true);
    });

    it('should create a new task', async () => {
      const taskData = {
        user_id: mockUserId,
        title: 'Test Task',
        status: 'todo' as const,
        priority: 'medium' as const
      };

      const result = await crmService.createTask(taskData);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
    });

    it('should update an existing task', async () => {
      const taskId = '123';
      const updates = { title: 'Updated Task' };

      const result = await crmService.updateTask(taskId, updates);
      expect(result).toHaveProperty('id');
      expect(result.title).toBe('Updated Task');
    });

    it('should delete a task', async () => {
      const taskId = '123';
      await expect(crmService.deleteTask(taskId)).resolves.not.toThrow();
    });
  });

  describe('Calendar Events CRUD', () => {
    it('should fetch calendar events for a user', async () => {
      const events = await crmService.getCalendarEvents(mockUserId);
      expect(Array.isArray(events)).toBe(true);
    });

    it('should create a new calendar event', async () => {
      const eventData = {
        user_id: mockUserId,
        title: 'Test Meeting',
        start_date: new Date().toISOString(),
        end_date: new Date(Date.now() + 3600000).toISOString()
      };

      const result = await crmService.createCalendarEvent(eventData);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
    });
  });

  describe('Deals CRUD', () => {
    it('should fetch deals for a user', async () => {
      const deals = await crmService.getDeals(mockUserId);
      expect(Array.isArray(deals)).toBe(true);
    });

    it('should create a new deal', async () => {
      const dealData = {
        user_id: mockUserId,
        title: 'Test Deal',
        value: 10000,
        stage: 'prospect' as const
      };

      const result = await crmService.createDeal(dealData);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
    });
  });

  describe('Activities CRUD', () => {
    it('should fetch activities for a user', async () => {
      const activities = await crmService.getActivities(mockUserId);
      expect(Array.isArray(activities)).toBe(true);
    });

    it('should create a new activity', async () => {
      const activityData = {
        user_id: mockUserId,
        type: 'call' as const,
        title: 'Test Call',
        description: 'Called client about proposal'
      };

      const result = await crmService.createActivity(activityData);
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('title');
    });
  });

  describe('Analytics and Reporting', () => {
    it('should fetch dashboard stats', async () => {
      const stats = await crmService.getDashboardStats(mockUserId);
      expect(stats).toHaveProperty('contacts');
      expect(stats).toHaveProperty('tasks');
      expect(stats).toHaveProperty('deals');
      expect(stats).toHaveProperty('activities');
    });
  });

  describe('Search and Filtering', () => {
    it('should search contacts by query', async () => {
      const query = 'john';
      const results = await crmService.searchContacts(mockUserId, query);
      expect(Array.isArray(results)).toBe(true);
    });
  });

  describe('Bulk Operations', () => {
    it('should bulk update contacts', async () => {
      const ids = ['123', '456'];
      const updates = { status: 'Active' as const };

      const results = await crmService.bulkUpdateContacts(ids, updates);
      expect(Array.isArray(results)).toBe(true);
    });

    it('should bulk delete contacts', async () => {
      const ids = ['123', '456'];
      await expect(crmService.bulkDeleteContacts(ids)).resolves.not.toThrow();
    });
  });
});