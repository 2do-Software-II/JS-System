import { Component, ViewChild, OnInit } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive
} from "ng-apexcharts";
import { Booking } from "src/app/auth/interfaces/booking.interface";
import { Room } from "src/app/auth/interfaces/room.interface";
import { ReservationService } from "src/app/reservations/reservation.service";

export type ChartOptionsC = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

export type ChartOptionsA = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  labels: string[];
  legend: ApexLegend;
  subtitle: ApexTitleSubtitle;
};

export type ChartOptionsR = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  @ViewChild("chartC", { static: false })
  chartc: ChartComponent | any;
  @ViewChild("chartA", { static: false })
  charta: ChartComponent | any;
  @ViewChild("chartR", { static: false })
  chartr: ChartComponent | any;

  public chartOptionsR: Partial<ChartOptionsR> | any;
  public chartOptionsC: Partial<ChartOptionsC> | any;
  public chartOptionsA: Partial<ChartOptionsA> | any;
  public bookingsToday: Booking[] = [];

  constructor(
    private reservationService: ReservationService,
  ) {
    this.chartOptionsC = {
      series: [
        {
          name: "Ingresos",
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2] // Array con los ingresos mensuales
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val;
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "Ene",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agos",
          "Sep",
          "Oct",
          "Nov",
          "Dic"
        ],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val;
          }
        }
      },
      title: {
        text: "Ingresos mensuales, 2024",
        offsetY: 320,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
    this.chartOptionsA = {
      series: [
        {
          name: "CANTIDAD RESERVAS",
          data: [
            8107.85,
            8128.0,
            8122.9,
            8165.5,
            8340.7,
            8423.7,
            8423.5,
            8514.3,
            8481.85,
            8487.7,
            8506.9,
            8626.2
          ]
        }
      ],
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      title: {
        text: "Reservas de habitaciones por mes",
        align: "left"
      },
      subtitle: {
        text: "Año 2024",
        align: "left"
      },
      labels: [
        "Ene",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agos",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ],
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
    this.chartOptionsR = {
      series: [44, 55, 13, 43, 22, 12, 15],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["Room A", "Room B", "Room C", "Room D", "Room E", "Room E", "Room E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    this.reservationService.getReservations().subscribe((bookings) => {
      const date = new Date().toISOString().split('T')[0];
      const dateNowFormat = this.extractDateFormat(date);
      this.bookingsToday = bookings.filter((booking) => booking.startDate === dateNowFormat);
    });
  }

  extractDateFormat(date: string) {
    const dateI = new Date(date);
    let day;
    let month
    let monthNumber = dateI.getMonth() + 1;
    const year = dateI.getFullYear();
    if (dateI.getDate() < 10) {
      day = `0${dateI.getDate()}`;
    } else {
      day = dateI.getDate();
    }
    if (monthNumber < 10) {
      month = `0${monthNumber}`;
    } else {
      month = dateI.getMonth() + 1;
    }
    return `${day}/${month}/${year}`;
  }
}
