import styles from "./Profile.module.css";
import React, { useReducer, useCallback } from "react";
import { Header } from "../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import User from "../../assets/user.png";
import * as yup from "yup";
import { SlPencil } from "react-icons/sl";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { useUser } from "../../contexts/userContext";

const modeReducer = (state, action) => {
  switch (action) {
    case "SET_VIEW_MODE":
      return "VIEW";
    case "SET_EDIT_MODE":
      return "EDIT";
    default:
      return state;
  }
};

const profileSchema = yup
  .object({
    name: yup
      .string()
      .required("Nome é obrigatório!")
      .matches(/\w+\s\w+/, "Insira também o sobrenome"),
    email: yup
      .string()
      .email("E-mail inválido")
      .required("Email é obrigatório!"),
    phone: yup.string().required("Telefone é obrigatório!")
  })
  .required();

export default function Profile() {
  const [mode, dispatch] = useReducer(modeReducer, "VIEW");
  const { currentUser, performEdit } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });

  const submitNewProfile = useCallback((data) => {
    //TODO: Fix after backend
    performEdit()
    dispatch("SET_VIEW_MODE");
  }, [dispatch]);

  return (
    <div className={styles.profile}>
      <Header />
      <img
        src={User}
        alt={`Foto de ${currentUser.nome}`}
        className={styles.profile__photo}
      />
      {mode === "VIEW" ? (
        <>
          <h1 className={styles.profile__title}>Meu Perfil</h1>
          <div className={styles.profile__viewCard}>
            <h2>Nome</h2>
            <p>{currentUser.nome}</p>
            <h2>E-mail</h2>
            <p>{currentUser.email}</p>
            <h2>Matrícula</h2>
            <p>{currentUser.matricula}</p>
            <h2>Telefone</h2>
            <p>{currentUser.telefone}</p>
          </div>
          <button
            className={styles.profile__editButton}
            onClick={() => dispatch("SET_EDIT_MODE")}
          >
            <SlPencil />
          </button>
        </>
      ) : (
        <>
          <form
            onSubmit={handleSubmit(submitNewProfile)}
            className={styles.profile__form}
          >
            <div className={styles.profile__inputs}>
              <div className={styles.profile__field}>
                <label for="name">Nome</label>
                <input
                  placeholder="Insira seu nome completo"
                  defaultValue={currentUser.nome}
                  {...register("name")}
                />
                <p className={styles.profile__formError}>
                  {errors.name?.message}
                </p>
              </div>
              <div className={styles.profile__field}>
                <label for="email">E-mail</label>
                <input
                  placeholder="example@example.com"
                  defaultValue={currentUser.email}
                  {...register("email")}
                />
                <p className={styles.profile__formError}>
                  {errors.enail?.message}
                </p>
              </div>
              <div className={styles.profile__field}>
                <label for="registration">Matrícula</label>
                <input
                  defaultValue={currentUser.matricula}
                  disabled
                  {...register("registration")}
                />
              </div>
              <div className={styles.profile__field}>
                <label for="phone">Telefone</label>
                <input
                  type={"tel"}
                  placeholder="(00) 98765 4321"
                  defaultValue={currentUser.telefone}
                  {...register("phone")}
                />
                <p className={styles.profile__formError}>
                  {errors.phone?.message}
                </p>
              </div>
            </div>
            <div className={styles.profile__formButtons}>
              <button type={"button"} onClick={() => dispatch("SET_VIEW_MODE")} className={styles.profile__formReset}>
                <AiOutlineClose />
              </button>
              <button type={"submit"}>
                <AiOutlineCheck />
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
