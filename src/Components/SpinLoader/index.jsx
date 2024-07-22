
import { TailSpin } from "react-loader-spinner"

export default function SpinLoader(){
    return(
        <TailSpin
            visible={true}
            height="20"
            width="100%"
            color="#ffffff"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            />
    )
}
