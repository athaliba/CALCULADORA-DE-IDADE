import { useState } from 'react'
import Form from './form'
import Resultado from './resultado'
import '../styles/AgeCalculator.css'

const AgeCalculator = () => {
  const [dataNascimento, setDataNascimento] = useState({
    dia: '',
    mes: '',
    ano: '',
  })
  const [idade, setIdade] = useState(null)
  const [erros, setErros] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const { dia, mes, ano } = dataNascimento
    const novosErros = {}

    if (
      ano === new Date().getFullYear() &&
      mes === new Date().getMonth() + 1 &&
      dia > new Date().getDate()
    ) {
      novosErros.dia = 'Dia no futuro'
    }
    // Validações básicas
    if (!dia) novosErros.dia = 'Campo obrigatório'
    else if (dia < 1 || dia > 31) novosErros.dia = 'Dia inválido'

    if (!mes) novosErros.mes = 'Campo obrigatório'
    else if (mes < 1 || mes > 12) novosErros.mes = 'Mês inválido'

    if (!ano) novosErros.ano = 'Campo obrigatório'
    else if (ano > new Date().getFullYear()) novosErros.ano = 'Ano no futuro'
    else if (ano === new Date().getFullYear() && mes > new Date().getMonth() + 1) {
      novosErros.mes = 'Mês no futuro'
    }

    // Validar dia no caso de mês no futuro e data no futuro
    if (
      ano === new Date().getFullYear() &&
      mes === new Date().getMonth() + 1 &&
      dia > new Date().getDate()
    ) {
      novosErros.dia = 'Dia no futuro'
    }

    // Validação se a data é válida
    if (Object.keys(novosErros).length === 0 && !dataValida(dia, mes, ano)) {
      novosErros.dia = 'Data inválida'
    }
    setErros(novosErros)

    // Se houver erros, não prosseguir
    if (Object.keys(novosErros).length > 0) return

    // Cálculo da idade
    const nascimento = new Date(`${ano}-${mes}-${dia}`)
    const hoje = new Date()

    let anos = hoje.getFullYear() - nascimento.getFullYear()
    let meses = hoje.getMonth() - nascimento.getMonth()
    let dias = hoje.getDate() - nascimento.getDate()

    if (dias < 0) {
      meses--
      const mesAnterior = new Date(hoje.getFullYear(), hoje.getMonth(), 0)
      dias += mesAnterior.getDate()
    }
    
    if (meses < 0) {
      anos--
      meses += 12
    }

    // Ajustar mês e dia se necessário
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

  const dataValida = (d, m, a) => {
    const dia = parseInt(d, 10)
    const mes = parseInt(m, 10) - 1 // Meses começam em 0 (Janeiro é 0)
    const ano = parseInt(a, 10)

    const data = new Date(ano, mes, dia)
    return (
      data.getFullYear() === ano &&
      data.getMonth() === mes &&
      data.getDate() === dia
    )
  }

  return (
    <div className="idade-container">
      <Form
        onSubmit={handleSubmit}
        dataNascimento={dataNascimento}
        setDataNascimento={setDataNascimento}
        erros={erros}
      />
      <Resultado idade={idade} />
    </div>
  )
}

export default AgeCalculator
