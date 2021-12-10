import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState([]);

  function inputCep(event) {
    event.preventDefault();
    setCep(event.target.value);
  }

  function getCepInfo(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getAddressInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function getAddressInfo(data) {
    setAddress(data);
  }

  useEffect(() => {
    getCepInfo(cep);
  }, [cep]);

  return (
    <div className="App">
      <h2>Promises | CEP</h2>
      <form>
        <div className="input-container">
          <label name="cep" id="cep">
            CEP
          </label>
          <input
            placeholder="Digite seu cep"
            id="cep"
            onChange={inputCep}
            value={cep}
          />
        </div>

        <div className="address">
          <h3>Endereço</h3>
          <div className="address-elements">
            <div>
              <p>
                <span>Logradouro:</span> {address.logradouro}
              </p>
              <p>
                <span>Complemento:</span> {address.complemento}
              </p>
            </div>
            <div>
              <p>
                <span>Bairro: </span> {address.bairro}
              </p>
              <p>
                <span>Cidade:</span> {address.localidade}
              </p>
            </div>
            <div>
              <p>
                <span>UF: </span>
                {address.uf}
              </p>
              <p>
                <span>DDD:</span> {address.ddd}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
