const Resultado = ({ idade }) => {
    return (
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
    )
  }
  
  export default Resultado
  