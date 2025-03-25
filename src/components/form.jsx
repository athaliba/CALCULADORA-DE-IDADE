import { useState } from 'react'

const Form = ({ onSubmit, dataNascimento, setDataNascimento, erros }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    setDataNascimento((prev) => ({ ...prev, [name]: parseInt(value) }))
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="inputs">
        <div className={`campo ${erros.dia ? 'erro' : ''}`}>
          <label>Dia</label>
          <input
            type="number"
            name="dia"
            value={dataNascimento.dia}
            min="1"
            max="31"
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
            min="1"
            max="12"
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
            min="1900"
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
  )
}

export default Form
