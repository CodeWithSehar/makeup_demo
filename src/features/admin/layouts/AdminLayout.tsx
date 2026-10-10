import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminSidebar } from '../../../components/admin/AdminSidebar';
import { authService } from '../../../services/authService';

export const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Client-side prototype guard
    if (!authService.isAuthenticated()) {
      navigate('/admin/login', { replace: true, state: { from: location } });
    }
  }, [navigate, location]);

  if (!authService.isAuthenticated()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-100/60 flex">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet context={{ onOpenSidebar: () => setSidebarOpen(true) }} />
        </main>
      </div>
    </div>
  );
};

