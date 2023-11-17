import { NavbarRoutes } from '@/components/navbar-routes';
import { Chapter, Course, UserProgress } from '@prisma/client';
import React from 'react';
import CourseMobileSidebar from './mobile-sidebar';

interface ICourseNavbar {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

export const CourseNavbar = ({ course, progressCount }: ICourseNavbar) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar course={course} progressCount={progressCount} />
      <NavbarRoutes />
    </div>
  );
};
