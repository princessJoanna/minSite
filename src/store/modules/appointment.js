const appointment = {
    state: {
      data:{}
    },
  
    mutations: {
      setAppointment: (state, json) => {
        state.data = json;
        
      },
  
    },
  

  };
  
  export default appointment;