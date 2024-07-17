/**
 * 
 * @param {Object} estado - Objeto que será manipulado 
 * @param {Object} setEstado - Objeto que manipula o estado
 * @param {Array} tipos - tipos dos inputs (em ordem)
 * @param {Array} minimos - lista de minimos de cada input  
 * @param {Array} obrigatorio - lista booleana indicando obrigatoriedade
 */
export default function RenderizarInputs({ estado, setEstado, tipos, minimos, obrigatorio, aguardandoRequisicao=false }) {
    const chaves = Object.keys(estado)

    return (
        chaves.map((chave, index) => (
            <input
                key={index}
                type={tipos[index]}
                placeholder={chave}
                minLength={minimos[index]}
                value={estado[chave]}
                onChange={(e) => {
                    let copiaEstado = { ...estado }
                    copiaEstado[chave] = e.currentTarget.value
                    setEstado({...copiaEstado})
                }} 
                required={obrigatorio[index]}
                disabled={aguardandoRequisicao}
            />
        ))
    )
}