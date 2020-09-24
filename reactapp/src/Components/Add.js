// import { PromiseProvider } from 'mongoose';
import {connect} from 'react-redux';
// import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import { Button, Input, FormGroup, Alert } from 'reactstrap';

// import './App.css';

function Add(props) {

    const [titre, setTitre] = useState("")
    const [type, setType] = useState("Revenu")
    const [montant, setMontant] = useState(0);
    const [visible, setVisible] = useState(false)

var handleClick = async () => {

  let montantNumerise = Number(montant)
console.log(montantNumerise)
  // Verif si les valeurs rentrées dans les inputs sont valides
    if (!isNaN(montantNumerise) && titre.length >0){

      // Ajout en BDD
      await fetch('/add-expense', {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `title=${titre}&type=${type}&amount=${montantNumerise}`
      })

      // Ajout dans REDUX
      props.addToHistory(type,titre,montantNumerise)

      // Reinitialisation des champs
      setTitre("");
      setMontant(0)
      setVisible(false)
  } else {
    setVisible(true)
  }

}

  return (
    <div style={styles.container}>
        <strong><p>Ajouter une transaction</p></strong>
        <FormGroup style={styles.container}>
          {/* <Label for="backdrop">Type</Label> */}

            <Input style={styles.input} type="select" name="backdrop" id="backdrop" onChange={(e) => setType(e.target.value)}>
                <option value="revenu">Revenu</option>
                <option value="depense">Depense</option>
            </Input>

            <input 
                  className="titre" 
                  placeholder="description"
                  onChange={(e) => setTitre(e.target.value)} 
                  value={titre}
                  style={styles.input}
             />

            <input 
                  className="montant" 
                  placeholder="montant"
                  onChange={(e) => setMontant(e.target.value)} 
                  value={montant}
                  style={styles.input}
             />

            <Button color="primary" onClick={() => handleClick()}>Valider</Button>
            <Alert color="danger" isOpen={visible}>
              Veuillez rentrer du texte dans la description, et un nombre pour le montant
            </Alert>
        </FormGroup>
    </div>
  )
}

const styles = {
  container :{
    display : 'block', 
    justifyContent:'center', 
    alignItems:'center', 
    width: '100vh'
  },
  input: {
    marginTop: '15px',
    marginBottom: "15px",
    display : 'block',
    width : '70%',
    height: '40px'
  }
};

function saveNewExpense(dispatch) {
  return {
      addToHistory:function(type,titre,montant){
        dispatch({type:"addExpense",
                  expense: {
                    title: titre,
                    type: type,
                    amount: montant,
                    date: Date.now()
                  }})
      }
  }
}

export default connect (
  null,
  saveNewExpense
)(Add);

