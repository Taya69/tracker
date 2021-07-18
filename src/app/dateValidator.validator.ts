import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {      
        const value = control.value;

        if (!value) {
            return null;
        }
        const passwordValid = (value > new Date() || value == new Date()) ? true : false;     
        return !passwordValid ? {passwordStrength:true}: null;
    }
}