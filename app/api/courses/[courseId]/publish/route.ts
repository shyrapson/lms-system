import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized1', { status: 401 });
    }

    const course = await db.course.findUnique({
      where: { id: params.courseId, userId },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new NextResponse('Unauthorized2', { status: 401 });
    }

    const hasPublishedChapters = course.chapters.some(
      (chapter) => chapter.isPublished
    );
    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !hasPublishedChapters ||
      !course.categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 401 });
    }
    console.log(hasPublishedChapters);

    const publishCourse = await db.course.update({
      where: { id: params.courseId, userId },
      data: {
        isPublished: true,
      },
    });

    return NextResponse.json(publishCourse);
  } catch (error) {
    console.log('[COURSE_ID_PUBLISH]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
