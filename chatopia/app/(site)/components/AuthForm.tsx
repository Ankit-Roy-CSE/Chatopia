'use client'

import { useCallback, useEffect, useState } from "react";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { BsGithub, BsGoogle } from 'react-icons/bs';
import styles from './AuthForm.module.css';

import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from "./AuthSocialButton";

type Variant = 'LOGIN' | 'REGISTER'; // The two possible variants of the form

function AuthForm(){
    const [variant, setVariant] = useState<Variant>('LOGIN'); // Current variant of the form
    const [isLoading, setIsLoading] = useState(false); // Whether form is loading or not

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
          setVariant('REGISTER');
        } else {
          setVariant('LOGIN');
        }
      }, [variant]);
    
    const{ register, 
        handleSubmit,
        formState: {
          errors
        }
    } = useForm<FieldValues>({
            defaultValues: { name: '', email: '', password: ''}
        });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
    
        if (variant === 'REGISTER') {
            // REGISTER with axios
        }
    
        if (variant === 'LOGIN') {
            // LOGIN with NextAuth
        }
      };

    const socialAction = (action: string) => {
        setIsLoading(true);
      }

    return ( 
        <div
          className={styles.wrapper}
        >
          <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} >
              {/* If the variant is REGISTER, then show the 'name' input   */}
              {variant === 'REGISTER' && (
                <Input 
                  id="name" 
                  label="Name" 
                  register={register}
                  errors={errors}
                  disabled={isLoading}
                />
              )}
              <Input 
                id="email" 
                label="Email address"
                type="email" 
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <Input 
                id="password" 
                label="Password"
                type="password" 
                register={register}
                errors={errors}
                disabled={isLoading}
              />
              <div>
                <Button
                  disabled={isLoading}
                  fullWidth
                  type="submit"
                >
                  {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                </Button>
              </div>
            </form>
    
            <div className={styles.socialSection}>
              <div className={styles.divider}>

                <div className={styles.dividerLine} >
                  <div/>
                </div>

                <div className={styles.dividerText}>
                  <span> Or continue with </span>
                </div>
              </div>
    
              <div className={styles.socialButtons}>
                <AuthSocialButton
                  icon={BsGithub}
                  onClick={() => socialAction('github')}
                />
                <AuthSocialButton
                  icon={BsGoogle}
                  onClick={() => socialAction('google')}
                />
              </div>
            </div>
    
            <div className={styles.formSwitcher}>
                <div>
                {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
                </div>
                <div
                    onClick={toggleVariant}
                    className={styles.formToggler}
                >
                {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                </div>
            </div>
          </div>
        </div>
      );
}

export default AuthForm;