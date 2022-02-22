export const checkEmailFormat = (email) => {
    //이메일 확인 정규식
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