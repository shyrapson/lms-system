import { Menu } from 'lucide-react';
import { Chapter, Course, UserProgress } from '@prisma/client';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import React from 'react';
import { CourseSideBar } from './course-sidebar';
interface ICourseMobileSidebar {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({
  course,
  progressCount,
}: ICourseMobileSidebar) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={'left'}>
        <CourseSideBar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;
