const getters = {
    deserList: state => state.desinerList.dataList,
    nav:state=>state.leftBar.nav,
    caseList:state=>state.desinerCase.dataList,
    desinerDetails:state=>state.desinerDetails.dataList,
    userInfo:state=>state.userInfo.data,
    appointment:state=>state.appointment.data,
    wxAuthorize:state=>state.wxAuthorize.data

  };
  
  export default getters
  