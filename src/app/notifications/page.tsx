'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';
import { notificationApi, Notification as ApiNotification } from '@/lib/notification-api';
import { 
  Bell, 
  ArrowLeft,
  Check,
  CheckCheck,
  X,
  Filter,
  Search,
  Clock,
  AlertTriangle,
  Info,
  CheckCircle,
  Star,
  Users,
  CreditCard,
  Shield,
  Settings,
  Trash2,
  Eye,
  EyeOff,
  Calendar,
  MessageSquare
} from 'lucide-react';

// Use the API notification type but extend it for backward compatibility
interface Notification extends ApiNotification {
  timestamp?: string; // For backward compatibility
  actionLabel?: string; // For backward compatibility
}

function NotificationsPageContent() {
  const { user } = useAuth();
  const router = useRouter();
  
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch notifications on component mount
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationApi.getNotifications({ 
        includeRead: true, 
        includeArchived: false,
        limit: 100 
      });
      if (response.success && response.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const notificationTypes = [
    { value: 'all', label: 'All Types', icon: Bell },
    { value: 'achievement_unlocked', label: 'Achievements', icon: Star },
    { value: 'level_up', label: 'Level Up', icon: Star },
    { value: 'streak_milestone', label: 'Streaks', icon: Users },
    { value: 'course_completed', label: 'Courses', icon: CheckCircle },
    { value: 'xp_gained', label: 'XP Gained', icon: Star },
    { value: 'system', label: 'System', icon: Settings }
  ];

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      achievement_unlocked: Star,
      level_up: Star,
      streak_milestone: Users,
      course_completed: CheckCircle,
      xp_gained: Star,
      system: Settings
    };
    return iconMap[type as keyof typeof iconMap] || Bell;
  };

  const getNotificationColor = (type: string) => {
    const colorMap = {
      achievement_unlocked: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
      level_up: 'text-green-400 bg-green-500/10 border-green-500/20',
      streak_milestone: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
      course_completed: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      xp_gained: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      system: 'text-gray-400 bg-gray-500/10 border-gray-500/20'
    };
    return colorMap[type as keyof typeof colorMap] || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  };

  const getPriorityColor = (priority: string) => {
    const colorMap = {
      low: 'text-gray-400',
      medium: 'text-yellow-400',
      high: 'text-red-400'
    };
    return colorMap[priority as keyof typeof colorMap] || 'text-gray-400';
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = filter === 'all' || 
      (filter === 'read' && notification.isRead) || 
      (filter === 'unread' && !notification.isRead);
    
    const matchesType = typeFilter === 'all' || notification.type === typeFilter;
    
    const matchesSearch = searchQuery === '' || 
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesType && matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTimestamp = (notification: Notification) => {
    const timestamp = notification.timestamp || notification.createdAt;
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  const handleMarkAsRead = async (notificationIds: string[]) => {
    setLoading(true);
    try {
      // Mark each notification as read
      await Promise.all(
        notificationIds.map(id => notificationApi.markAsRead(id))
      );
      
      setNotifications(prev => 
        prev.map(notification => 
          notificationIds.includes(notification.id) 
            ? { ...notification, isRead: true, readAt: new Date().toISOString() }
            : notification
        )
      );
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsUnread = async (notificationIds: string[]) => {
    setLoading(true);
    try {
      // Note: API doesn't support mark as unread, so just update local state
      // This could be extended in the future if the API supports it
      console.log('Mark as unread not supported by API yet');
      
      setNotifications(prev => 
        prev.map(notification => 
          notificationIds.includes(notification.id) 
            ? { ...notification, isRead: false, readAt: undefined }
            : notification
        )
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAllAsRead = async () => {
    setLoading(true);
    try {
      const response = await notificationApi.markAllAsRead();
      if (response.success) {
        setNotifications(prev => 
          prev.map(notification => ({ 
            ...notification, 
            isRead: true, 
            readAt: new Date().toISOString() 
          }))
        );
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNotifications = async (notificationIds: string[]) => {
    setLoading(true);
    try {
      // Use archive API since there's no delete API
      await Promise.all(
        notificationIds.map(id => notificationApi.archiveNotification(id))
      );
      
      setNotifications(prev => 
        prev.filter(notification => !notificationIds.includes(notification.id))
      );
      setSelectedNotifications([]);
    } catch (error) {
      console.error('Failed to archive notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectNotification = (notificationId: string) => {
    setSelectedNotifications(prev => 
      prev.includes(notificationId)
        ? prev.filter(id => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-100 flex items-center space-x-2">
                <Bell className="w-7 h-7" />
                <span>Notifications</span>
                {unreadCount > 0 && (
                  <span className="px-2 py-1 bg-blue-600 text-white text-sm rounded-full">
                    {unreadCount}
                  </span>
                )}
              </h1>
              <p className="text-gray-400">Stay updated with your account activity</p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark All Read</span>
            </button>
          )}
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-2xl mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Read/Unread Filter */}
            <div className="flex bg-gray-800/50 rounded-lg p-1">
              {['all', 'unread', 'read'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption as any)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    filter === filterOption
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            >
              {notificationTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedNotifications.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  {selectedNotifications.length} notification{selectedNotifications.length !== 1 ? 's' : ''} selected
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleMarkAsRead(selectedNotifications)}
                    disabled={loading}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Check className="w-3 h-3" />
                    <span>Mark Read</span>
                  </button>
                  <button
                    onClick={() => handleMarkAsUnread(selectedNotifications)}
                    disabled={loading}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-600 hover:bg-gray-700 disabled:bg-gray-500 text-white rounded-lg transition-colors duration-200"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Mark Unread</span>
                  </button>
                  <button
                    onClick={() => handleDeleteNotifications(selectedNotifications)}
                    disabled={loading}
                    className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800 p-12 shadow-2xl text-center">
              <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">No notifications found</h3>
              <p className="text-gray-500">
                {searchQuery || filter !== 'all' || typeFilter !== 'all'
                  ? 'Try adjusting your filters or search query.'
                  : 'You\'re all caught up! New notifications will appear here.'}
              </p>
            </div>
          ) : (
            <>
              {/* Select All */}
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-800/30 rounded-lg">
                <input
                  type="checkbox"
                  checked={selectedNotifications.length === filteredNotifications.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-gray-400">
                  Select all visible notifications
                </span>
              </div>

              {filteredNotifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const isSelected = selectedNotifications.includes(notification.id);
                
                return (
                  <div
                    key={notification.id}
                    className={`bg-gray-900/50 backdrop-blur-xl rounded-2xl border shadow-2xl transition-all duration-200 ${
                      notification.isRead
                        ? 'border-gray-800'
                        : 'border-blue-500/30 bg-blue-500/5'
                    } ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    <div className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectNotification(notification.id)}
                          className="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />

                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${getNotificationColor(notification.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className={`text-lg font-semibold ${
                                notification.isRead ? 'text-gray-300' : 'text-gray-100'
                              }`}>
                                {notification.title}
                                {!notification.isRead && (
                                  <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                                )}
                              </h3>
                              <p className={`mt-1 ${
                                notification.isRead ? 'text-gray-500' : 'text-gray-400'
                              }`}>
                                {notification.message}
                              </p>
                            </div>

                            {/* Priority Indicator */}
                            <div className="flex items-center space-x-2 ml-4">
                              {notification.priority === 'high' && (
                                <div className="flex items-center space-x-1">
                                  <AlertTriangle className="w-4 h-4 text-red-400" />
                                  <span className="text-xs text-red-400 font-medium">High</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatTimestamp(notification)}</span>
                              </div>
                              <span className="capitalize">{notification.type}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                              {notification.actionUrl && (notification.actionLabel || notification.actionText) && (
                                <button
                                  onClick={() => router.push(notification.actionUrl!)}
                                  className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                                >
                                  {notification.actionLabel || notification.actionText}
                                </button>
                              )}
                              
                              <button
                                onClick={() => notification.isRead 
                                  ? handleMarkAsUnread([notification.id])
                                  : handleMarkAsRead([notification.id])
                                }
                                className="p-1.5 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                                title={notification.isRead ? 'Mark as unread' : 'Mark as read'}
                              >
                                {notification.isRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </button>
                              
                              <button
                                onClick={() => handleDeleteNotifications([notification.id])}
                                className="p-1.5 text-red-400 hover:text-red-300 transition-colors duration-200"
                                title="Delete notification"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Load More */}
        {filteredNotifications.length > 0 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-gray-800/50 hover:bg-gray-800/70 text-gray-300 rounded-lg transition-colors duration-200">
              Load More Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function NotificationsPage() {
  return (
    <ProtectedRoute>
      <NotificationsPageContent />
    </ProtectedRoute>
  );
}