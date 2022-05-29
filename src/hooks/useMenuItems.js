import { Compass, ClockHistory, Gear } from '@styled-icons/bootstrap';

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
    text: 'Settings',
    icon: Gear,
    url: '/settings',
  },
];

const useMenuItems = () => {
  return { menuItems: MENU };
};

export default useMenuItems;
