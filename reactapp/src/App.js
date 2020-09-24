import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import Balance from './Components/Balance';
import History from './Components/History';
import Add from './Components/Add';

//Connexion Redux
import history from './reducer/expensesHistory'; 
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({history}));


function App() {
  return (
    <Provider store={store}>  
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h1 style={{margin:'30px', textAlign:"center"}}>Expense Tracker</h1>
            <Balance/>
            <History/>
            <Add/>
          </Col>
        </Row>
      </Container>
    </Provider>
  );
}

export default App;
