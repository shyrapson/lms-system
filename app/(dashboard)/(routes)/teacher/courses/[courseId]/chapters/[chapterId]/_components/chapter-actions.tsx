'use client';

import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Button } from '@/components/ui/button';
import axios from 'axios';

import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface IChapterAction {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}
export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: IChapterAction) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    setIsLoading(true);
    await axios.delete(`api/courses/${courseId}/chapters/${chapterId}`);
    toast.success('Chapter deleted');
    router.refresh();
    router.push(`/teacher/courses/${courseId}`);
    try {
    } catch (error) {
      toast.error('something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublished`
        );
        toast.success('Chapter unpublished ');
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success('Chapter published');
      }
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={'outline'}
        size={'sm'}
      >
        {isPublished ? 'Unpublished' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={'sm'} disabled={isLoading}>
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
