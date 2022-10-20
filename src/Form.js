import React, { useState } from 'react'
import styles from './Form.module.css'

export default function Form({serverLink}) {
  const [msgName,setMsgName]=useState(),
    [msgMail,setMsgMail]=useState(),
    [msgMsg,setMsgMsg]=useState(),
    [statusMessage,setStatusMessage]=useState(),
    [statusCondition,setActiveStatus]=useState();

  let changeInput=(e, input)=>{
    input(e.target.value);
  }
  function submitForm(e){
    e.preventDefault();
    setStatusMessage('');
    if(!msgName || !msgMail || !msgMsg) {
      setActiveStatus('errStatus');
      return setStatusMessage('Please fill in all the fields marked with *');
    }
    if (msgMail.indexOf('@')<1){
      setActiveStatus('errStatus');
      return setStatusMessage('Please enter a valid email');
    }

    let submitObject={
      'name':msgName,
      'email':msgMail,
      'message':msgMsg
    };
    let fetchDataObj={
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(submitObject) 
    }
    // console.log("submit: ",submitObject);
    
    fetch(serverLink+'/feedback',fetchDataObj)
    // .then((res)=>res.json())
    .then((data)=>{
      console.log(data);
      if (data.ok===true || data.status===200)  {
        setActiveStatus('successStatus');
        setStatusMessage(`Thank you for your feedback!`)
        setMsgMail('');setMsgName('');setMsgMsg('');
      }
      else {
        setActiveStatus('errStatus');
        setStatusMessage(data.statusText);
      }
    })
    
    // 
  }
  return (  
    <div className={styles.formContainer}>
      <div className={styles.formLabel}> Reach out to us!</div>
      <input
        type="text"
        className={styles.formInput}
        placeholder="Your name*"
        value={msgName}
        name="title"
        onChange={e=>changeInput(e,setMsgName)}  
      />
      <input
        type="text"
        className={styles.formInput}
        placeholder="Your e-mail*"
        value={msgMail}
        name="title"
        onChange={e=>changeInput(e,setMsgMail)}
      />
      <textarea
        type="text"
        className={styles.formInput+' '+styles.formInputMessage}
        placeholder="Your message*"
        value={msgMsg}
        name="title"
        onChange={e=>changeInput(e,setMsgMsg)}
      />
      <div style={{display:'flex'}}>
      <button onClick={e=>submitForm(e)} className={styles.submitButton}>Send message</button>
      <span className={styles.statusMessage+' '+styles[statusCondition]}>{statusMessage}</span>
      </div>
    </div>
  )
}
  