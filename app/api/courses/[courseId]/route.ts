import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Mux from '@mux/mux-node';
import { isTeacher } from '@/lib/teacher';

const { Video } = new Mux(
  process.env.MUX_TOKEN_ID!,
  process.env.MUX_TOKEN_SECRET_KEY!
);

//delete course
export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    // if(!userId || isTeacher(userId))
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
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
      return new NextResponse('Not Found oooo', { status: 404 });
    }
    for (const chapter of course.chapters) {
      if (chapter?.muxData?.assetId) {
        await Video.Assets.del(chapter.muxData?.assetId);
      }
    }
    const deletedCourse = await db.course.delete({
      where: { id: params.courseId },
    });
    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log('[DELETE_ID_COURSE]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

//update
export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    console.log(values, 'db');
    // if(!userId || isTeacher(userId))
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const course = await db.course.update({
      where: { id: courseId, userId },

      data: { ...values },
    });
    console.log(course);

    return NextResponse.json(course);
  } catch (error) {
    console.log('[COURSE_ID]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
