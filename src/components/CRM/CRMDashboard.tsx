import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Phone, 
  Mail, 
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Plus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { crmService } from '../../services/crmService';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  status: 'Lead' | 'Active' | 'Past';
  tags: string[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'prospect' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  contact_id?: string;
  expected_close_date?: string;
  created_at: string;
}

interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  description: string;
  contact_id?: string;
  deal_id?: string;
  created_at: string;
}

const CRMDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'contacts' | 'deals' | 'activities'>('contacts');
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // 🆕 NEW: Load CRM data
  useEffect(() => {
    if (user) {
      loadCRMData();
    }
  }, [user]);

  const loadCRMData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const [contactsData, dealsData, activitiesData] = await Promise.all([
        crmService.getContacts(user.id),
        crmService.getDeals(user.id),
        crmService.getActivities(user.id)
      ]);
      
      setContacts(contactsData);
      setDeals(dealsData);
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error loading CRM data:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🆕 NEW: Filter contacts based on search and status
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchQuery === '' || 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // 🆕 NEW: CRM Stats
  const stats = {
    totalContacts: contacts.length,
    leads: contacts.filter(c => c.status === 'Lead').length,
    activeContacts: contacts.filter(c => c.status === 'Active').length,
    totalDeals: deals.length,
    dealValue: deals.reduce((sum, deal) => sum + deal.value, 0),
    wonDeals: deals.filter(d => d.stage === 'closed-won').length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lead': return 'var(--status-lead-color-aurora)';
      case 'Active': return 'var(--status-active-color-aurora)';
      case 'Past': return 'var(--status-past-color-aurora)';
      default: return 'var(--aurora-text-secondary)';
    }
  };

  const ContactCard: React.FC<{ contact: Contact }> = ({ contact }) => (
    <div className="aurora-card rounded-lg p-4 aurora-glow-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center"
               style={{ background: 'var(--aurora-glow-vibrant)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--aurora-bg-dark)' }}>
              {contact.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-medium aurora-text-primary">{contact.name}</h3>
            <p className="text-sm aurora-text-secondary">{contact.company}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span 
            className="px-2 py-1 rounded-full text-xs font-medium aurora-status-badge"
            style={{ 
              backgroundColor: `${getStatusColor(contact.status)}20`,
              color: getStatusColor(contact.status),
              border: `1px solid ${getStatusColor(contact.status)}40`
            }}
          >
            {contact.status}
          </span>
          <button className="p-1 rounded aurora-button-secondary">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm aurora-text-secondary">
          <Mail className="w-4 h-4" />
          <span>{contact.email}</span>
        </div>
        {contact.phone && (
          <div className="flex items-center space-x-2 text-sm aurora-text-secondary">
            <Phone className="w-4 h-4" />
            <span>{contact.phone}</span>
          </div>
        )}
      </div>
      
      {contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {contact.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full aurora-nav-item"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="aurora-card rounded-lg p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-current border-t-transparent rounded-full mx-auto mb-4"
               style={{ borderColor: 'var(--aurora-glow-vibrant)' }}></div>
          <p className="aurora-text-secondary">Loading CRM data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* 🆕 NEW: CRM Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold aurora-text-primary mb-2">Customer Relationship Management</h1>
        <p className="aurora-text-secondary">Manage your contacts, deals, and customer interactions</p>
      </div>

      {/* 🆕 NEW: CRM Stats with Aurora theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="aurora-card aurora-glow-hover rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium aurora-text-secondary mb-1">Total Contacts</p>
              <p className="text-2xl font-bold aurora-text-primary">{stats.totalContacts}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center aurora-icon-glow"
                 style={{ backgroundColor: `var(--aurora-glow-vibrant)20`, border: `1px solid var(--aurora-glow-vibrant)40` }}>
              <Users className="w-6 h-6" style={{ color: 'var(--aurora-glow-vibrant)' }} />
            </div>
          </div>
        </div>

        <div className="aurora-card aurora-glow-hover rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium aurora-text-secondary mb-1">Active Leads</p>
              <p className="text-2xl font-bold aurora-text-primary">{stats.leads}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center aurora-icon-glow"
                 style={{ backgroundColor: `var(--aurora-glow-accent-green)20`, border: `1px solid var(--aurora-glow-accent-green)40` }}>
              <TrendingUp className="w-6 h-6" style={{ color: 'var(--aurora-glow-accent-green)' }} />
            </div>
          </div>
        </div>

        <div className="aurora-card aurora-glow-hover rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium aurora-text-secondary mb-1">Total Deals</p>
              <p className="text-2xl font-bold aurora-text-primary">{stats.totalDeals}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center aurora-icon-glow"
                 style={{ backgroundColor: `var(--aurora-glow-accent-purple)20`, border: `1px solid var(--aurora-glow-accent-purple)40` }}>
              <DollarSign className="w-6 h-6" style={{ color: 'var(--aurora-glow-accent-purple)' }} />
            </div>
          </div>
        </div>

        <div className="aurora-card aurora-glow-hover rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium aurora-text-secondary mb-1">Deal Value</p>
              <p className="text-2xl font-bold aurora-text-primary">${stats.dealValue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 rounded-lg flex items-center justify-center aurora-icon-glow"
                 style={{ backgroundColor: `var(--status-planning-color-aurora)20`, border: `1px solid var(--status-planning-color-aurora)40` }}>
              <Calendar className="w-6 h-6" style={{ color: 'var(--status-planning-color-aurora)' }} />
            </div>
          </div>
        </div>
      </div>

      {/* 🆕 NEW: CRM Navigation Tabs with Aurora theme */}
      <div className="mb-6">
        <div className="flex space-x-2">
          {[
            { id: 'contacts', name: 'Contacts', icon: Users },
            { id: 'deals', name: 'Deals', icon: DollarSign },
            { id: 'activities', name: 'Activities', icon: Calendar }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'aurora-button-primary'
                    : 'aurora-button-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🆕 NEW: Search and Filter Bar with Aurora theme */}
      <div className="mb-6 aurora-card rounded-lg p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2 flex-1">
            <Search className="w-4 h-4 aurora-text-secondary" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="aurora-input flex-1 px-3 py-2 rounded-lg"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="aurora-input px-3 py-2 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="Lead">Leads</option>
              <option value="Active">Active</option>
              <option value="Past">Past</option>
            </select>
            
            <button className="aurora-button-primary flex items-center space-x-2 px-4 py-2 rounded-lg">
              <Plus className="w-4 h-4" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🆕 NEW: CRM Content with Aurora theme */}
      <div className="space-y-6">
        {activeTab === 'contacts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
            {filteredContacts.length === 0 && (
              <div className="col-span-full aurora-card rounded-lg p-8 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 aurora-text-secondary" />
                <h3 className="text-lg font-semibold aurora-text-primary mb-2">No contacts found</h3>
                <p className="aurora-text-secondary">Start by adding your first contact</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'deals' && (
          <div className="aurora-card rounded-lg p-8 text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-4 aurora-text-secondary" />
            <h3 className="text-lg font-semibold aurora-text-primary mb-2">Deals Management</h3>
            <p className="aurora-text-secondary">Track your sales pipeline and opportunities</p>
          </div>
        )}

        {activeTab === 'activities' && (
          <div className="aurora-card rounded-lg p-8 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 aurora-text-secondary" />
            <h3 className="text-lg font-semibold aurora-text-primary mb-2">Activity Timeline</h3>
            <p className="aurora-text-secondary">View all customer interactions and activities</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CRMDashboard;