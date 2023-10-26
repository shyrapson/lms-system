import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
  res: Response
) {
  const { userId } = auth();
  const { title } = await req.json();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const chapter = await db.chapter.create({
    data: {
      title,
    },
  });

  try {
  } catch (error) {
    console.log('Chapters', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
