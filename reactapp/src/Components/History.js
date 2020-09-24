import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
// import { Alert } from 'reactstrap';
import { Table, Badge} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimes} from '@fortawesome/free-solid-svg-icons'

// import './App.css';

function History(props) {

  // const [expenses, setExpenses] = useState([])

  // // UseEffect qui se declanche à chaque changement de l'historique dans REDUX
  // useEffect(() => {
  //   //Enregistrement de l'historique dans l'état
  //   setExpenses(props.recupHistoryFromRedux)
  //   }, [props.recupHistoryFromRedux])


    const deleteExpense = async (date) => {
      // Suppression en BDD
      const newHistory = await fetch(`/delete-expense/${date}`, {
            method: 'DELETE'
          })
      const jsonNewHistory = await newHistory.json()
      // Mise à jour du reducer
      props.saveExpenseHistory(jsonNewHistory.expenses)
    }

    // Fonction qui met les dates au format lisible
    var dateFormat = (date) => {
      var newDate = new Date(date);
      var format = newDate.getDate()+'/'+(newDate.getMonth()+1)+'/'+newDate.getFullYear();
      return format;
    }

let arrayOfHistory = props.recupHistoryFromRedux.sort((a,b) => b.date-a.date)
                             .map((flux,i) => {
    
                                  let color = "success"
                                  if (flux.type === "depense") {
                                      color = 'danger'
                                  }

                                  return (
                                  <tr>
                                  <td>{dateFormat(flux.date)}</td>
                                  <td><Badge color={color} pill>{flux.title}</Badge></td>
                                  <td>{flux.amount} €</td>
                                  <td><FontAwesomeIcon icon={faTimes} onClick={()=> deleteExpense(flux.date)}/></td>
                                </tr>
                              )})

  return (
    <div>
        <strong><p>Historique</p></strong>
        <Table style={styles.tableau}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>montant</th>
        </tr>
      </thead>
      <tbody>
        {arrayOfHistory}
    </tbody>
    </Table>
    <hr
        style={{
            color: "black",
            height: 5
        }}
    />
    </div>
  );
}

function recupHistoryFunction(storeState) {
  return {
      recupHistoryFromRedux: storeState.history
  }
}

function saveExpenseHistory(dispatch) {
  return {
      saveExpenseHistory:function(expenseArray){
          dispatch({type:"saveExpenseHistory",
                    history:expenseArray})
      }
  }
}

export default connect(
  recupHistoryFunction,
  saveExpenseHistory
)(History);

const styles = {
    tableau: {
        maxHeight: '10px',
        maxWidth: '540px'
    }
  }


// let arrayOfHistory = historique.map((flux,i) => {
//     let color = "success"
//     if (flux.type === "depense") {
//         color = 'danger'
//     }
//     return (<Alert key={i} color={color}>
//     {flux.titre}{flux.montant}
//   </Alert>)
// })