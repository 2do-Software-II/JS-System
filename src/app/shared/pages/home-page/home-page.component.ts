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
import { ReservationService } from "src/app/reservations/reservation.service";
import { DashboardService } from "../../services/dashboard.service";

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

  public serialOne: any = [];
  public nameSerialOne: any = [];

  public serialTwo: any = [];
  public nameSerialTwo: any = [];

  public serialThree: any = [];
  public nameSerialThree: any = [];

  constructor(
    private reservationService: ReservationService,
    private dashboardService: DashboardService
  ) {
    this.dashboardService.get().subscribe((dashboard) => {
      dashboard.optionTwo.forEach((element) => {
        this.serialTwo.push(element.fullPayment);
        this.nameSerialTwo.push(this.nameMonthByNumber(element.monthNumber));
      });
      this.loadChartOptionC();
      dashboard.optionOne.forEach((element) => {
        this.serialOne.push(element.fullPayment);
        this.nameSerialOne.push(this.formatDate(element.date));
      });
      this.loadChartOptionA();
      dashboard.optionThree.forEach((element) => {
        this.serialThree.push(element.reservationCount);
        this.nameSerialThree.push(this.nameMonthByNumber(element.monthNumber));
      });
      this.loadChartOptionR();

    });
    this.chartOptionsC = {
      series: [
        {
          name: "Ingresos",
          data: this.serialTwo// Array con los ingresos mensuales
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
        categories: this.nameSerialTwo,
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
          name: "CANTIDAD DE INGRESOS POR DIA ",
          data: this.serialOne
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
        text: "Cantidad de ingresos por dia",
        align: "left"
      },
      subtitle: {
        text: "Año 2024",
        align: "left"
      },
      labels: this.nameSerialOne,
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
    this.chartOptionsR = {
      series: this.serialThree,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.nameSerialThree,
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
  }

  loadChartOptionC() {
    this.chartOptionsC = {
      series: [
        {
          name: "Ingresos",
          data: this.serialTwo// Array con los ingresos mensuales
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
          return val + " Bs.";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: this.nameSerialTwo,
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
            return val + " Bs.";
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
  }

  loadChartOptionA() {
    this.chartOptionsA = {
      series: [
        {
          name: "CANTIDAD DE INGRESOS POR DIA ",
          data: this.serialOne
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
        text: "Cantidad de ingresos por dia",
        align: "left"
      },
      subtitle: {
        text: "Año 2024",
        align: "left"
      },
      labels: this.nameSerialOne,
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    };
  }

  loadChartOptionR() {
    this.chartOptionsR = {
      series: this.serialThree,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.nameSerialThree,
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



  nameMonthByNumber(monthNumber: number) {
    switch (monthNumber) {
      case 1:
        return "Enero";
      case 2:
        return "Febrero";
      case 3:
        return "Marzo";
      case 4:
        return "Abril";
      case 5:
        return "Mayo";
      case 6:
        return "Junio";
      case 7:
        return "Julio";
      case 8:
        return "Agosto";
      case 9:
        return "Septiembre";
      case 10:
        return "Octubre";
      case 11:
        return "Noviembre";
      case 12:
        return "Diciembre";
      default:
        return "";
    }
  }


  formatDate(date: string) {
    // input 2024-05-11T00:00:00 output 11/05/2024
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
