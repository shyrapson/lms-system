import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect('/');
  }

  const courses = await db.course.findMany({
    where: { userId },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return (
    <div className="m-6">
      <Button>
        <Link href="/teacher/create">create course</Link>
      </Button>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
