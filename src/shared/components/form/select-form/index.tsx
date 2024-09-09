import { Control, Controller, FieldValues } from 'react-hook-form';

type SelectOption = {
    value: string | number;
    label: string;
};

type Props = {
    name: string;
    options: SelectOption[];
    control?: Control<FieldValues>;
};

export function SelectForm({ name, options, control }: Props) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
                <div>
                    <select ref={ref} value={value} onChange={onChange}>
                        {options?.map((option) => <option key={option?.value}>{option?.label}</option>)}
                    </select>
                    {error?.message && <p className="text-red-500">{error?.message}</p>}
                </div>
            )}
        />
    );
}
