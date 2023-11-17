'use client';

import { Category } from '@prisma/client';
import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcReadingEbook,
  FcSalesPerformance,
  FcSportsMode,
} from 'react-icons/fc';
import { IconType } from 'react-icons';
import { CategoriesItem } from './category-item';

interface ICategories {
  items: Category[];
}
const iconMap: Record<Category['name'], IconType> = {
  Music: FcMusic,
  Photography: FcOldTimeCamera,
  Fitness: FcSportsMode,
  Accounting: FcSalesPerformance,
  'Computer Science': FcMultipleDevices,
  Filming: FcFilmReel,
  Engineering: FcEngineering,
  Mathematics: FcReadingEbook,
};

export const Categories = ({ items }: ICategories) => {
  return (
    <div className="flex items-center pb-2 overflow-auto gap-x-2">
      {items.map((item) => (
        <CategoriesItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
