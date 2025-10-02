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
