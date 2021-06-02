import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import NavBar from "./layout/NavBar";
import SideBar from "./layout/SideBar";

function Reporting() {
  const data = {
    labels: ["t", "a", "e", "r"],
    datasets: [
      {
        label: "Test test test",
        data: [1, 9, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
      },
    ],
  };

  const options = {
    title: {
      display: true,
      text: "Bar Chart",
    },
    scales: {
      yAxes: [
        {
          ticks: {},
          scaleLabel: {
            display: true,
            labelString: "Percentage d'absence",
          },
        },
      ],
    },
  };

  return (
    <>
      <NavBar />
      <SideBar />
      <div style={{ marginBottom: "45px" }}></div>
      <div className="reporting">
        <div className="container mt-n10">
          <div className="row">
            <div className="col-xxl-3 col-lg-3">
              <div className="card bg-primary text-white mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mr-3">
                      <div className="text-white-95 small">
                        Nombre des Cartes
                      </div>
                      <div className="text-lg font-weight-bold">45</div>
                    </div>
                    <i
                      className="fa fa-credit-card fa-3x"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-3">
              <div className="card bg-success text-white mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mr">
                      <div className="text-white-95 small">
                        Nombre des Marchés
                      </div>
                      <div className="text-lg font-weight-bold">345</div>
                    </div>
                    <i className="fas fa-store fa-3x text-white-150"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-3 ">
              <div className="card bg-warning text-white mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mr-3">
                      <div className="text-white-95 small">
                        Nombre Familles produit
                      </div>
                      <div className="text-lg font-weight-bold">156</div>
                    </div>
                    <i className="fas fa-boxes fa-3x text-white-150"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-3 col-lg-3 ">
              <div className="card bg-info text-white mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="mr-3">
                      <div className="text-white-95 small">
                        Nombre Types Client
                      </div>
                      <div className="text-lg font-weight-bold">15</div>
                    </div>
                    <i className="fas fa-users fa-3x text-white-150"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 mb-4">
              <div className="card card-header-actions h-100">
                <div className="card-header">header</div>
                <div className="card-body">
                  <Bar data={data} options={options}></Bar>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 mb-4">
              <div className="card card-header-actions h-100">
                <div className="card-header">hohoh</div>
                <div className="card-body">
                  <Bar data={data} options={options}></Bar>
                </div>
              </div>
            </div>

            <div className="col-xxl-6 col-xl-6 mb-4 ">
              <div className="card card-header-actions h-100">
                <div className="card-header">
                  Nombre des etudiant par filiere
                </div>
                <div className="card-body">
                  <Pie
                    data={data}
                    width={100}
                    height={300}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 mb-4 ">
              <div className="card card-header-actions h-100">
                <div className="card-header">
                  Nombre des etudiant par filiere
                </div>
                <div className="card-body">
                  <Pie
                    data={data}
                    width={100}
                    height={300}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reporting;
