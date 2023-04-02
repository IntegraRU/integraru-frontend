import styles from "./ChangeMenu.module.css";
import React, { useCallback, useState } from "react";
import {Header} from "../../components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import {AiOutlineCloudUpload, AiOutlineClose, AiOutlineCheck} from 'react-icons/ai';
import api from "../../services/api";
import { format, parse, startOfDay, addDays, isAfter } from "date-fns";
import storage from '../../services/firebase';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { CircularProgress } from "@mui/material";

const registerSchema = yup.object({
    title: yup.string().required('Título é obrigatório!'),
    ingredients: yup.string().required('Ingredientes são obrigatórios')
}).required();

export default function ChangeMenu() {
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(registerSchema)
    });
    const { state: previousMenu } = useLocation();
    const currentImage = watch('image');
    const currentDate = watch('date');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const shouldShowDate = useCallback((date) => {
        const tomorrow = startOfDay(addDays(new Date(), 1));
        if(date >= tomorrow){
            return true;
        } else if(date >= startOfDay(new Date())){
            if((new Date()).getHours() < 19) return true;
        }
        return false;
    }, []);

    const initialDate = useCallback(()=>{
        let initialDate = new Date();
        if(previousMenu && previousMenu.data) initialDate = parse(previousMenu.data, 'dd/MM/yyyy', new Date());
        else if(!shouldShowDate(new Date())) {
            const tomorrow = startOfDay(addDays(new Date(), 1));
            initialDate = tomorrow;
        }
        return initialDate;
    }, [previousMenu, shouldShowDate]);

    const shouldShowMeal = useCallback((which) => {
        const today = startOfDay(new Date());
        if(today.getTime() == startOfDay(currentDate).getTime()){
            switch(which){
                case 'breakfast':
                    today.setHours(9);
                    if(isAfter(currentDate, today)) return false;
                    break;
                default:
                    today.setHours(14);
                    if(isAfter(currentDate, today)) return false;
            }
        }
        return true;
    }, [currentDate]);

    const submitForm = useCallback((data) => {
        setIsLoading(true);
        const menuSubmit = async ()=>{
            try{
                let imgUrl = undefined;
                if(data.image[0]){
                    const storageRef = ref(storage, `files/${data.image[0].name}`);
                    const uploadTask = uploadBytesResumable(storageRef, data.image[0]);
                    imgUrl = await uploadTask.then(uploadedTask => getDownloadURL(uploadedTask.ref));
                }
                await api().request({
                    url: `/prato${previousMenu ? '/' + previousMenu.id : ''}`,
                    method: previousMenu ? 'PUT' : 'POST',
                    data: {
                        tipo: data.type,
                        modalidadePrato: data.meal,
                        nome: data.title,
                        itens: data.ingredients,
                        data: format(data.date, 'dd/MM/yyyy'),
                        urlImagem: imgUrl
                    }
                });
                setIsLoading(false);
                navigate('/admin/cardapio');
            } catch(e){
                alert(e);
            }
        };
        menuSubmit();
    }, [navigate, previousMenu]);

    return (
        <div className={styles.menu}>
            {
                isLoading && 
                <div className={styles.menu__loading}>
                    <CircularProgress size={60} />
                </div>
            }
            <Header />
            <h1 className={styles.menu__title}>{previousMenu ? 'Editar cardápio' : 'Adicionar cardápio'}</h1>
            <form className={styles.menu__form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.menu__form__head}>
                    <Controller
                        name="date"
                        control={control}
                        defaultValue={initialDate()}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                selected={value}
                                onChange={onChange}
                                className={styles.menu__datepicker}
                                dateFormat="dd/MM/yyyy"
                                filterDate={date => shouldShowDate(date) }
                                locale='pt-BR'
                            />
                        )}
                    />
                    <select defaultValue={(previousMenu && previousMenu.modalidadePrato) || "ALMOCO"} {...register('meal')} >
                        { shouldShowMeal('breakfast') && <option value='CAFE'>Café da manhã</option>}
                        { shouldShowMeal('lunch') && <option value='ALMOCO'>Almoço</option> }
                        <option value='JANTAR'>Jantar</option>
                    </select>
                </div>
                <div className={`${styles.menu__form__field} ${styles.menu__form__file}`}>
                    <p className={styles.menu__form__file__title}>Imagem</p>
                    <label htmlFor="meal-photo">
                        {currentImage && currentImage.length 
                        ? <img src={window.URL.createObjectURL(currentImage[0])} alt={currentImage[0].name} />
                        : <AiOutlineCloudUpload />
                        }
                    </label>
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
