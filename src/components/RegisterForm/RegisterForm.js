import { useCallback } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import {useUser} from "../../contexts/userContext";
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
    const navigate = useNavigate();
    const { performRegistration } = useUser();

    const submitForm = useCallback((data) => {
        const register = async () => {
            try{
                await performRegistration({
                    matricula: `${data.registration}`,
                    senha: data.password,
                    nome: data.name,
                    email: data.email,
                    telefone: data.phone
                });
                navigate(0);
            } catch(e) {
                alert(e);
            }
        };
        register();
    }, [performRegistration]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <h2 className={styles.form__title}>Bem-vindo(a)!</h2>
            <p className={styles.form__subtitle}>
                É um prazer conhecer você! Preencha agora alguns dados para se cadastrar e conhecer
                nosso sistema. É rapidinho!
            </p>
            <div className={styles.form__textField}>
                <label>Nome</label>
                <input placeholder="Insira seu nome completo" autoComplete='on' {...register('name')} />
                <p className={styles.form__error}>{errors.name?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label>E-mail</label>
                <input placeholder="ex: usuario@exemplo.com" autoComplete='on' {...register('email')} />
                <p className={styles.form__error}>{errors.email?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label>Matrícula</label>
                <input placeholder="ex: 119210000" autoComplete='on' {...register('registration')} />
                <p className={styles.form__error}>{errors.registration?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label>Telefone</label>
                <input placeholder="ex: (83) 99999-9999" type="number" autoComplete='on' {...register('phone')} />
                <p className={styles.form__error}>{errors.phone?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label>Senha</label>
                <input placeholder="Insira pelo menos 8 caracteres" type="password" autoComplete='on' {...register('password')} />
                <p className={styles.form__error}>{errors.password?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label>Confirmar senha</label>
                <input placeholder="Repita a senha" type="password" autoComplete='on' {...register('password_confirmation')} />
                <p className={styles.form__error}>{errors.password_confirmation?.message}</p>
            </div>
            
            <button type="submit" className={styles.form__submit}>
                <AiOutlineArrowRight />
            </button>
        </form>
    );
}
