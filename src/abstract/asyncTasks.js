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