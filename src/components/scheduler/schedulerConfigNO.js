import {
  DateHelper,
  EventModel,
  PresetManager,
  StringHelper,
} from "@bryntum/schedulerpro";
import dayjs from "dayjs";
import moment from "moment";
import API from "src/api";

export const schedulerProConfig = {
  highlightSuccessors: true,
  highlightPredecessors: true,
  eventEditFeature: false,

  // project: {
  //   //from demo

  //   autoLoad: true,
  //   autoSync: true,
  //   transport: {
  //     load: {
  //       url: process.env.NEXT_PUBLIC_API_URL + 'api/v1/flightlegscheduler/load',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       },
  //       params: {
  //         startDate: moment().format('YYYY-MM-DD'), //this will be updated but let the initial param to be valid
  //         endDate: moment().add(3, 'days').format('YYYY-MM-DD'),
  //         tz: tz,
  //         datasource: 1,
  //         fleetOnly: false,
  //         includeDependencies: false,
  //         includeDutyDayAnnotations: false
  //       }
  //     },
  //     sync: {
  //       url: process.env.NEXT_PUBLIC_API_URL + 'api/v1/flightlegscheduler/save',
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`
  //       },
  //       params: {
  //         tz: tz,
  //         datasource: 1
  //       }
  //     }
  //   },
  //   eventModelClass: FlightLeg,
  //   listeners: {
  //     sync: function () {
  //       this.project.load();
  //     },
  //     load: function (data) {}
  //   }
  // },

  // features: {
  //   // filterBar: true,
  //   eventDragSelect: true,
  //   eventDragCreate: false,

  //   //does not seems straight forward...
  //   // https://www.bryntum.com/products/scheduler/docs/api/Scheduler/feature/export/Print
  //   // https://www.bryntum.com/products/scheduler/docs/api/Scheduler/feature/export/PdfExport
  //   // print: {
  //   //   headerTpl,
  //   //   footerTpl
  //   // },

  //   eventBuffer: {
  //     tooltipTemplate: function (data) {
  //       let duration = data.duration;
  //       return `<i class="b-icon b-fa-car"></i>Travel time: ${duration}`;
  //     }
  //   },
  //   /*
  //   eventBuffer: false,
  //    */

  //   taskEdit: {
  //     items: {
  //       generalTab: {
  //         items: {
  //           nameField: false,
  //           resourcesField: true,
  //           durationField: false,
  //           percentDoneField: false,
  //           effortField: false,
  //           preambleField: false,
  //           postambleField: false
  //         }
  //       },
  //       predecessorsTab: null,
  //       successorsTab: null,
  //       advancedTab: null,
  //       notesTab: null
  //     }
  //   },

  //   eventMenu: {
  //     items: {
  //       copyEvent: false,
  //       unassignEvent: false,
  //       splitEvent: false,
  //       cutEvent: false,
  //       deleteEvent: false,
  //       lock: {
  //         text: 'Lock',
  //         icon: 'b-fa b-fa-fw b-fa-lock',
  //         cls: 'b-separator',
  //         weight: 530,
  //         onItem({ eventRecord }) {
  //           eventRecord.iconCls = 'b-fa b-fa-lock';
  //           eventRecord.isBiqLocked = true;
  //           eventRecord.locked = true;
  //           eventRecord.draggable = false;
  //           eventRecord.resizable = false;
  //         }
  //       },
  //       unlock: {
  //         text: 'Unlock',
  //         icon: 'b-fa b-fa-fw b-fa-lock-open',
  //         cls: 'b-separator',
  //         weight: 530,
  //         onItem({ eventRecord }) {
  //           eventRecord.locked = false;
  //           eventRecord.draggable = true;
  //           eventRecord.resizable = true;
  //           eventRecord.isBiqLocked = false;
  //           eventRecord.iconCls = '';
  //         }
  //       }
  //     }
  //   },

  //   cellTooltip: {
  //     hoverDelay: 300,
  //     textContent: true,
  //     title: '',
  //     tooltipRenderer: function ({ record, column, tip }) {
  //       tip.minWidth = 450;
  //       tip.title = `<strong>${record.name} : ${record.aircrafttype_label} ${
  //         record.type ? record.type : ''
  //       }</strong>`;
  //       let imgUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+1bc41d(${record.lng},${record.lat})/${record.lng},${record.lat},3,0/200x100?access_token=pk.eyJ1Ijoic3RldmVkcnVja2VyIiwiYSI6ImNsOTUxaWhhODI4bmgzb3A4dWZlenZiaTMifQ.amy2JvjMmUQBIjckFdQ_NQ`;
  //       let o = `
  //               <div class="t-row airplanetip">
  //                   <div class="t-column2" style="margin-right: 5px;">
  //                       <dt style="font-weight: bold; text-decoration: underline; margin-bottom: 5px">Features</dt>
  //                       <dd>
  //                         <label>Belted Lav:</label> ${
  //                           record.hasBeltedLav ? 'Yes' : 'No'
  //                         }<br />
  //                         <label>Galley:</label> ${
  //                           record.hasGalley ? 'Yes' : 'No'
  //                         }<br />
  //                         <label>Sound System:</label> ${
  //                           record.hasSoundSystem ? 'Yes' : 'No'
  //                         }<br />
  //                         <label>Wifi:</label> ${record.hasWifi ? 'Yes' : 'No'}
  //                       </dd>
  //                   </div>
  //                   <div class="t-column2">

  //                     <img style="border-radius: 5px; width: 200px; height: 100px;" src="${imgUrl}">
  //                     ${record.city}, ${record.state}<br />
  //                     ${record.lastPositionUpdate}

  //                   </div>
  //               </div>
  //           `;

  //       return o;
  //     }
  //   },

  //   eventTooltip: {
  //     allowOver: true,
  //     maxWidth: '550px',
  //     minWidth: '550px',
  //     minHeight: '400px',
  //     closable: true,

  //     /*
  //       tools    : [
  //           {
  //               cls : 'b-fa b-fa-cut',
  //               handler() {
  //                   this.eventRecord.split();
  //                   this.hide();
  //               }
  //           },
  //           {
  //               cls : 'b-fa b-fa-trash',
  //               handler() {
  //                   this.eventRecord.remove();
  //                   this.hide();
  //               }
  //           },
  //           {
  //               cls : 'b-fa b-fa-angle-left',
  //               handler() {
  //                   this.eventRecord.shift(-1);
  //               }
  //           },
  //           {
  //               cls : 'b-fa b-fa-angle-right',
  //               handler() {
  //                   this.eventRecord.shift(1);
  //               }
  //           }
  //       ],
  //       */

  //     header: {
  //       titleAlign: 'start'
  //     },

  //     onBeforeShow({ source: tooltip }) {
  //       if (
  //         tooltip &&
  //         tooltip.eventRecord &&
  //         tooltip.eventRecord.type != 'annotation'
  //       ) {
  //         let t =
  //           tooltip.eventRecord.departIcao +
  //           ' > ' +
  //           tooltip.eventRecord.arriveIcao;
  //         if (tooltip.eventRecord.scheduledTripNumber) {
  //           t = tooltip.eventRecord.scheduledTripNumber + ' : ' + t;
  //         } else if (tooltip.eventRecord.aircraftmaintenancetype_id) {
  //           t = 'Maintenance - ' + tooltip.eventRecord.name;
  //         } else {
  //           t = 'Repo : ' + t;
  //         }
  //         if (tooltip.eventRecord.tripstatusLabel) {
  //           t += ' : ' + tooltip.eventRecord.tripstatusLabel;
  //         }

  //         tooltip.header = {
  //           title: StringHelper.encodeHtml(t),
  //           cls: 'titlebar-' + tooltip.eventRecord.eventColor
  //         };
  //       }
  //     },

  //     template: ({ eventRecord }) => {
  //       let output = '';

  //       if (eventRecord.type == 'annotation') {
  //         return '';
  //       }

  //       if (eventRecord.scheduledTripNumber) {
  //         output = `
  //           <div class="t-row">
  //             <div class="t-column" style="margin-right: 5px;">

  //               <dt>Time</dt>
  //               <dd style="white-space:nowrap">
  //                 ${DateHelper.format(
  //                   eventRecord.startDate,
  //                   'HH:mm'
  //                 )} - ${DateHelper.format(eventRecord.endDate, 'HH:mm')}
  //                 </dd>

  //                 <dt>Tail</dt>
  //                 <dd>
  //                     ${eventRecord.resource.name}
  //                 </dd>
  //             </div>
  //             <div class="t-column" style="margin-left: 5px;">
  //             ${eventRecord.company ? '<dt>Company</dt>' : ''}
  //             ${
  //               eventRecord.company
  //                 ? '<dd>' + eventRecord.company + '</dd>'
  //                 : ''
  //             }

  //             ${eventRecord.contact ? '<dt>Contact</dt>' : ''}
  //             ${
  //               eventRecord.contact
  //                 ? '<dd>' + eventRecord.contact + '</dd>'
  //                 : ''
  //             }
  //             </div>
  //         `;

  //         let imgUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-1+6fed07(${eventRecord.departLng},${eventRecord.departLat}),pin-s-2+f50505(${eventRecord.arriveLng},${eventRecord.arriveLat})/auto/200x120?access_token=pk.eyJ1Ijoic3RldmVkcnVja2VyIiwiYSI6ImNsOTUxaWhhODI4bmgzb3A4dWZlenZiaTMifQ.amy2JvjMmUQBIjckFdQ_NQ`;

  //         output += `
  //             <div class="t-column style="margin-left: 5px; margin-right: 5px; width:200px">
  //               <div id="eventmap">
  //                   <img style="border-radius: 5px; width: 200px; height: 120px;" src="${imgUrl}"><br>
  //                   ${eventRecord.departCity} to ${eventRecord.arriveCity}
  //               </div>
  //             </div>`;

  //         // close row
  //         output += `
  //           </div>
  //         `;

  //         if (eventRecord.passengers && eventRecord.passengers.length > 0) {
  //           output += `
  //           <dt>${eventRecord.pax} Passengers</dt>
  //           <dd>`;
  //           let pax = [];
  //           for (let j = 0; j < eventRecord.passengers.length; j++) {
  //             pax.push(
  //               `${eventRecord.passengers[j].firstName} ${eventRecord.passengers[j].lastName}`
  //             );
  //           }
  //           output += pax.join(', ') + `</dd>`;
  //         }

  //         // pilots & Fbo
  //         output += `
  //           <div class="t-row" style="margin-top: 15px;">
  //             <div class="t-column">`;
  //         if (eventRecord.pilots && eventRecord.pilots.length > 0) {
  //           output += `
  //               <dt>Crew</dt>
  //               <dd>`;
  //           let labels = [];
  //           for (let j = 0; j < eventRecord.pilots.length; j++) {
  //             labels.push(
  //               eventRecord.pilots[j].position +
  //                 ': ' +
  //                 eventRecord.pilots[j].firstName +
  //                 ' ' +
  //                 eventRecord.pilots[j].lastName
  //             );
  //           }
  //           output += labels.join('<br>') + '</dd>';
  //         } else {
  //           output += `
  //               <dt>Crew</dt>
  //               <dd>None Specified</dd>`;
  //         }

  //         output += `
  //             </div>
  //             <div style="width: 66%;">`;
  //         // <div class="t-column66">`;

  //         // fbos
  //         output += `
  //               <dt>FBO</dt>`;
  //         output += `
  //               <dd>
  //                 <div style="width:60px">Depart:</div> ${
  //                   eventRecord.departFbo
  //                     ? eventRecord.departFbo
  //                     : 'None Specified'
  //                 } @ ${eventRecord.departLocalFormatted.split(' ')[1]}
  //               </dd>`;
  //         output += `
  //               <dd>
  //                 <div style="width:60px">Arrive:</div> ${
  //                   eventRecord.arriveFbo
  //                     ? eventRecord.arriveFbo
  //                     : 'None Specified'
  //                 } @ ${eventRecord.arriveLocalFormatted.split(' ')[1]}
  //               </dd>`;
  //         output += `
  //             </div>
  //           </div>`;
  //       } else if (eventRecord.aircraftmaintenancetype_id) {
  //         // mx

  //         output = `
  //         <div class="t-row">
  //           <div class="t-column" style="margin-right: 5px;">
  //             <dt>Time</dt>
  //             <dd style="white-space:nowrap">
  //               ${DateHelper.format(
  //                 eventRecord.startDate,
  //                 'MM/DD/YYYY HH:mm'
  //               )} - ${DateHelper.format(
  //           eventRecord.endDate,
  //           'MM/DD/YYYY HH:mm'
  //         )}
  //             </dd>
  //             <dt>Tail</dt>
  //             <dd>
  //                 ${eventRecord.resource.name}
  //             </dd>
  //             <dt>Location</dt>
  //             <dd>
  //                 ${eventRecord.airportIcao}
  //                 <br>
  //                 ${eventRecord.airportName}
  //             </dd>
  //             <dt>Notes</dt>
  //             <dd>
  //                 ${eventRecord.notes}
  //             </dd>
  //           </div>
  //         </div>`;
  //         return output;
  //       } else {
  //         output = `
  //         <div class="t-row">
  //           <div class="t-column" style="margin-right: 5px;">
  //             <dt>Time</dt>
  //             <dd style="white-space:nowrap">
  //               ${DateHelper.format(
  //                 eventRecord.startDate,
  //                 'HH:mm'
  //               )} - ${DateHelper.format(eventRecord.endDate, 'HH:mm')}
  //             </dd>

  //             <dt>Tail</dt>
  //             <dd>
  //                 ${eventRecord.resource.name}
  //             </dd>
  //           </div>`;

  //         let imgUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-1+6fed07(${eventRecord.departLng},${eventRecord.departLat}),pin-s-2+f50505(${eventRecord.arriveLng},${eventRecord.arriveLat})/auto/200x120?access_token=pk.eyJ1Ijoic3RldmVkcnVja2VyIiwiYSI6ImNsOTUxaWhhODI4bmgzb3A4dWZlenZiaTMifQ.amy2JvjMmUQBIjckFdQ_NQ`;

  //         output += `
  //           <div class="t-column style="margin-left: 5px; width:200px">
  //             <div id="eventmap">
  //               <img style="border-radius: 5px; width: 200px; height: 120px;" src="${imgUrl}">
  //             </div>
  //           </div>`;

  //         // close row
  //         output += `
  //         </div>`;

  //         // pilots
  //         if (eventRecord.pilots && eventRecord.pilots.length > 0) {
  //           output += `
  //           <dt>Crew</dt>
  //           <dd>`;
  //           let labels = [];
  //           for (let j = 0; j < eventRecord.pilots.length; j++) {
  //             labels.push(
  //               eventRecord.pilots[j].firstName +
  //                 ' ' +
  //                 eventRecord.pilots[j].lastName +
  //                 ' (' +
  //                 eventRecord.pilots[j].position +
  //                 ')'
  //             );
  //           }
  //           output += labels.join(', ') + '</dd>';
  //         } else {
  //           output += `
  //           <dt>Crew</dt>
  //           <dd>None Assigned</dd>`;
  //         }
  //       }
  //       return output;
  //     }

  //     // You can also use Tooltip configs here, for example:
  //     // anchorToTarget : false,
  //     // trackMouse     : true
  //   },

  //   dependencies: {
  //     radius: 10,
  //     clickWidth: 20,
  //     highlightDependenciesOnEventHover: true

  //     //this can't work here as we need a reference on the schedulerPro
  //     // tooltip: {
  //     //   getHtml({ activeTarget }) {
  //     //     const dependencyModel =
  //     //       schedulerPro.resolveDependencyRecord(activeTarget);

  //     //     if (!dependencyModel) return null;

  //     //     const { fromEvent, toEvent, stores } = dependencyModel;
  //     //     let dependencyStoreData = stores[0]._data;
  //     //     let scheduledTripNumber = fromEvent.scheduledTripNumber;
  //     //     let res = `Trip ${fromEvent.scheduledTripNumber} : ${
  //     //       fromEvent.company || fromEvent.contact
  //     //     }<br />`;

  //     //     let events = schedulerPro.eventStore._data;
  //     //     for (let i = 0; i < events.length; i++) {
  //     //       let rec = events[i];
  //     //       if (rec.scheduledTripNumber == scheduledTripNumber) {
  //     //         res += `${rec.departIcao} > ${rec.arriveIcao} at ${rec.departLocalFormatted} on ${rec.tail}<br />`;
  //     //       }
  //     //     }

  //     //     return res;
  //     //   }
  //     // }
  //   }

  //   //   dependencies: false
  // },

  columns: [
    {
      type: "resourceInfo",
      text: "Tails",
      width: 120,
      showImage: true,
      showEventCount: false,
    },
    {
      text: "Region",
      field: "region",
      width: 80,
    },
    {
      text: "Aircraft",
      field: "aircrafttype_label",
      width: 160,
    },
    {
      text: "Type",
      field: "type",
      width: 80,
    },
  ],

  //from demo
  eventRenderer({ eventRecord, renderData }) {
    const { iconCls } = renderData;

    // We don't want Scheduler to inject our icon.
    // We render it here
    renderData.iconCls = null;

    /*
      let displayString = `
      ${eventRecord.company ? eventRecord.company : eventRecord.contact} <br />
      ${eventRecord.tripstatusLabel} <br />
      ${eventRecord.pax} PAX
  `;
      */
    let displayString = `${
      eventRecord.company ? eventRecord.company : eventRecord.contact
    }`;

    if (displayString == "undefined") {
      displayString = "";
    }

    let output = [
      {
        className: "event-header",
        children: [
          {
            tag: "i",
            className: eventRecord.iconCls,
          },
          // xss protection
          {
            html: StringHelper.encodeHtml(eventRecord.name),
          },
        ],
      },
    ];

    if (this.fillTicks) {
      output.push({
        html: `${DateHelper.format(
          eventRecord.startDate,
          "HH:mm"
        )} - ${DateHelper.format(eventRecord.endDate, "HH:mm")}`,
      });
    }

    if (eventRecord.pax > 0) {
      output.push({
        className: "event-body",
        html: displayString,
      });
    }

    if (eventRecord.type && eventRecord.type != "mx") {
      if (eventRecord.pilots && eventRecord.pilots.length > 0) {
        let labels = eventRecord.pilots.map(
          (p) => p.initials + " (" + p.position + ")"
        );
        output.push({
          className: "event-body",
          html: labels.join(", "),
        });
      } else {
        output.push({
          className: "event-body",
          html: "No Crew Assigned",
        });
      }
    }

    if (eventRecord.note) {
      output.push({
        className: "event-body",
        html: eventRecord.note,
      });
    }

    return output;
  },

  //from demo
  listeners: {
    eventMenuBeforeShow: function (event) {
      if (event.eventRecord.type && event.eventRecord.type == "annotation") {
        return false;
      }
    },
  },
};
