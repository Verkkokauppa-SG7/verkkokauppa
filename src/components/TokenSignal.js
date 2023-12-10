import { effect, signal } from "@preact/signals-react";

export const jwtToken = signal(getToken());

function getToken(){
    const t = sessionStorage.getItem('token');
    return t===null || t ==='null' ? '' : t;
}

effect ( () => {
    sessionStorage.setItem('token', jwtToken.value);
});