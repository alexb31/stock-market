import { Label } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { Controller } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const SelectField = ({ name, label, placeholder, options, control, error, required = false }: SelectFieldProps) => {
    return (
        <div className='space-y-2'>
            <Label className='form-label'>{label}</Label>

            <Controller name={name} rules={{ required: required ? `Please select a ${label.toLowerCase()}` : false }} control={control} render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="select-trigger">
                        <SelectValue placeholder={placeholder} />
                    </SelectTrigger>
                    <SelectContent className='bg-gray-800 border-gray-600 text-white'>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value} className='focus:bg-gray-600 focus:text-white'>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )} />

            {error && <p className='text-sm text-red-500'>{error.message}</p>}
        </div>
    )
}

export default SelectField