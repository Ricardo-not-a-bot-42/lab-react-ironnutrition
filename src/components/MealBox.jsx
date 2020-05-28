import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class MealBox extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }

  changeQuantity = (event) => {
    this.setState({
      quantity: event.target.value,
    });
  };
  render() {
    return (
      <div className="media">
        <Image
          src={this.props.image}
          className="img-thumbnail mr-3 mw-25 border-0"
          style={{ maxWidth: '5em' }}
        />
        <div className="media-body align-self-center">
          <h5 className="mt-0 mb-1">{this.props.name}</h5>
          <small>{this.props.calories} cal</small>
        </div>
        <form className="row align-self-center" onSubmit={this.props.onClick}>
          <input
            className="form-control col-9"
            type="number"
            name="quantity"
            value={this.state.quantity}
            onChange={this.changeQuantity}
          />
          <button className="btn btn-primary col-3">+</button>
        </form>
      </div>
    );
  }
}

export default MealBox;
