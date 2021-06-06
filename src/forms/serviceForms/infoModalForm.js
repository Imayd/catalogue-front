import React from "react";
import { Form, Col, Button, Row } from "react-bootstrap";

function InfoModalForm(props) {
  const { service, annuler } = props;
  const serviceCode = service.code;
  const serviceLibelle = service.libelle;
  const serviceDescription = service.description;
  const serviceServInternational = service.servInternational;
  const serviceStatut = service.statut;
  const serviceCategorieService = service.categorieService;
  const serviceCarte = service.carte;
  const serviceGrpMotifs = service.groupementMotifs;
  const serviceGrpStatuts = service.groupementStatuts;
  const serviceDateCreation = service.dateCreation;
  const serviceDateModification = service.dateModification;
  const serviceDateEffectivite = service.dateEffectivite;
  const serviceDateFinEffectivite = service.dateFinEffectivite;

  return (
    <>
      <Form>
        <Row>
          <Col className="infoModal">Code :</Col>
          <Col> {serviceCode}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Libellé :</Col>
          <Col>{serviceLibelle}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Statut :</Col>
          <Col> {serviceStatut ? "Actif" : "Inactif"}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Catégorie de services associée :</Col>
          <Col> {serviceCategorieService}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Produit associée :</Col>
          <Col> {serviceCarte}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Groupement de statuts associé :</Col>
          <Col> {serviceGrpStatuts}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Groupement de motifs associé :</Col>
          <Col> {serviceGrpMotifs}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Date d'effectivité :</Col>
          <Col> {serviceDateEffectivite}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Date de fin d'effectivité :</Col>
          <Col> {serviceDateFinEffectivite}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Date de création :</Col>
          <Col> {serviceDateCreation}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Date de la dernière modification :</Col>
          <Col> {serviceDateModification}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Service International :</Col>
          <Col> {serviceServInternational ? "OUI" : "NON"}</Col>
        </Row>
        <Row>
          <Col className="infoModal">Description :</Col>
          <Col>{serviceDescription}</Col>
        </Row>
      </Form>

      <hr></hr>
      <div style={{ float: "right" }}>
        <Button
          type="reset"
          variant="warning"
          style={{ borderRadius: "20px" }}
          onClick={annuler}
        >
          Fermer
        </Button>
      </div>
    </>
  );
}

export default InfoModalForm;
