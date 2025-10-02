import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

// very small HTML sanitizer to avoid script/style injection in agent output
function sanitizeAgentHtml(html) {
  try {
    const div = document.createElement('div');
    div.innerHTML = html;
    // remove scripts and styles
    div.querySelectorAll('script, style, iframe, link, meta').forEach(n => n.remove());
    // ensure tables render nicely
    div.querySelectorAll('table').forEach(t => {
      t.classList.add('min-w-full','text-left','text-sm');
    });
    div.querySelectorAll('th').forEach(th => {
      th.classList.add('font-semibold','p-2','border-b');
    });
    div.querySelectorAll('td').forEach(td => {
      td.classList.add('p-2','border-b');
    });
    return div.innerHTML;
  } catch (e) {
    return html;
  }
}

// Icons
import {
  Crown,
  Trophy,
  Users,
  Calendar as CalendarIcon,
  Bell,
  Settings,
  CheckCircle,
  Gift,
  MessageSquare,
  Home,
  BookOpen,
  Target,
  FileText,
  Bot,
  DollarSign,
  BarChart3,
  Camera,
  Upload,
  StopCircle,
  PlayCircle,
  X,
  Lock,
  Search,
  Users2,
  Command,
  Calculator,
  Video,
  Phone,
  Clock,
} from 'lucide-react';

// UI components
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';

// Dashboard components
import AcademyPanel from './components/dashboard/AcademyPanel';
import AdminAgentPanel from './components/dashboard/AdminAgentPanel';
import AICoachPanel from './components/dashboard/AICoachPanel';
import AnnouncementsPanel from './components/dashboard/AnnouncementsPanel';
import AuditionsPanel from './components/dashboard/AuditionsPanel';
import CalendarPanel from './components/dashboard/CalendarPanel';
import ContentManagerPanel from './components/dashboard/ContentManagerPanel';
import LeadsPanel from './components/dashboard/LeadsPanel';
import MessagesPanel from './components/dashboard/MessagesPanel';
import PKPanel from './components/dashboard/PKPanel';
import QuotaPanel from './components/dashboard/QuotaPanel';
import RewardsPanel from './components/dashboard/RewardsPanel';
import TasksPanel from './components/dashboard/TasksPanel';
import UsersPanel from './components/dashboard/UsersPanel';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes as needed */}
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('calendar');
  const [user, setUser] = useState({ name: 'User', role: 'host' }); // Mock user data

  // Define sidebar navigation items
  const sidebarItems = [
    { id: 'calendar', label: 'Calendar', icon: CalendarIcon, component: CalendarPanel },
    { id: 'messages', label: 'Messages', icon: MessageSquare, component: MessagesPanel },
    { id: 'academy', label: 'BIGO Academy', icon: BookOpen, component: AcademyPanel },
    { id: 'tasks', label: 'Tasks', icon: Target, component: TasksPanel },
    { id: 'rewards', label: 'Rewards', icon: Gift, component: RewardsPanel },
    { id: 'auditions', label: 'Auditions', icon: Video, component: AuditionsPanel },
    { id: 'announcements', label: 'Announcements', icon: Bell, component: AnnouncementsPanel },
    { id: 'quota', label: 'Beans/Quota', icon: Calculator, component: QuotaPanel },
    { id: 'pk', label: 'PK Sign-ups', icon: Trophy, component: PKPanel },
    { id: 'ai-coach', label: 'AI Coach', icon: Bot, component: AICoachPanel },
  ];

  // Add admin-only items if user is admin
  if (user.role === 'admin' || user.role === 'owner') {
    sidebarItems.push(
      { id: 'users', label: 'Users', icon: Users, component: UsersPanel },
      { id: 'leads', label: 'Leads', icon: Users2, component: LeadsPanel },
      { id: 'admin-agent', label: 'Admin Agent', icon: Command, component: AdminAgentPanel },
      { id: 'content', label: 'Content Manager', icon: FileText, component: ContentManagerPanel }
    );
  }

  const ActiveComponent = sidebarItems.find(item => item.id === activeTab)?.component || CalendarPanel;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LVL-UP AGENCY</h1>
              <p className="text-sm text-gray-500">Elite BIGO Live Host Network</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </Badge>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">Welcome back!</p>
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Dashboard</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === item.id
                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          {/* Bottom section */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-4 rounded-lg text-white">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5" />
                <span className="font-semibold">Earnings</span>
              </div>
              <p className="text-lg font-bold">$1,247.50</p>
              <p className="text-xs opacity-90">This month</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome message */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user.name}!
              </h2>
              <p className="text-gray-600">
                {activeTab === 'calendar' && 'Manage your schedule and upcoming events'}
                {activeTab === 'messages' && 'Check your messages and communications'}
                {activeTab === 'academy' && 'Learn new skills and improve your hosting'}
                {activeTab === 'tasks' && 'Complete tasks to earn rewards and bonuses'}
                {activeTab === 'rewards' && 'View your rewards and redemption options'}
                {activeTab === 'auditions' && 'Manage audition submissions and reviews'}
                {activeTab === 'announcements' && 'Stay updated with the latest news'}
                {activeTab === 'quota' && 'Track your beans and quota performance'}
                {activeTab === 'pk' && 'Sign up for PK battles and competitions'}
                {activeTab === 'ai-coach' && 'Get personalized coaching from our AI'}
                {activeTab === 'users' && 'Manage platform users and permissions'}
                {activeTab === 'leads' && 'Track and manage potential host leads'}
                {activeTab === 'admin-agent' && 'Administrative tools and automation'}
                {activeTab === 'content' && 'Manage content and platform resources'}
              </p>
            </div>

            {/* Active Panel */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
