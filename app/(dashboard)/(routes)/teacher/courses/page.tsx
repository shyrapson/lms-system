import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const CoursesPage = () => {
  return (
    <div className="m-6">
      <Link href="/teacher/create">
        <Button className="p-6">new Courses</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
