import React from 'react';
import RadioGroup from './RadioGroup';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  gender: z.enum(['Male', 'Female'], {
    message: 'Selecciona un género válido',
  }),
  species: z.enum(['Human', 'Alien'], {
    message: 'Selecciona una especie válida',
  }),
  status: z.enum(['Alive', 'Dead'], { message: 'Selecciona un estado válido' }),
});

export type FormData = z.infer<typeof schema>;

interface CustomFormProps {
  onSubmit: (data: FormData) => void;
}

export const CustomForm: React.FC<CustomFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto p-6 background-secondary rounded-lg shadow-lg">
      <RadioGroup
        label="¿Es masculino o femenino?"
        name="gender"
        options={[
          { value: 'Male', label: 'Masculino' },
          { value: 'Female', label: 'Femenino' },
        ]}
        register={register}
        errorMessage={errors.gender?.message}
      />

      <RadioGroup
        label="¿Es Humano o es Extraterrestre?"
        name="species"
        options={[
          { value: 'Human', label: 'Humano' },
          { value: 'Alien', label: 'Extraterrestre' },
        ]}
        register={register}
        errorMessage={errors.species?.message}
      />

      <RadioGroup
        label="¿Está vivo?"
        name="status"
        options={[
          { value: 'Alive', label: 'Vivo' },
          { value: 'Dead', label: 'Muerto' },
        ]}
        register={register}
        errorMessage={errors.status?.message}
      />

      <button type="submit" className="w-full p-3 mt-4 background-primary font-semibold rounded-md shadow-lg">
        Buscar personaje
      </button>
    </form>
  );
};

export default CustomForm;
