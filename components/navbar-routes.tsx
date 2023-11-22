'use client';
import { UserButton, auth, useAuth } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';
import Link from 'next/link';
import { SearchInput } from './search-input';
import { isTeacher } from '@/lib/teacher';

export const NavbarRoutes = () => {
  const pathName = usePathname();
  const { userId } = useAuth();

  const isTeacherPage = pathName.startsWith('/teacher');
  const isCoursePage = pathName.includes('/course');
  const isSearchPage = pathName === '/search';
  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-e ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : (
          //  isTeacher(userId) ?
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher Mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
