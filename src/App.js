import './App.css';
import CurrencyInput from './component/currencyInput';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('CAD');
  const [rates, setRates] = useState([])
  
  useEffect(() => {
    axios.get('http://data.fixer.io/api/latest?access_key=fb297b61addd07b3e3b0d21197a377aa')
      .then(response => {
        setRates(response.data.rates)
      })
  }, [])

  useEffect(() => {
    if(!!rates){
      handleAmount1Change(1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rates])

  const formatNumberLengthTo4=(number)=>{
    return number.toFixed(2);
  }

  const handleAmount1Change = (amount1) => {
    setAmount2(formatNumberLengthTo4(amount1 * rates[currency2] / rates[currency1]));
    setAmount1(amount1);
  }

  const handleCurrency1Change=(currency1) =>{
    setAmount2(formatNumberLengthTo4(amount1 * rates[currency2] / rates[currency1]));
    setCurrency1(currency1);
  }

  const handleAmount2Change=(amount2)=> {
    setAmount1(formatNumberLengthTo4(amount2 * rates[currency1] / rates[currency2]));
    setAmount2(amount2);
  }

  const handleCurrency2Change=(currency2)=>{
    setAmount1(formatNumberLengthTo4(amount2 * rates[currency1] / rates[currency2]));
    setCurrency2(currency2);
  }



  return (
    <div className="App">
      <h1>Currency Convertor</h1>
      <h4>Find exchage rates between any two currencies in the world</h4>

      <CurrencyInput 
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)} 
        amount={amount1} 
        currency={currency1 }
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change} 
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)} 
        amount={amount2} 
        currency={currency2}
      />
      <h6>*Currency exchange rates are updated hourly*</h6>
    </div>
  );
}

export default App;
