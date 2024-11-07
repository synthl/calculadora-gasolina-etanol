import logo from './assets/logo.png'
import { FormEvent, useState } from 'react'
import './App.css'

interface InfoProps {
  title: string,
  gasolina: string | number,
  etanol: string | number
}

function App() {

  const [etanolInput, setEtanolInput] = useState(0);
  const [gasolinaInput, setGasolinaInput] = useState(0);
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent) {
    event.preventDefault();
    const calculo = (etanolInput / gasolinaInput)

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usar Etanol!",
        gasolina: formatarMoeda(gasolinaInput),
        etanol: formatarMoeda(etanolInput)
      })
    } else {
      setInfo({
        title: "Compensa usar Gasolina!",
        gasolina: formatarMoeda(gasolinaInput),
        etanol: formatarMoeda(etanolInput)
      })
    }
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString("pt-br",
      {
        style: "currency",
        currency: "BRL"
      })
      return valorFormatado;
  }

  return (
    <>
      <main className="container">
        <img
          className="logo"
          src={logo}
          alt="logo"
        />

        <h1 className="title">Qual melhor opção?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Etanol (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={etanolInput}
            onChange={ (e) => setEtanolInput(Number(e.target.value)) }
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4,90"
            min="1"
            step="0.01"
            required
            value={gasolinaInput}
            onChange={ (e) => setGasolinaInput(Number(e.target.value)) }
          />
          <input className="button" type="submit" value="Calcular"/>
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
           <h2 className="result-title">
            {info.title}
           </h2>

           <span>Etanol {info.etanol}</span>
           <span>Gasolina {info.gasolina}</span>
          </section>
        )}

      </main>
    </>
  )
}

export default App
