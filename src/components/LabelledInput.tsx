import { labelledInputType } from '@/interfaces/UiInterfaces';

const LabelledInput = ({ label, id, type, placeholder, changeHandler } : labelledInputType ) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
        <label htmlFor={label} className='text-gray-500 font-medium'>
            {label}
        </label>
        <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            onChange={changeHandler}
            className="border-2 w-full py-1 px-5 rounded-lg text-purple-500"
        />
    </div>
  )
}

export default LabelledInput;
