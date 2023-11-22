import { IconBadge } from '@/components/icon-badge';
import { LucideIcon } from 'lucide-react';

interface IInfoCard {
  numberOfItems: number;
  label: string;
  variant: 'default' | 'success';
  icon: LucideIcon;
}

const InfoCard = ({ variant, label, icon: Icon, numberOfItems }: IInfoCard) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={Icon} />
      <div className="">
        <p className="font-medium">{label}</p>
        <p className="text-gray-500">
          {numberOfItems} {numberOfItems === 1 ? 'Course' : 'Courses'}
        </p>
      </div>
    </div>
  );
};

export default InfoCard;
