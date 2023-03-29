import styles from "./Registration.module.css";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../../components";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { FaRegIdCard } from "react-icons/fa";
import api from "../../services/api";
import Select from "react-select";

const registerSchema = yup
  .object({
    registration: yup.string().required("Insira a matrícula"),
  })
  .required();

export default function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const currentOperation = watch("operation");
  const [allRegistrations, setAllRegistrations] = useState([]);

  useEffect(() => {
    const registrationsSearch = async () => {
      try {
        const searchData = await api().get(`/user`);
        setAllRegistrations(searchData.data);
      } catch (e) {
        alert(e);
      }
    };
    registrationsSearch();
  }, []);

  const submitForm = useCallback((data) => {
    const register = async () => {
      try {
        await api().patch(`/matricula/${data.registration}`, {
          matricula: data.registration,
          beneficiario: true,
        });
      } catch (e) {
        alert(e);
      }
    };
    register();
  }, [reset]);

  return (
    <div className={styles.registration}>
      <Header />
      <div className={styles.registration__title}>
        <FaRegIdCard className={styles.registration__title__image} />
        <h1>Modificar matrícula de beneficiários</h1>
      </div>
      <form
        className={styles.registration__form}
        onSubmit={handleSubmit(submitForm)}
      >
        <div className={styles.registration__form__field}>
          <label>Operação</label>
          <select defaultValue={"ADD"} {...register("operation")}>
            <option value="ADD">Adicionar beneficiário</option>
            <option value="REMOVE">Remover beneficiário</option>
          </select>
        </div>

        {!currentOperation || currentOperation == "ADD" ? (
          <div className={styles.registration__form__field}>
            <label>Matrícula</label>
            <input
              placeholder="Insira a matrícula"
              {...register("registration")}
            />
            <p className={styles.registration__form__error}>
              {errors.registration?.message}
            </p>
          </div>
        ) : (
          <div className={styles.registration__form__field}>
            <label>Matrículas beneficiadas</label>
            <Controller
              name="registrationToRemove"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Select
                  className={styles.registration__form__select}
                  classNames={{
                    indicatorsContainer: (_) =>
                      styles.registration__form__select__arrow,
                  }}
                  placeholder="Selecione uma matrícula"
                  noOptionsMessage={(_) => "Sem matrículas a mostrar"}
                  options={allRegistrations
                    .filter(
                      (r) =>
                        r.beneficiario &&
                        r.role.authority !== "ROLE_ADMINISTRADOR"
                    )
                    .map((r) => ({ value: r.matricula, label: r.matricula }))}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        )}

        <div className={styles.registration__form__buttons}>
          <button
            className={styles.registration__form__clearButton}
            type={"button"}
            onClick={() => reset()}
          >
            <AiOutlineClose />
          </button>
          <button
            className={styles.registration__form__submitButton}
            type={"submit"}
            onClick={() => submitForm()}
          >
            <AiOutlineCheck />
          </button>
        </div>
      </form>
    </div>
  );
}
