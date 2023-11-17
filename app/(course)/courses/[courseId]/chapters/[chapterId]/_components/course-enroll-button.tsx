'use client';

import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/format';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ICourseEnrollButton {
  courseId: string;
  price: number;
}

export const CourseEnrollButton = ({
  courseId,
  price,
}: ICourseEnrollButton) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      const response = await axios.post(`/api/courses/${courseId}/checkout`);
      console.log(response);
      window.location.assign(response.data.url);

      setIsLoading(true);
    } catch (error) {
      toast.error('something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size={'sm'}
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  );
};
