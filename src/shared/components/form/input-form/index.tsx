import { Control, Controller, FieldValues } from 'react-hook-form';

type Props = {
    name: string;
    placeholder?: string;
    control?: Control<FieldValues>;
};

export function InputForm({ name, placeholder, control }: Props) {
    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                <div>
                    <input ref={ref} placeholder={placeholder} value={value} onChange={onChange} />
                    {error?.message && <p className="text-red-500">{error?.message}</p>}
                </div>
            )}
        />
    );
}
