import { getDashboardCourses } from '@/actions/get-dashboard-course';
import { CoursesList } from '@/components/courses-list';
import { UserButton, auth } from '@clerk/nextjs';
import { CheckCircle, Clock } from 'lucide-react';
import { redirect } from 'next/navigation';
import InfoCard from './_components/info-card';

export default async function Dashboard() {
  const { userId } = auth();
  console.log(userId);
  if (!userId) {
    return redirect('/');
  }
  const { completedCourses, coursesInProgress } = await getDashboardCourses(
    userId
  );
  console.log(completedCourses);
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          variant="success"
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          variant="success"
          label="Completed"
          numberOfItems={completedCourses.length}
        />
      </div>
      <CoursesList items={[...coursesInProgress, ...completedCourses]} />
    </div>
  );
}
