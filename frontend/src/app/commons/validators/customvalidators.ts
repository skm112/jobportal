import { AbstractControl } from "@angular/forms";


export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; // to get value in input tag
        let confirmPass = AC.get('confirmPass').value; // to get value in input tag
        if (password != confirmPass) {
            // console.log('false');
            AC.get('confirmPass').setErrors({ MatchPassword: true })
        } else {
            // console.log('true');
            return null
        }
    }
}