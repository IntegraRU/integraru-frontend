import styles from "./ChangeMenu.module.css";
import React, { useCallback } from "react";
import {ReturnButton} from "../../components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import {AiOutlineCloudUpload, AiOutlineClose, AiOutlineCheck} from 'react-icons/ai';

const registerSchema = yup.object({
    title: yup.string().required('Título é obrigatório!'),
    image: yup.mixed().test("fileType", "Formato da imagem inválido", file => ['jpg', 'png', 'jpeg'].includes(file.type)),
    ingredients: yup.string().required('Ingredientes são obrigatórios')
}).required();

export default function ChangeMenu() {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const navigate = useNavigate();
    const { state: previousMenu } = useLocation();

    const submitForm = useCallback((data) => console.log(data), []);

    return (
        <div className={styles.menu}>
            <ReturnButton />
            <h1 className={styles.menu__title}>{previousMenu ? 'Editar cardápio' : 'Adicionar cardápio'}</h1>
            <form className={styles.menu__form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.menu__form__head}>
                    <Controller
                        name="date"
                        control={control}
                        defaultValue={previousMenu ? previousMenu.date : new Date()}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                selected={value}
                                onChange={onChange}
                                className={styles.menu__datepicker}
                                dateFormat="dd/MM/yyyy"
                                locale='pt-BR'
                            />
                        )}
                    />
                    <select defaultValue={previousMenu && previousMenu.meal} {...register('meal')} >
                        <option>Almoço</option>
                        <option>Jantar</option>
                    </select>
                </div>
                <div className={`${styles.menu__form__field} ${styles.menu__form__file}`}>
                    <p className={styles.menu__form__file__title}>Imagem</p>
                    <label htmlFor="meal-photo"><AiOutlineCloudUpload /></label>
                    <input type={'file'} accept="image/*" id="meal-photo" {...register('image')} />
                    <p className={styles.menu__form__error}>{errors.file?.message}</p>
                </div>
                <div className={styles.menu__form__field}>
                    <label>Nome</label>
                    <input defaultValue={previousMenu && previousMenu.title} placeholder="ex: Feijoada com Arroz" {...register('title')} />
                    <p className={styles.menu__form__error}>{errors.title?.message}</p>
                </div>
                <div className={styles.menu__form__field}>
                    <label>Ingredientes <span>(Separados por vírgula)</span></label>
                    <textarea defaultValue={previousMenu && previousMenu.ingredients} placeholder="ex: Feijão Preto, Arroz Branco, Farofa" {...register('ingredients')} />
                    <p className={styles.menu__form__error}>{errors.ingredients?.message}</p>
                </div>
                <div className={styles.menu__form__field}>
                    <label>Tipo</label>
                    <select defaultValue={previousMenu && previousMenu.type} className={styles.menu__form__field__select} {...register('type')}>
                        <option>Comum</option>
                        <option>Vegetariano</option>
                        <option>Vegano</option>
                    </select>
                </div>

                <div className={styles.menu__form__buttons}>
                    <button className={styles.menu__form__clearButton} type={'button'} onClick={()=>reset()}><AiOutlineClose /></button>
                    <button className={styles.menu__form__submitButton} type={'submit'}><AiOutlineCheck /></button>
                </div>
            </form>
        </div>
    );
}
