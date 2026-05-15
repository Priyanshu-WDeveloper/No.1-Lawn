import { useState } from 'react';
import {
  Bell,
  Check,
  Trash2,
  Clock,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';

// Sample notification types
type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  isRead: boolean;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Customer Added',
    message: 'Babu Kondepudi has been added as a new customer.',
    type: 'info',
    time: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    title: 'Job Completed',
    message: 'Job #JOB-001 has been marked as completed.',
    type: 'success',
    time: '15 minutes ago',
    isRead: false,
  },
  {
    id: '3',
    title: 'Payment Due',
    message: 'Invoice #INV-004 is overdue by 3 days.',
    type: 'warning',
    time: '1 hour ago',
    isRead: true,
  },
  {
    id: '4',
    title: 'System Error',
    message: 'Failed to sync employee data. Please try again.',
    type: 'error',
    time: '2 hours ago',
    isRead: true,
  },
  {
    id: '5',
    title: 'Employee Assigned',
    message: 'Sarah Miller has been assigned to Job #JOB-002.',
    type: 'info',
    time: '3 hours ago',
    isRead: true,
  },
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'warning':
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    case 'error':
      return <XCircle className="h-5 w-5 text-red-600" />;
    default:
      return <Info className="h-5 w-5 text-blue-600" />;
  }
};

const getNotificationStyles = (type: NotificationType) => {
  switch (type) {
    case 'success':
      return 'bg-green-50 border-green-200';
    case 'warning':
      return 'bg-yellow-50 border-yellow-200';
    case 'error':
      return 'bg-red-50 border-red-200';
    default:
      return 'bg-blue-50 border-blue-200';
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true })),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications =
    filter === 'unread'
      ? notifications.filter((n) => !n.isRead)
      : notifications;

  return (
    <AppLayout>
      <div className="flex h-full flex-col">
        <div className="flex-1 w-full overflow-y-auto p-10">
          <div className="mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#edf8e7] flex items-center justify-center">
                  <Bell className="h-6 w-6 text-[#16610E]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#151515]">
                    Notifications
                  </h1>
                  <p className="text-[#777] text-sm">
                    {unreadCount > 0
                      ? `${unreadCount} unread notifications`
                      : 'All caught up!'}
                  </p>
                </div>
              </div>

              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  className="h-10 px-4 rounded-xl bg-[#16610E] hover:bg-[#1a7a12] text-white text-sm font-medium"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Mark all as read
                </Button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-[#16610E] text-white'
                    : 'bg-white text-[#777] hover:bg-[#f5f5f5] border border-[#e5e5e5]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                  filter === 'unread'
                    ? 'bg-[#16610E] text-white'
                    : 'bg-white text-[#777] hover:bg-[#f5f5f5] border border-[#e5e5e5]'
                }`}
              >
                Unread
                {unreadCount > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      filter === 'unread'
                        ? 'bg-white/20'
                        : 'bg-[#16610E] text-white'
                    }`}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>

            {/* Notifications List */}
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-[#ececec]">
                  <div className="h-16 w-16 rounded-full bg-[#f5f5f5] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-[#16610E]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#151515] mb-2">
                    {filter === 'unread'
                      ? 'No unread notifications'
                      : 'No notifications'}
                  </h3>
                  <p className="text-[#777] text-sm">
                    {filter === 'unread'
                      ? "You've read all your notifications"
                      : "You're all caught up!"}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`relative rounded-xl p-4 border transition-all ${
                      notification.isRead
                        ? 'bg-white border-[#ececec]'
                        : 'bg-white border-[#16610E] shadow-sm'
                    }`}
                  >
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div
                        className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${getNotificationStyles(notification.type)}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4
                                className={`text-sm font-medium ${notification.isRead ? 'text-[#777]' : 'text-[#151515]'}`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.isRead && (
                                <span className="h-2 w-2 rounded-full bg-[#16610E]" />
                              )}
                            </div>
                            <p className="text-sm text-[#777] mt-1">
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-[#999]">
                              <Clock className="h-3 w-3" />
                              {notification.time}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            {!notification.isRead && (
                              <button
                                onClick={() =>
                                  markAsRead(notification.id)
                                }
                                className="p-2 rounded-lg hover:bg-[#f5f5f5] text-[#777] hover:text-[#16610E] transition-colors"
                                title="Mark as read"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                              className="p-2 rounded-lg hover:bg-red-50 text-[#777] hover:text-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Clear All Button */}
            {notifications.length > 0 && (
              <div className="mt-6 flex justify-center">
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="h-10 px-4 rounded-xl border-[#e5e5e5] text-[#777] hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-sm"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear all notifications
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
