export const isEmailRight = (email) => {
    //이메일 확인 정규식
    const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(regExp.test(email)){
        return true
    }
    return false;
};

export const isPasswordRight = (password) => {
    //비밀번호 확인 정규식
    const regExp = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
    if(regExp.test(password)){
        return true;
    }
    return false;
};