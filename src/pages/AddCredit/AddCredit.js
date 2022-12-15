import styles from "./AddCredit.module.css";
import React, { useCallback } from "react";
import {Header} from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {AiOutlineClose, AiOutlineCheck} from 'react-icons/ai';
import api from "../../services/api";
import TitleImage from '../../assets/coin.svg';

const registerSchema = yup.object({
    registration: yup.string().required('Matrícula é obrigatória!'),
    value: yup.number().required('Valor é obrigatório')
}).required();

export default function AddCredit() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });

    const submitForm = useCallback((data) => {
        const menuSubmit = async ()=>{
            try{
                // await api().request({
                //     url: '/prato',
                //     data: {
                //         tipo: data.type,
                //         modalidadePrato: data.meal,
                //         nome: data.title,
                //         itens: data.ingredients,
                //         data: format(data.date, 'dd/MM/yyyy')
                //     }
                // });
                reset();
            } catch(e){
                alert(e);
            }
        };
        menuSubmit();
    }, [reset]);

    return (
        <div className={styles.credit}>
            <Header />
            <div className={styles.credit__title}>
              <img src={TitleImage} alt="Ícone de uma mão segurando uma moeda" className={styles.credit__title__image} />
              <h1>Adicionar crédito</h1>
            </div>
            <form className={styles.credit__form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.credit__form__field}>
                    <label>Matrícula</label>
                    <input placeholder="Insira a matrícula" {...register('registration')} />
                    <p className={styles.credit__form__error}>{errors.registration?.message}</p>
                </div>

                <div className={styles.credit__form__field}>
                    <label>Valor (R$)</label>
                    <input type={'number'} placeholder="Ex: 2,00" {...register('value')} />
                    <p className={styles.credit__form__error}>{errors.value?.message}</p>
                </div>

                <div className={styles.credit__form__buttons}>
                    <button className={styles.credit__form__clearButton} type={'button'} onClick={()=>reset()}><AiOutlineClose /></button>
                    <button className={styles.credit__form__submitButton} type={'submit'}><AiOutlineCheck /></button>
                </div>
            </form>
        </div>
    );
}
