import styles from "./ChangeMenu.module.css";
import React, { useCallback } from "react";
import {Header} from "../../components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import {AiOutlineCloudUpload, AiOutlineClose, AiOutlineCheck} from 'react-icons/ai';
import api from "../../services/api";
import { format, parse } from "date-fns";

const registerSchema = yup.object({
    title: yup.string().required('Título é obrigatório!'),
    image: yup.mixed().test("fileType", "Formato da imagem inválido", file => !file.length || ['jpg', 'png', 'jpeg'].includes(file.type)),
    ingredients: yup.string().required('Ingredientes são obrigatórios')
}).required();

export default function ChangeMenu() {
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const { state: previousMenu } = useLocation();
    const navigate = useNavigate();

    const submitForm = useCallback((data) => {
        const menuSubmit = async ()=>{
            try{
                await api().request({
                    url: `/prato${previousMenu ? '/' + previousMenu.id : ''}`,
                    method: previousMenu ? 'PUT' : 'POST',
                    data: {
                        tipo: data.type,
                        modalidadePrato: data.meal,
                        nome: data.title,
                        itens: data.ingredients,
                        data: format(data.date, 'dd/MM/yyyy')
                    }
                });
                navigate('/admin/cardapio');
            } catch(e){
                alert(e);
            }
        };
        menuSubmit();
    }, [navigate, previousMenu]);

    return (
        <div className={styles.menu}>
            <Header />
            <h1 className={styles.menu__title}>{previousMenu ? 'Editar cardápio' : 'Adicionar cardápio'}</h1>
            <form className={styles.menu__form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.menu__form__head}>
                    <Controller
                        name="date"
                        control={control}
                        defaultValue={previousMenu && previousMenu.data ? parse(previousMenu.data, 'dd/MM/yyyy', new Date()) : new Date()}
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
                    <select defaultValue={previousMenu && previousMenu.modalidadePrato} {...register('meal')} >
                        <option value="CAFE">Café da Manhã</option>
                        <option value="ALMOCO">Almoço</option>
                        <option value="JANTAR">Jantar</option>
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
                    <input defaultValue={previousMenu && previousMenu.nome} placeholder="ex: Feijoada com Arroz" {...register('title')} />
                    <p className={styles.menu__form__error}>{errors.title?.message}</p>
                </div>
                <div className={styles.menu__form__field}>
                    <label>Ingredientes <span>(Separados por vírgula)</span></label>
                    <textarea defaultValue={previousMenu && previousMenu.itens} placeholder="ex: Feijão Preto, Arroz Branco, Farofa" {...register('ingredients')} />
                    <p className={styles.menu__form__error}>{errors.ingredients?.message}</p>
                </div>
                <div className={styles.menu__form__field}>
                    <label>Tipo</label>
                    <select defaultValue={previousMenu && previousMenu.tipo} className={styles.menu__form__field__select} {...register('type')}>
                        <option value="COMUM">Comum</option>
                        <option value="VEGETARIANO">Vegetariano</option>
                        <option value="VEGANO">Vegano</option>
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
