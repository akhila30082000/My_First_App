export const headerData = [
  'SNo',
  'PartnerId ',
  'PartnerName',
  'Email',
  'Location',
  'Status',
];

export const serviceData = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'S.no',
  },
  {
    id: 'services',
    numeric: true,
    disablePadding: false,
    label: 'Services',
  },
];

export const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'API services',
  },
  {
    id: 'count',
    numeric: true,
    disablePadding: false,
    label: 'API count',
  },
  {
    id: 'utilized',
    numeric: true,
    disablePadding: false,
    label: 'API utilized ',
  },
  {
    id: 'remaining',
    numeric: true,
    disablePadding: false,
    label: 'API remaning',
  },
  { id: 'cost', numeric: true, disablePadding: false, label: 'Execution cost' },
  // {
  //   id: 'failureRate',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'failure rate',
  // },
];
