import { useState } from 'react'
import '../styles/AgeCalculator.css'

const AgeCalculator = () => {
  const [dataNascimento, setDataNascimento] = useState({
    dia: '',
    mes: '',
    ano: '',
  })
  const [idade, setIdade] = useState(null)
  const [erros, setErros] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setDataNascimento((prev) => ({ ...prev, [name]: value }))
  }

  const dataValida = (d, m, a) => {
    const data = new Date(`${a}-${m}-${d}`)
    return (
      data.getFullYear() === +a &&
      data.getMonth() === +m - 1 &&
      data.getDate() === +d
    )
  }

  const calcularIdade = (e) => {
    e.preventDefault()
    const { dia, mes, ano } = dataNascimento
    const novosErros = {}

    // Validações básicas
    if (!dia) novosErros.dia = 'Campo obrigatório'
    else if (dia < 1 || dia > 31) novosErros.dia = 'Dia inválido'

    if (!mes) novosErros.mes = 'Campo obrigatório'
    else if (mes < 1 || mes > 12) novosErros.mes = 'Mês inválido'

    if (!ano) novosErros.ano = 'Campo obrigatório'
    else if (ano > new Date().getFullYear()) novosErros.ano = 'Ano no futuro'

    if (Object.keys(novosErros).length === 0 && !dataValida(dia, mes, ano)) {
      novosErros.dia = 'Data inválida'
    }

    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) return

    // Cálculo da idade
    const nascimento = new Date(`${ano}-${mes}-${dia}`)
    const hoje = new Date()

    let anos = hoje.getFullYear() - nascimento.getFullYear()
    let meses = hoje.getMonth() - nascimento.getMonth()
    let dias = hoje.getDate() - nascimento.getDate()

    if (dias < 0) {
      meses--
      dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate()
    }

    if (meses < 0) {
      anos--
      meses += 12
    }

    setIdade({ anos, meses, dias })
  }

  return (
    <div className="idade-container">
      <form onSubmit={calcularIdade}>
        <div className="inputs">
          <div className={`campo ${erros.dia ? 'erro' : ''}`}>
            <label>Dia</label>
            <input
              type="number"
              name="dia"
              value={dataNascimento.dia}
              onChange={handleChange}
              placeholder="DD"
            />
            {erros.dia && <small>{erros.dia}</small>}
          </div>
          <div className={`campo ${erros.mes ? 'erro' : ''}`}>
            <label>Mês</label>
            <input
              type="number"
              name="mes"
              value={dataNascimento.mes}
              onChange={handleChange}
              placeholder="MM"
            />
            {erros.mes && <small>{erros.mes}</small>}
          </div>
          <div className={`campo ${erros.ano ? 'erro' : ''}`}>
            <label>Ano</label>
            <input
              type="number"
              name="ano"
              value={dataNascimento.ano}
              onChange={handleChange}
              placeholder="AAAA"
            />
            {erros.ano && <small>{erros.ano}</small>}
          </div>
        </div>

        <button type="submit" className="botao-calcular">
          <img src="/assets/images/icon-arrow.svg" alt="Calcular" />
        </button>
      </form>

      <div className="resultado">
        <h2>
          <span>{idade ? idade.anos : '--'}</span> anos
        </h2>
        <h2>
          <span>{idade ? idade.meses : '--'}</span> meses
        </h2>
        <h2>
          <span>{idade ? idade.dias : '--'}</span> dias
        </h2>
      </div>
    </div>
  )
}

export default AgeCalculator
