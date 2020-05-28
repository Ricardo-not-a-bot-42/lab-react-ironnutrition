import React, { Component } from 'react';
import './App.scss';

import MealBox from './components/MealBox';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';

import meals from './meals';

class App extends Component {
  constructor() {
    super();
    this.state = {
      mealList: meals,
      eatenToday: [],
      totalCal: 0,
      addNewFood: false,
      values: {
        name: '',
        calories: 0,
        image: '',
        quantity: 0,
      },
    };
  }

  addFoodToggle = () => {
    this.setState({
      addNewFood: true,
    });
  };

  handleSubmission = (event) => {
    event.preventDefault();
    const list = [...this.state.mealList];
    list.push(this.state.values);
    console.log(this.state.values.name);
    this.setState({
      mealList: list,
      values: {
        name: '',
        calories: 0,
        image: '',
        quantity: 0,
      },
      searchValue: '',
      addNewFood: false,
    });
  };

  handleInputChange = (event) => {
    const $domNode = event.target;
    console.log(event.target);
    this.setState({
      values: {
        ...this.state.values,
        [$domNode.name]: $domNode.value,
      },
    });
    console.log(this.state.eatenToday);
  };

  searchChange = (event) => {
    const value = event.target.value;
    this.setState({
      searchValue: value,
      mealList: meals.filter((meal) => {
        return meal.name.toLowerCase().includes(value);
      }),
    });
  };

  addEaten = (name, calories, id, event) => {
    event.preventDefault();
    const target = event.target;
    const list = [...this.state.eatenToday];
    let eaten = {
      name: name,
      calories: calories,
      quantity: target[0].value,
      id: id,
    };
    const updatedList = list.map((meal) => {
      if (meal.name === name) {
        const mealQuantity = Number(meal.quantity) + Number(eaten.quantity);
        eaten = null;
        return { ...meal, quantity: mealQuantity };
      } else {
        return meal;
      }
    });
    if (eaten) {
      updatedList.push(eaten);
    }
    this.setState({
      eatenToday: updatedList,
      totalCal: this.state.totalCal + calories * target[0].value,
    });
  };

  deleteEaten = (name, calories, id) => {
    const list = [...this.state.eatenToday];
    const updatedList = list.filter((meal) => {
      if (meal.id !== id) {
        return true;
      }
    });
    this.setState({
      eatenToday: updatedList,
      totalCal: this.state.totalCal - calories,
    });
  };

  render() {
    return (
      <Container>
        <p>Sample App</p>

        <Row>
          <Col>
            {(!this.state.addNewFood && (
              <Button onClick={this.addFoodToggle}>Add New Meal</Button>
            )) || (
              <Form onSubmit={this.handleSubmission}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Food Name"
                  id=""
                  value={this.state.values.name}
                  onChange={this.handleInputChange}
                ></Form.Control>
                <Form.Control
                  type="number"
                  name="calories"
                  placeholder="Food Calories"
                  id=""
                  value={this.state.values.calories}
                  onChange={this.handleInputChange}
                ></Form.Control>
                <Form.Control
                  type="text"
                  name="image"
                  placeholder="Food Image URL"
                  id=""
                  value={this.state.values.image}
                  onChange={this.handleInputChange}
                ></Form.Control>
                <Button type="submit">Add Food</Button>
              </Form>
              // <form onSubmit={this.handleSubmission}>
              //   <input
              //     type="text"
              //     name="name"
              //     id=""
              //     value={this.state.values.name}
              //     onChange={this.handleInputChange}
              //   />
              //   <input
              //     type="number"
              //     name="calories"
              //     id=""
              //     value={this.state.values.calories}
              //     onChange={this.handleInputChange}
              //   />
              //   <input
              //     type="text"
              //     name="image"
              //     id=""
              //     value={this.state.values.image}
              //     onChange={this.handleInputChange}
              //   />
              //   <button>Add</button>
              // </form>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <Form>
              <Form.Control
                type="text"
                placeholder="Search"
                value={this.state.searchValue}
                onChange={this.searchChange}
              ></Form.Control>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {this.state.mealList.map((meal) => {
                const id = Math.random() * 20;
                return (
                  <ListGroup.Item>
                    <MealBox
                      key={id}
                      name={meal.name}
                      calories={meal.calories}
                      image={meal.image}
                      quantity={meal.quantity}
                      onClick={(e) =>
                        this.addEaten(meal.name, meal.calories, id, e)
                      }
                    />
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col>
            <h1>Today's Foods</h1>
            <ul>
              {this.state.eatenToday.map((meal) => {
                return (
                  <li key={meal.id}>
                    {meal.quantity} {meal.name} ={' '}
                    {meal.calories * meal.quantity} cal
                    <Button
                      onClick={() => {
                        this.deleteEaten(
                          meal.name,
                          meal.calories * meal.quantity,
                          meal.id
                        );
                      }}
                    >
                      🗑
                    </Button>
                  </li>
                );
              })}
            </ul>
            <h3>Total: {this.state.totalCal} cal</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
