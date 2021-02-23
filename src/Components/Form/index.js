import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = () => {
  const schema = yup.object().shape({
    name: yup.string().required("campo obrigatório"),

    sobrenome: yup.string().required("campo obrigatório"),

    idade: yup.number("preencher com números").min(18),

    email: yup.string().email("email inválido").required("campo obrigatório"),

    confirmaemail: yup
      .string()
      .oneOf([yup.ref("email")], "emails diferentes")
      .required("campo obrigatório"),

    senha: yup
      .string()
      .min(8)
      .max(10)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
        "senha deve conter ao menos uma letra maiuscula, uma minuscula, um número e um caracter especial"
      )
      .required("campo obrigatório"),
    confirmasenha: yup
      .string()
      .oneOf([yup.ref("senha")], "senhas diferentes")
      .required("campo obrigatório"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleData = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleData)}>
        <input placeholder="Nome" name="name" type="text" ref={register} />
        <p />

        <input
          placeholder="Sobrenome"
          name="sobrenome"
          type="text"
          ref={register}
        />
        <p />

        <input placeholder="Idade" name="idade" type="number" ref={register} />
        <p />

        <input placeholder="Email" name="email" type="email" ref={register} />
        <p />

        <input
          placeholder="Confirmar Email"
          name="confirmaemail"
          ref={register}
        />
        <p />

        <input placeholder="Senha" name="senha" ref={register} />
        <p />

        <input
          placeholder="Confirmar senha"
          name="confirmasenha"
          ref={register}
        />
        <p />

        <button type="submit">enviar</button>
      </form>
    </div>
  );
};
export default Form;
