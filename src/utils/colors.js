export const getColorStatus = status => {
  switch (status) {
    case 'COMPLETED':
      return '#A8DADC';
    case 'LIVE':
      return '#E63946';
    default:
      return '#FFFFF';
  }
};
