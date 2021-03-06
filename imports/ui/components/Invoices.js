import React, { PropTypes } from 'react';
import { composeWithTracker } from 'react-komposer';
import { ListGroup, ListGroupItem, Row, Col, Label } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import Invoices from '../../api/invoices/invoices';
import { epochToHuman } from '../../modules/dates';
import centsToDollars from '../../modules/cents-to-dollars';

class InvoicesList extends React.Component {
  render() {
    const { invoices } = this.props;

    if(invoices.length > 0) { 
      return (<div className="Invoices">
      <h4 className="page-header">Factures</h4>
      <ListGroup>
        {invoices.map(({ _id, paid, date, total }) => {
          return (<ListGroupItem key={_id}>
            <Row>
              <Col xs={2} sm={2}>
                {paid ?
                <Label bsStyle="success">Payé</Label> :
                <Label bsStyle="danger">Dû</Label>}
              </Col>
              <Col xs={7} sm={7}>
                {epochToHuman(date)}
              </Col>
              <Col xs={3} sm={3} className="text-right">
                {centsToDollars(total)}
              </Col>
            </Row>
          </ListGroupItem>);
        })}
      </ListGroup>
    </div>);
    } else {
      return (<div className="Invoices">
      <h4 className="page-header">Factures</h4>
      <p>Aucune facture à afficher.</p>
    </div>);
    }
  }
}

InvoicesList.propTypes = {
  invoices: PropTypes.array,
};

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('customer.invoices');
  if (subscription.ready()) {
    const invoices = Invoices.find().fetch();
    onData(null, { invoices });
  }
};

export default composeWithTracker(composer)(InvoicesList);
