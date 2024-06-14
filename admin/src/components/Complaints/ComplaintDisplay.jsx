import React, { useState } from 'react';
import './ComplaintDisplay.css';

function ComplaintDisplay() {
  
  const items = [
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname2",
      complaint: "complaint2",
      address: "address2",
      phone: "phone2",
      action: "action2"
    },
    {
      username: "uname3",
      complaint: "complaint3",
      address: "address3",
      phone: "phone3",
      action: "action3"
    },
    {
      username: "uname4",
      complaint: "complaint4",
      address: "address4",
      phone: "phone4",
      action: "a,ction4"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },

    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
    {
      username: "uname1",
      complaint: "complaint1",
      address: "address1",
      phone: "phone1",
      action: "action1"
    },
  ];
  const [resolvedStates, setResolvedStates] = useState(Array(items.length).fill(false));
  const handleSolve = async (index) => {

    const newResolvedStates = [...resolvedStates];
    newResolvedStates[index] = !newResolvedStates[index];
    setResolvedStates(newResolvedStates);
  };

  const handleDelete = () =>{
    
      try{
          const userConfirmed = window.confirm(`Are you sure you want to delete ?`);
      if(userConfirmed){
        //delete
      }
    } catch(err){
      console.log(err);
    }
  }

  return (
    <div className="complaint-display-container">
      <div className="complaint-navbar">
        <p>Complaints</p>
      </div>
      <div className="complaint-display">
        <table className="complaint-display-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Complaint</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.complaint}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td className="btn-class">
                  <button
                    className={`solve-btn ${resolvedStates[index] ? 'resolved' : ''}`}
                    onClick={() => handleSolve(index)}
                  >
                    {resolvedStates[index] ? 'Resolved' : 'Solve'}
                  </button>
                  <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintDisplay;





// import React, { useState } from 'react';
// import './ComplaintDisplay.css';

// function ComplaintDisplay() {
//   const [resolvedId, setResolvedId] = useState(null);
//   const [isResolved, setIsResolved] = useState('solve');
//   const items = [
//     {
//     username: "uname",
//     complaint:"complaint",
//     address: "address",
//     phone: "phone",
//     action: "action"
//   },
//   {
//     username: "uname",
//     complaint:"complaint",
//     address: "address",
//     phone: "phone",
//     action: "action"
//   },
//   {
//     username: "uname",
//     complaint:"complaint",
//     address: "address",
//     phone: "phone",
//     action: "action"
//   },
//   {
//     username: "uname",
//     complaint:"complaint",
//     address: "address",
//     phone: "phone",
//     action: "action"
//   }
// ]

//   const handleSolve = (e) => {

//     e.preventDefault();
   

//   };
//   return (
//     <div className="complaint-display-container">
//       <div className="complaint-navbar">
//         <p>Complaints</p>
//       </div>
//       <div className="complaint-display">
//         <table className="complaint-display-table">
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Complaint</th>
//               <th>Address</th>
//               <th>Phone</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{item.username}</td>
//                   <td>{item.complaint}</td>
//                   <td>{item.address}</td>
//                   <td>{item.phone}</td>
//                   <td className="btn-class">
//                     <button
//                       id={index}
//                       className={`solve-btn ${resolvedId === index ? 'resolved' : ''}`}
//                       onClick={handleSolve}
//                     >

//                         SOlve
//                     </button>

//                     <button className="delete-btn">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ComplaintDisplay;




// import React, { useState } from 'react'
// import './ComplaintDisplay.css'


// function ComplaintDisplay() {
//   const [isResolved, setIsResolved] = useState(-1);

//   const handleSolve = (e) => {
//     if(isResolved===-1){
//       setIsResolved(e.target.id); e.target.classList.toggle('resolved');
//     }else{
//       document.getElementById(isResolved).classList.toggle('resolved');
//       e.target.classList.toggle('resolved');
//       setIsResolved(e.target.id);
//     }

//   }
//   return (
//   <div className="complaint-display-container">
//     <div className="complaint-navbar">
//      <p>Complaints</p>
//     </div>
//      <div className="complaint-display">
//      <table className='complaint-display-table'>
//             <tr>
//                 <th>Username</th>
//                 <th>Complaint</th>
//                 <th>Address</th>
//                 <th>Phone</th>
//                 <th>Action</th>
//             </tr>
//             <tr>
//                 <td>Username</td>
//                 <td>COmplaint</td>
//                 <td>Address</td>
//                 <td>Phone</td>
//                 <td className='btn-class'>
//                    <button
//                 className='solve-btn'
//                 onClick={handleSolve}
//               >Solve </button>
//                <button className='delete-btn'>Delete</button></td>
//             </tr>
//             <tr>
//                 <td>Username</td>
//                 <td>COmplaint</td>
//                 <td>Address</td>
//                 <td>Phone</td>
//                 <td className='btn-class'> <button
//                 className='solve-btn'
//                 onClick={handleSolve}
//               > Solve
//               </button>
//                <button className='delete-btn'>Delete</button></td>
//             </tr>
//             <tr>
//                 <td>Username</td>
//                 <td>COmplaint</td>
//                 <td>Address</td>
//                 <td>Phone</td>
//                 <td className='btn-class'> <button
//                 className='solve-btn'
//                 onClick={handleSolve}
//               > Solve
//               </button>
//                <button className='delete-btn'>Delete</button></td>
//             </tr>
//             <tr>
//                 <td>Username</td>
//                 <td>COmplaint</td>
//                 <td>Address</td>
//                 <td>Phone</td>
//                 <td className='btn-class'> <button
//                 className='solve-btn'
//                 onClick={handleSolve}
//               > Solve
//               </button>
//                <button className='delete-btn'>Delete</button></td>
//             </tr>
//         </table>
//     </div>
//     </div>
//   )
// }

// export default ComplaintDisplay