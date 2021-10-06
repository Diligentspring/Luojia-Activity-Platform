import react from 'react';
import { useStore } from '@/models';

interface ItemProps {
  key: string;
  label?: string;
  value?: string;
  isEditing?: boolean;
}

const InfoItem = (props: ItemProps) => {
  return <div>{props.label}</div>;
};

const InfoEditCard = () => {
  const [shared, setShared] = useStore('Shared');
  const Info = {
    name: { label: '用户名', value: shared?.user?.name },
    email: { label: '邮箱', value: shared?.user?.email },
    phone: { label: '联系电话', value: shared?.user?.phone },
  };
  return <div></div>;
};

export default InfoEditCard;
