import { Compass, ClockHistory, Gear } from '@styled-icons/bootstrap';
import { AlarmExclamation } from '@styled-icons/boxicons-regular/AlarmExclamation';

const MENU = [
  {
    text: 'Home',
    icon: Compass,
    url: '/home',
  },
  {
    text: 'Dashboard',
    icon: ClockHistory,
    url: '/dashboard',
  },
  {
    text: 'Alerts',
    icon: AlarmExclamation,
    url: '/alerts',
  },
  {
    text: 'Settings',
    icon: Gear,
    url: '/settings',
  },
];

const useMenuItems = () => {
  return { menuItems: MENU };
};

export default useMenuItems;
