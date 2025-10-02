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
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AcademyPanel />
        <AdminAgentPanel />
        <AICoachPanel />
        <AnnouncementsPanel />
        <AuditionsPanel />
        <CalendarPanel />
        <ContentManagerPanel />
        <LeadsPanel />
        <MessagesPanel />
        <PKPanel />
        <QuotaPanel />
        <RewardsPanel />
        <TasksPanel />
        <UsersPanel />
      </div>
    </div>
  );
}

export default App;
