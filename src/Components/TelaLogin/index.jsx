import { useState } from "react"
import LoginCadastroStyle from "../../StyleComponents/LoginCadastroStyle"

import RenderizarInputs from "../../Tools/RenderInput"

export default function TelaLogin() {
    const [inputs, setInputs] = useState({ "Email: ": "", "Senha: ": "" })
    const tipos = ["email", "password"]
    const minimos = ['7', '6']


    console.log(inputs)

    return (
        <LoginCadastroStyle>
            <p>Tela login</p>
            <RenderizarInputs 
                estado={inputs} 
                setEstado={setInputs} 
                tipos={tipos} 
                minimos={minimos} 
            />
        </LoginCadastroStyle>
    )
}
