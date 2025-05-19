import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormPreference } from "../../shared/utils/formValidateMP"

type Props = {
    onClose: () => void;
    onSubmit: (formData: FormPreference) => void;
};

const FormPay = ({ onClose, onSubmit }: Props) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormPreference>({
        resolver: zodResolver(formSchema), // Usa el esquema de formValidateMP
    });

    const handleFormSubmit = (data: FormPreference) => {
        onSubmit(data); // Datos ya validados
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center z-10">
            <div className="bg-gray-100 p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Formulario</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">DNI</label>
                        <input {...register("dni")} type="text"
                            className={`mt-1 block w-full rounded-md border ${errors.dni ? "border-red-500" : "border-gray-300"} p-2`}
                            placeholder="Ejemplo: 45367123"
                        />
                        {errors.dni && (<p className="mt-1 text-sm text-red-600">{errors.dni.message}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input {...register("name")} type="text"
                            className={`mt-1 block w-full rounded-md border ${errors.name ? "border-red-500" : "border-gray-300"} p-2`}
                        />
                        {errors.name && (<p className="mt-1 text-sm text-red-600">{errors.name.message}</p>)}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Apellido</label>
                        <input {...register("last_name")} type="text"
                            className={`mt-1 block w-full rounded-md border ${errors.last_name ? "border-red-500" : "border-gray-300"} p-2`}
                        />
                        {errors.last_name && (<p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>)}
                    </div>

                    <div className="flex justify-center space-x-4 pt-4">
                        <button type="button"
                            onClick={onClose}
                            className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md
                             hover:bg-blue-500 hover:text-white transition"
                        >
                            Cancelar
                        </button>

                        <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        >
                            Continuar
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-sm text-gray-600">
                    Este formulario es necesario para retirar el objeto en la cooperadora.
                </p>
            </div>
        </div>
    );
};

export default FormPay;
