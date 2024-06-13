import './ErrorMessage.css'

export const SetError = ({error,vanish})=>{
    let component;
    if(error.length<=0){
      component = <></>
    }else component = <p className= {` ${!vanish ? 'hidden' : ''} floating-error-message`}>{error}</p>
    return (
      component
    )
}