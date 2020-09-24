import React, {useEffect, useState} from 'react';
import { Card, CardTitle, CardText, CardGroup, CardBody } from 'reactstrap';
import {connect} from 'react-redux';

// import './App.css';

function Balance(props) {

    const [revenu, setRevenu] = useState(0);
    const [depense, setDepense] = useState(0);
    const [expenses, setExpenses] = useState([])

    // UseEffect au chargement
    useEffect(() => {
        let getExpensesHistory = async () => {
            // Recuperation de l'historique en BDD
            const response = await fetch('/expenses-history')
            const jsonResponse = await response.json()
        
            // Enregistrement dans redux
            props.saveExpenseHistory(jsonResponse.expenses);
          }

          getExpensesHistory();
        
        }, [])

// UseEffect qui se declanche à chaque changement de l'historique dans REDUX
        useEffect(() => {

            let updateExpensesHistory = async () => {
            let depenseTemp=0;
            let revenuTemp=0;
            // setDepense(0);
            // setRevenu(0);
            // Enregistrement de l'historique dans l'état
            setExpenses(props.recupHistoryFromRedux)

            // Repartition montant depense/revenu
            props.recupHistoryFromRedux.forEach(expense => {
                if (expense.type === "depense") {
                    depenseTemp += expense.amount
                } else {
                    revenuTemp+=expense.amount
                }
            })

            setDepense((depenseTemp).toFixed(2))
            setRevenu((revenuTemp).toFixed(2))
                
              }
              updateExpensesHistory();
            
            }, [props.recupHistoryFromRedux])


    let solde = (revenu-depense).toFixed(2);

    let colorBalance = "green"
    if (solde <0) {
        colorBalance = "red"
    }


  return (
    <div>
        <strong><p>Votre solde</p></strong>
        <p style={{color: colorBalance}}>{solde} €</p>
        <CardGroup style={{marginBottom:"30px"}}>
            <Card>
                <CardBody>
                <CardTitle>Revenus</CardTitle>
                <CardText style={{color: "green"}}>{revenu}€</CardText>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                <CardTitle>Depenses</CardTitle>
                <CardText style={{color: 'red'}}>-{depense}€</CardText>
                </CardBody>
            </Card>
        </CardGroup>
    </div>
  );
}

function saveExpenseHistory(dispatch) {
    return {
        saveExpenseHistory:function(expenseArray){
            dispatch({type:"saveExpenseHistory",
                      history:expenseArray})
        }
    }
}

function recupHistoryFunction(storeState) {
    return {
        recupHistoryFromRedux: storeState.history
    }
}

export default connect (
    recupHistoryFunction,
    saveExpenseHistory
)(Balance);