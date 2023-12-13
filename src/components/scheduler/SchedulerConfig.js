/**
 * Application configuration
 */

const schedulerConfig = {
  startDate: new Date(2022, 2, 20, 0),
  endDate: new Date(2022, 2, 21, 0),
  viewPreset: "hourAndDay",
  rowHeight: 50,
  barMargin: 5,
  multiEventSelect: true,

  columns: [{ text: "Name", field: "name", width: 130 }],

  crudManager: {
    transport: {
      load: {
        url: "api/scheduler/load",
      },
      sync: {
        url: "api/scheduler/save",
      },
    },
    autoLoad: true,
    autoSync: true,
  },
};

export { schedulerConfig };
