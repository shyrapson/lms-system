import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    console.log(params);

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: { id: params.courseId, userId },
    });
    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const unpublishChapter = await db.chapter.update({
      where: { id: params.chapterId, courseId: params.courseId },
      data: { isPublished: false },
    });
    const publishedChapterInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });
    if (!publishedChapterInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: { isPublished: false },
      });
    }
    return NextResponse.json(unpublishChapter);
  } catch (error) {
    console.log('[CHAPTER_UNPUBLISH]');
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
