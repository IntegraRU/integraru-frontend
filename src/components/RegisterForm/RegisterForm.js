import { useCallback } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from "./RegisterForm.module.css";

const registerSchema = yup.object({
    name: yup.string().required('Nome é obrigatório!').matches(/\w+\s\w+/, 'Insira também o sobrenome'),
    email: yup.string().email('E-mail inválido').required('Email é obrigatório!'),
    registration: yup.number().typeError('Campo obrigatório e apenas numérico').integer().required(),
    phone: yup.string().required('Telefone é obrigatório!'),
    password: yup.string().min(8, 'Senha deve possuir 8 ou mais caracteres').required('Senha é obrigatória!'),
    password_confirmation:  yup.string().required('Confirmação de senha obrigatória!')
                                        .test('passwords-match', 'As senhas não são iguais', 
                                                function(value){
                                                    return this.parent.password === value
                                                })
}).required();

export default function RegisterForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const submitForm = useCallback((data) => console.log(data), []);

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <h2 className={styles.form__title}>Bem-vindo(a)!</h2>
            <p className={styles.form__subtitle}>
                É um prazer conhecer você! Preencha agora alguns dados para se cadastrar e conhecer
                nosso sistema. É rapidinho!
            </p>
            <div className={styles.form__textField}>
                <label for="name">Nome</label>
                <input placeholder="Insira seu nome completo" {...register('name')} />
                <p className={styles.form__error}>{errors.name?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label for="email">E-mail</label>
                <input placeholder="ex: usuario@exemplo.com" {...register('email')} />
                <p className={styles.form__error}>{errors.email?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label for="registration">Matrícula</label>
                <input placeholder="ex: 119210000" {...register('registration')} />
                <p className={styles.form__error}>{errors.registration?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label for="phone">Telefone</label>
                <input placeholder="ex: (83) 99999-9999" type="number" {...register('phone')} />
                <p className={styles.form__error}>{errors.phone?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label for="password">Senha</label>
                <input placeholder="Insira pelo menos 8 caracteres" type="password" {...register('password')} />
                <p className={styles.form__error}>{errors.password?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label for="password_confirmation">Confirmar senha</label>
                <input placeholder="Repita a senha" type="password" {...register('password_confirmation')} />
                <p className={styles.form__error}>{errors.password_confirmation?.message}</p>
            </div>
            
            <button type="submit" className={styles.form__submit}>
                <AiOutlineArrowRight />
            </button>
        </form>
    );
}
