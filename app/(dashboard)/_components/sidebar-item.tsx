'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface ISidebarItems {
  icon: LucideIcon;
  label: string;
  href: string;
}
export const SidebarItems = ({ icon: Icon, label, href }: ISidebarItems) => {
  const pathName = usePathname();
  const router = useRouter();

  const isActive =
    (pathName === '/' && href === '/') ||
    pathName === href ||
    pathName?.startsWith(`${href}/`);
  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-[500] transition-all hover:text-slate-600 hover:bg-slate-300/20',
        isActive &&
          'text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700'
      )}
    >
      <div className="flex items-center gap-x-2 py-4 px-6">
        <Icon
          size={22}
          className={cn('text-slate-500', isActive && 'text-sky-500')}
        />
        {label}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-sky-700 h-full transition-all',
          isActive && 'opacity-1'
        )}
      />
    </button>
  );
};
