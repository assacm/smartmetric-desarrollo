
export function validValue(value:any){
    let valid = false;
    
    if(value != undefined || value != null){
        valid = true;
     }
     return valid;
}