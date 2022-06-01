import {INPUT_UNIT_SMALL, INPUT_UNIT_BIG} from '../variables/codelist';

export const checkEmailFormat = (email) => {
    //이메일 확인 정규식
    if(email=='') return false;
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(regExp.test(email)){
        return true
    }
    return false;
};

export const checkPwdFormat = (password) => {
    //비밀번호 확인 정규식
    const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if(regExp.test(password)){
        return true;
    }
    return false;
};

export const checkBsnFormat=(num)=>{
    //사업자 번호 확인 정규식
    // const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    // if(regExp.test(password)){
    //     return true;
    // }
    // return false;
    return true;
};

export const checkPhoneFormat=(num)=>{
    //핸드폰 번호 확인 정규식
    const regExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if(regExp.test(num)){
        return true;
    }
    return false;
};

export const parsingDate=(date)=>{
    return `${date[2]}${date[3]}.${date[4]}${date[5]}.${date[6]}${date[7]}`;
};

export const calcWeight=(arg)=>{
    //arg.usage, arg.unit
    const found=INPUT_UNIT_SMALL.find(el=>el.text===arg.unit);
    return String(arg.usage*found.amount)+found.unit;
};

//arg == {name:'식초', price:3600, amount:'20',amountUnit:'L', usage:3, unit:'일반 숟가락(액체)'}
export const calcCost=(arg)=>{
    const bFound=INPUT_UNIT_BIG.find(el=>el.text===arg.amountUnit);
    const sFound=INPUT_UNIT_SMALL.find(el=>el.text===arg.unit);
    let result=(arg.usage*sFound.amount)*arg.price/(bFound.amount*arg.amount)
    return Math.floor(result);
};