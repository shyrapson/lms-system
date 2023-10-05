'use client';

import { BarChart, Compass, Layout, List } from 'lucide-react';
import { SidebarItems } from './sidebar-item';
import { usePathname } from 'next/navigation';

const guestsRoutes = [
  {
    icon: Layout,
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Browse',
    href: '/search',
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: 'Courses',
    href: '/teacher/courses',
  },
  {
    icon: BarChart,
    label: 'Analytics',
    href: '/teacher/analytics',
  },
];

export const SidebarRoutes = () => {
  const pathName = usePathname();

  const isTeacher = pathName?.includes('/teacher');
  const routes = isTeacher ? teacherRoutes : guestsRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map(({ icon, label, href }) => (
        <SidebarItems key={href} icon={icon} label={label} href={href} />
      ))}
    </div>
  );
};
