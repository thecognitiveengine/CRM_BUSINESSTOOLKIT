import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  Clock,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { dataService } from '../../services/dataService';
import type { CalendarEvent } from '../../services/dataService';

interface CalendarSidebarProps {
  onEventClick?: (event: CalendarEvent) => void;
  onDateSelect?: (date: Date) => void;
}

const CalendarSidebar: React.FC<CalendarSidebarProps> = ({ onEventClick, onDateSelect }) => {
  const { user } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (user) {
      loadEvents();
    }
  }, [user]);

  const loadEvents = async () => {
    if (!user) return;
    
    try {
      const eventsData = await dataService.getCalendarEvents(user.id);
      setEvents(eventsData);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start_date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateSelect?.(date);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'var(--aurora-glow-vibrant)';
      case 'call': return 'var(--aurora-glow-accent-green)';
      case 'deadline': return 'var(--status-high-color-aurora)';
      case 'reminder': return 'var(--status-planning-color-aurora)';
      default: return 'var(--aurora-glow-accent-purple)';
    }
  };

  const days = getDaysInMonth(currentDate);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const todayEvents = getEventsForDate(new Date());
  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="w-80 aurora-sidebar border-l p-4 overflow-y-auto" style={{ borderColor: 'var(--aurora-border-light)' }}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold aurora-text-primary">Calendar</h2>
        <button className="p-1 aurora-text-secondary hover:aurora-text-primary">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Mini Calendar */}
      <div className="aurora-card rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-1 hover:aurora-button-secondary rounded"
          >
            <ChevronLeft className="w-4 h-4 aurora-text-secondary" />
          </button>
          <h3 className="text-sm font-medium aurora-text-primary">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button
            onClick={() => navigateMonth('next')}
            className="p-1 hover:aurora-button-secondary rounded"
          >
            <ChevronRight className="w-4 h-4 aurora-text-secondary" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs aurora-text-secondary p-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (!day) {
              return <div key={index} className="p-1 h-8"></div>;
            }
            
            const dayEvents = getEventsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();
            
            return (
              <button
                key={index}
                onClick={() => handleDateClick(day)}
                className={`p-1 h-8 text-xs rounded hover:aurora-button-secondary transition-colors relative ${
                  isToday ? 'aurora-button-primary' : 
                  isSelected ? 'aurora-button-secondary' : 'aurora-text-primary'
                }`}
              >
                {day.getDate()}
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full"
                       style={{ backgroundColor: 'var(--aurora-glow-vibrant)' }}></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Today's Events */}
      <div className="mb-6">
        <h3 className="text-sm font-medium aurora-text-primary mb-3">Today's Events</h3>
        {todayEvents.length === 0 ? (
          <p className="text-xs aurora-text-secondary">No events today</p>
        ) : (
          <div className="space-y-2">
            {todayEvents.map(event => (
              <div
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className="p-2 aurora-card rounded aurora-glow-hover cursor-pointer transition-all duration-300"
              >
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 rounded-full mt-1.5"
                       style={{ backgroundColor: getEventTypeColor(event.event_type) }}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium aurora-text-primary truncate">{event.title}</p>
                    <div className="flex items-center space-x-2 text-xs aurora-text-secondary mt-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {event.all_day ? 'All day' : formatTime(event.start_date)}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center space-x-2 text-xs aurora-text-secondary mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Selected Date Events */}
      {selectedDate && selectedDate.toDateString() !== new Date().toDateString() && (
        <div>
          <h3 className="text-sm font-medium aurora-text-primary mb-3">
            {selectedDate.toLocaleDateString()} Events
          </h3>
          {selectedDateEvents.length === 0 ? (
            <p className="text-xs aurora-text-secondary">No events on this date</p>
          ) : (
            <div className="space-y-2">
              {selectedDateEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="p-2 aurora-card rounded aurora-glow-hover cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full mt-1.5"
                         style={{ backgroundColor: getEventTypeColor(event.event_type) }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium aurora-text-primary truncate">{event.title}</p>
                      <div className="flex items-center space-x-2 text-xs aurora-text-secondary mt-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {event.all_day ? 'All day' : formatTime(event.start_date)}
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-2 text-xs aurora-text-secondary mt-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Upcoming Events */}
      <div className="mt-6">
        <h3 className="text-sm font-medium aurora-text-primary mb-3">Upcoming Events</h3>
        {(() => {
          const upcomingEvents = events
            .filter(event => new Date(event.start_date) > new Date())
            .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
            .slice(0, 5);

          return upcomingEvents.length === 0 ? (
            <p className="text-xs aurora-text-secondary">No upcoming events</p>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="p-2 aurora-card rounded aurora-glow-hover cursor-pointer transition-all duration-300"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 rounded-full mt-1.5"
                         style={{ backgroundColor: getEventTypeColor(event.event_type) }}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium aurora-text-primary truncate">{event.title}</p>
                      <p className="text-xs aurora-text-secondary">
                        {new Date(event.start_date).toLocaleDateString()}
                      </p>
                      <div className="flex items-center space-x-2 text-xs aurora-text-secondary mt-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {event.all_day ? 'All day' : formatTime(event.start_date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default CalendarSidebar;