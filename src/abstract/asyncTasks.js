import AsyncStorage from '@react-native-async-storage/async-storage';

const url = 'http://52.78.105.218:8080';

//precondition : callback is function, key is string
//asyncstorage에서 key에 해당하는 값을 찾아 callback의 인자로 전달합니다
export const getItemAsyncStorage = async(key) => {
    let retVal=null;
    try{
      await AsyncStorage.getItem(key).then((val) => {retVal=val;})
    }catch(err){
        console.log(err);
    }finally{
      return retVal;
    }
};

//_method : POST, GET
//_url : http 통신을 할 url
// data : body에 javascript object
export const fetchServer = (_method, _url, data) => {
    return fetch(url+_url,{
        method: _method,
        body: (data===null ? null : JSON.stringify(data)),
        headers: {
        //Header Defination
        'Content-Type':
        'application/json',
        },
    })
    .then((response)=>response.json());
};

//로그인 함수는 성공 시 saveUserData를 통해 정보를 모두 저장해 주어야 한다.
//로그인 성공과 실패를 어떻게 알려주어야 할까?
export const login=async()=>{
  const dataToSend={
    email:'',
    pw:''
  };
  try{
    const email=await getItemAsyncStorage('email');
    const pw=await getItemAsyncStorage('pw');
    console.log(email);
    console.log(pw);
  }catch(error){

  }finally{

  }
  // fetchServer('POST', '/login/signin', dataToSend).then((responseJson) => {
  //   if (responseJson.retCode === '0') {
  //       navigation.replace('MainBottomNavigator');
  //   } else {
  //     navigation.replace('Auth');
  //   }
  // }).catch((error) => {
  //   console.log(error);
  //   navigation.replace('Auth');
  // });
}

export const saveUserData=async(data)=>{
  const {businessAlready, businessCookway, businessEnd, businessIngre, businessName, 
    businessNum, businessSize, businessStaff, businessStart, businessType, email, phone,
    pw, serviceYn, token, userId,}=data;

  AsyncStorage.setItem('businessAlready', String(businessAlready));
  AsyncStorage.setItem('businessCookway', businessCookway);
  AsyncStorage.setItem('businessEnd', String(businessEnd));
  AsyncStorage.setItem('businessIngre', businessIngre);
  AsyncStorage.setItem('businessName', businessName);
  AsyncStorage.setItem('businessNum', businessNum);
  AsyncStorage.setItem('businessSize', businessSize);
  AsyncStorage.setItem('businessStaff', String(businessStaff));
  AsyncStorage.setItem('businessStart', String(businessStart));
  AsyncStorage.setItem('businessType', businessType);
  AsyncStorage.setItem('email', email);
  AsyncStorage.setItem('phone', phone);
  AsyncStorage.setItem('pw', pw);
  AsyncStorage.setItem('serviceYn', serviceYn);
  AsyncStorage.setItem('token', token);
  AsyncStorage.setItem('userId', String(userId));
}

export const AsyncStorageClear=()=>{
  AsyncStorage.clear().then(r=>console.log(r));
}


//파일 업로드 수정 필요
export const uploadFile = async (_method, _url, _file) => {
  if(_file==null) return null;

  const fileUri = _file.uri;
  const fileName = fileUri.split('/').pop();
  const extArr = /\.(\w+)$/.exec(fileName);
  const type = getMimeType(extArr[1]);
  const fileToUpload = _file;
  const data = new FormData();
  data.append("userId", 111);
  data.append("saleYm","202202");
  data.append('multipartFile', {
    uri: fileUri, name: fileName, type 
  });

  return fetch(url+_url,{
    method:_method,
    body: (data===null ? null : data),
    headers:{
      'Content-Type': 'multipart/form-data',
    }
  })
  .then((response)=>response.json());
};


// export const uploadFile = async (singleFile) => {
//   //Check if any file is selected or not
//   if (singleFile != null) {

//     const fileUri = singleFile.uri;
//     let filename = fileUri.split('/').pop();

//     const extArr = /\.(\w+)$/.exec(filename);
//     const type = getMimeType(extArr[1]);

//     //If file selected then create FormData
//     const fileToUpload = singleFile;
//     const data = new FormData();
//     data.append("userId", 30);
//     data.append("saleYm","202202");
//     data.append('multipartFile', {
//       uri: fileUri, name: filename, type 
//     });
//     console.log(data);
//     try{
//       let res = await fetch(
//         url+'/engine/insertExcel',
//         {
//           method: 'post',
//           body: data,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       ).then(response => response.json())
//       .then((res) => console.log(res));
//       // let responseJson = await res.json();
//       // if (responseJson.status == 1) {
//       //   alert('Upload Successful');
//       // }  
//     }catch(err){
//       console.log(err);
//     }
//   } else {
//     //if no file selected the show alert
//     alert('Please Select File first');
//   }
// };

const getMimeType = (ext) => {
  // mime type mapping for few of the sample file types
  switch (ext) {
    case 'xlsx': return 'application/vnd.ms-excel';
  //   // case 'pdf': return 'application/pdf';
  //   // case 'jpg': return 'image/jpeg';
  //   // case 'jpeg': return 'image/jpeg';
  //   // case 'png': return 'image/png';
  //   // type: "vnd.ms-excel" // .xls
  }
}