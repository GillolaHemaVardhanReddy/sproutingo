// import { useState } from "react"

// const [active,setActive] = useState({isActive:'Home',id:'1'})
// const delay = async (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

// async function goFrom(from,to){
//     if(from>to){ // 4->1 
//         for(let i=from;i>=to;i--){
//             setActive(map[i])
//             await delay(100)
//         }
//     }
//     else{ // from < to 1->4 
//         for(let i=from;i<=to;i++){
//             setActive(map[i])
//             await delay(100)
//         }
//     }
// }

// export const map = [
//     {isActive: 'Home',id:'1'},
//     {isActive: 'Menu', id:'2'},
//     {isActive: 'Subscription',id: '3'},
//     {isActive: 'About',id:'4'}
// ]