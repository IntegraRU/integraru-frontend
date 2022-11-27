import { useCallback } from "react";
import Checkbox from '@mui/material/Checkbox';
import { AiOutlineArrowRight } from "react-icons/ai";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from "./LoginForm.module.css";
import {useUser} from "../../contexts/userContext";
import { FormControlLabel, Typography } from "@mui/material";

const loginSchema = yup.object({
    registration: yup.string().required(),
    // registration: yup.number().typeError('Campo obrigatório e apenas numérico').integer().required(),
    password: yup.string().required('Senha é obrigatória!'),
    stay_connected: yup.boolean().default(false)
}).required();

export default function LoginForm({ changeForm }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(loginSchema)
    });
    const { performLogin } = useUser();

    const submitForm = useCallback((data) => {
        performLogin({
            username: data.registration,
            password: data.password
        }, data.stay_connected)
        .catch(e => alert(e));
    }, [performLogin]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
            <h2 className={styles.form__title}>Bem-vindo(a) de volta!</h2>
            <p className={styles.form__subtitle}>
                É sempre um prazer ter você conosco. Faça o login e confirme seu
                pedido!
            </p>
            <div className={styles.form__textField}>
                <label>Matrícula</label>
                <input placeholder="ex: 119210000" autoComplete='on' {...register('registration')} />
                <p className={styles.form__error}>{errors.registration?.message}</p>
            </div>
            <div className={styles.form__textField}>
                <label>Senha</label>
                <input placeholder="Insira sua senha" type="password" autoComplete='on' {...register('password')} />
                <p className={styles.form__error}>{errors.password?.message}</p>
            </div>
            <FormControlLabel
                control={
                    <Controller
                        name="stay_connected"
                        id="stay_connected_cb"
                        control={control}
                        render={({ field }) => <Checkbox
                            sx={{
                                color: 'var(--dark-blue)',
                                '& .MuiSvgIcon-root': { fontSize: "1.9rem" },
                                '&.Mui-checked': {
                                    color: 'var(--dark-blue)',
                                }
                            }}
                            {...field}
                        />}
                    />
                }
                label={<Typography className={styles.form__checkField}>Continuar conectado?</Typography>}
            />
            <p className={styles.form__registerLink}>
                Ainda não possui conta? <button type="button" onClick={changeForm}>Registre-se!</button>
            </p>
            <button type="submit" className={styles.form__submit}>
                <AiOutlineArrowRight />
            </button>
        </form>
    );
}
