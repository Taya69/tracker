import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {      
        const value = control.value;

        if (!value) {
            return null;
        }

        const dateLessThenNew = value >= new Date();  
        const passwordValid = dateLessThenNew
        console.log(passwordValid)
        return !passwordValid ? {passwordStrength:true}: null;
    }
}