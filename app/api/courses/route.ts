import { db } from '@/lib/db';
import { isTeacher } from '@/lib/teacher';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    //  if (!userId || isTeacher(userId)) { //protected
    if (!userId) {
      return new NextResponse('unAuthorized', { status: 401 });
    }
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log('[Courses]', error);
    return new NextResponse('internal Error', { status: 500 });
  }
}
