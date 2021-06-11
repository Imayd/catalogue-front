import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import NavBar from "./layout/NavBar";
import SideBar from "./layout/SideBar";
import {
  GetNbrMarketsAction,
  GetNbrCartesAction,
  GetNbrFamillesProduitsAction,
  GetNbrTypesClientAction,
  GetNbrCartesParThemeAction,
  GetNbrServicesParCategorieServiceAction,
  GetNbrServicesParGrpStatutsAction,
  GetNbrServicesParGrpMotifsAction,
  GetGrpsMotifsAction,
  GetGrpsStatutsAction,
  GetThemesAction,
  GetCategoriesServiceAction,
} from "../redux/reporting/reportingActions";

function Reporting(props) {
  const {
    reporting,
    GetNbrMarketsAction,
    GetNbrCartesAction,
    GetNbrFamillesProduitsAction,
    GetNbrTypesClientAction,
    GetNbrCartesParThemeAction,
    GetNbrServicesParCategorieServiceAction,
    GetNbrServicesParGrpStatutsAction,
    GetNbrServicesParGrpMotifsAction,
    GetGrpsMotifsAction,
    GetGrpsStatutsAction,
    GetThemesAction,
    GetCategoriesServiceAction,
  } = props;

  useEffect(() => {
    GetNbrMarketsAction();
    GetNbrCartesAction();
    GetNbrFamillesProduitsAction();
    GetNbrTypesClientAction();
    GetNbrCartesParThemeAction();
    GetNbrServicesParCategorieServiceAction();
    GetNbrServicesParGrpStatutsAction();
    GetNbrServicesParGrpMotifsAction();
    GetGrpsMotifsAction();
    GetGrpsStatutsAction();
    GetThemesAction();
    GetCategoriesServiceAction();
  }, [
    GetNbrMarketsAction,
    GetNbrCartesAction,
    GetNbrFamillesProduitsAction,
    GetNbrTypesClientAction,
    GetNbrCartesParThemeAction,
    GetNbrServicesParCategorieServiceAction,
    GetNbrServicesParGrpStatutsAction,
    GetNbrServicesParGrpMotifsAction,
    GetGrpsMotifsAction,
    GetGrpsStatutsAction,
    GetThemesAction,
    GetCategoriesServiceAction,
  ]);

  const dataServiceCategorie = {
    labels: reporting.categoriesService,
    datasets: [
      {
        data: reporting.nbrServicesParCategorieService,
        fill: false,
        borderColor: "white",
        backgroundColor: ["red", "rgba(75,192,192,0.4)", "blue", "orange"],
      },
    ],
  };

  const dataServiceGrpsStatuts = {
    labels: reporting.grpsStatuts,
    datasets: [
      {
        data: reporting.nbrServicesParGrpStatuts,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
      },
    ],
  };

  const dataServiceGrpsMotifs = {
    labels: reporting.grpsMotifs,
    datasets: [
      {
        data: reporting.nbrServicesParGrpMotifs,
        backgroundColor: [
          "rgba(255, 206, 96, 0.9)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
      },
    ],
  };

  const dataCarteTheme = {
    labels: reporting.themes,
    datasets: [
      {
        label: "Nombre des cartes",
        data: reporting.nbrCartesParTheme,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
      },
    ],
  };

  const options = {
    //legend: { display: false },
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
                      <div className="text-lg font-weight-bold">
                        {reporting.nbrCartes}
                      </div>
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
                      <div className="text-lg font-weight-bold">
                        {" "}
                        {reporting.nbrMarkets}
                      </div>
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
                      <div className="text-lg font-weight-bold">
                        {" "}
                        {reporting.nbrFamillesProduits}
                      </div>
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
                      <div className="text-lg font-weight-bold">
                        {" "}
                        {reporting.nbrTypesClient}
                      </div>
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
                <div className="card-header">Nombre des cartes par thèmes</div>
                <div className="card-body">
                  <Bar data={dataCarteTheme} options={options}></Bar>
                </div>
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 mb-4">
              <div className="card card-header-actions h-100">
                <div className="card-header">
                  Nombre des services par catégories{" "}
                </div>
                <div className="card-body">
                  <Pie
                    data={dataServiceCategorie}
                    width={100}
                    height={300}
                    options={{ maintainAspectRatio: false }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-6 col-xl-6 mb-4 ">
              <div className="card card-header-actions h-100">
                <div className="card-header">
                  Nombre des services par groupement de statuts
                </div>
                <div className="card-body">
                  <Doughnut
                    data={dataServiceGrpsStatuts}
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
                  Nombre des services par groupement de motifs
                </div>
                <div className="card-body">
                  <Doughnut
                    data={dataServiceGrpsMotifs}
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

const mapStateToProps = (state) => {
  return {
    reporting: state.reporting,
  };
};

/*
    TO MAP ACTION CREATORS TO PROPS
    */
const mapDispatchToProps = (dispatch) => ({
  GetNbrMarketsAction: () => dispatch(GetNbrMarketsAction()),
  GetNbrCartesAction: () => dispatch(GetNbrCartesAction()),
  GetNbrFamillesProduitsAction: () => dispatch(GetNbrFamillesProduitsAction()),
  GetNbrTypesClientAction: () => dispatch(GetNbrTypesClientAction()),
  GetNbrCartesParThemeAction: () => dispatch(GetNbrCartesParThemeAction()),
  GetNbrServicesParCategorieServiceAction: () =>
    dispatch(GetNbrServicesParCategorieServiceAction()),
  GetNbrServicesParGrpStatutsAction: () =>
    dispatch(GetNbrServicesParGrpStatutsAction()),
  GetNbrServicesParGrpMotifsAction: () =>
    dispatch(GetNbrServicesParGrpMotifsAction()),
  GetThemesAction: () => dispatch(GetThemesAction()),
  GetCategoriesServiceAction: () => dispatch(GetCategoriesServiceAction()),
  GetGrpsStatutsAction: () => dispatch(GetGrpsStatutsAction()),
  GetGrpsMotifsAction: () => dispatch(GetGrpsMotifsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Reporting);

/*const data = {
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
*/

/*

<div className="col-xxl-6 col-xl-6 mb-4">
              <div className="card card-header-actions h-100">
                <div className="card-header">
                  Nombre des services par catégories{" "}
                </div>
                <div className="card-body">
                  {/*<Bar data={data2} options={options}></Bar>
                  <PolarArea
                    data={data3}
                    options={options}
                    width={60}
                    height={200}
                  ></PolarArea>
                </div>
              </div>
            </div>

*/
