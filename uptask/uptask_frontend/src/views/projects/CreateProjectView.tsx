import { ProjectForm } from '@/components/projects/ProjectForm';
import { createProject } from '@/api/ProjectAPI';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ProjectFormData } from '@/types/index';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

export const CreateProjectView = () => {
  const navigate = useNavigate();

  const initialValues: ProjectFormData = {
    projectName: '',
    clientName: '',
    description: '',
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: createProject,
    onError: () => {},
    onSuccess: (data) => {
      toast.success(data?.msg);
      navigate('/');
    },
  });

  const handleForm = (formData: ProjectFormData) => mutate(formData);
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Crear Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Llena el siguiente formulario para crear un proyecto
        </p>
        <nav className="my-5">
          <Link
            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 
        text-white text-xl font-bold cursor-pointer transition-colors
         "
            to="/"
          >
            Volver a proyectos
          </Link>
        </nav>
        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            className="bg-fuchsia-600 w-full p-3 text-white uppercase font-bold
            hover:bg-fuchsia-700 cursor-pointer transition-colors
          "
            value="Crear Proyecto"
          />
        </form>
      </div>
    </>
  );
};
