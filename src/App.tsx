import React, { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { IFormFields, IOption } from "./App.interface";
import "./App.css";

const options: IOption[] = [
  { value: "frequently", label: "frequently" },
  { value: "rare", label: "rare" },
  { value: "regular", label: "regular" },
];

const getValue = (value: string) => {
  return value ? options.find((option) => option.value === value) : "";
};



const App: React.FC = (): JSX.Element => {
  const initialData: IFormFields = {
    name: "",
    age: 0,
    country: "",
    comment: "",
    howFeel: "",
    previousDisease: "",
    duration: 0,
   
  };

  const [formData, setFormData] = useState<IFormFields>(initialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<IFormFields>({
    mode: "onChange",
  });

  const submitForm: SubmitHandler<IFormFields> = (data) => {
    console.log(data);
    reset();
    setFormData(data);
  };

  



  return (
    <div className='flex flex-col gap-5 m-10'>
      <h1 className='text-xl font-bold align-middle'>
             Virtual Doctor
      </h1>
 

      <div className='flex gap-20'>

        

        <form onSubmit={handleSubmit(submitForm)} className='form'>
          <div className='flex-input'>
          <div>
  <h1 >Patiend Information</h1>
 </div>
            <label htmlFor='name'>Name</label>
            <input
              {...register("name", {
                required: { value: true, message: "Name is required" },
              })}
              id='name'
              type='text'
              placeholder='Your name'
              className='input'
            />
            {errors.name && <p className='error'>{errors.name.message}</p>}
          </div>
          <div className='flex-input'>
            <label htmlFor='age'>Age</label>
            <input
              {...register("age", {
                required: { value: true, message: "Age is required" },
                max: { value: 120, message: "Max age is less than 120" },
              })}
              id='age'
              type='number'
              placeholder='Your age'
              className='input'
            />
            {errors.age && <p className='error'>{errors.age.message}</p>}
          </div>
          <div className='flex-input'>
            <label htmlFor='country'>Pain Symptom</label>
            <Controller
              name='country'
              control={control}
              rules={{
                required: { value: true, message: "Field is required" },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <>
                  <Select
                    id='country'
                    placeholder='Pain Symptoms'
                    options={options}
                    value={getValue(value)}
                    onChange={(newValue) =>
                      onChange((newValue as IOption).value)
                    }
                    classNamePrefix='custom-select'
                  />
                  {error && <p className='error'>{error.message}</p>}
                </>
              )}
            />
          </div>

          
          <div className='flex-input'>
            <label htmlFor='previousDisease'>Previous Disease</label>
            <input
              {...register("previousDisease")}
              id='previousDisease'
              type='text'
              placeholder='Previous Disease'
              className='input'
            />
          </div>
          <div className='flex-input'>
            <label htmlFor='duration'>How long did the disease stay (in days)</label>
            <input
              {...register("duration", {
                required: { value: true, message: "Duration is required" },
              })}
              id='duration'
              type='number'
              placeholder='Duration'
              className='input'
            />
            {errors.duration && <p className='error'>{errors.duration.message}</p>}
          </div>
          <div className='flex-input'>
            <label htmlFor='howFeel'>How do you feel?</label>
            <input
              {...register("howFeel", {
                required: { value: true, message: "Feeling is required" },
              })}
              id='howFeel'
              type='text'
              placeholder='How do you feel?'
              className='input'
            />
            {errors.howFeel && <p className='error'>{errors.howFeel.message}</p>}
          </div>
          <div className='flex-input'>
            <label htmlFor='comment'>Comment</label>
            <textarea
              {...register("comment", {
                required: { value: true, message: "Please leave a comment" },
                maxLength: {
                  value: 200,
                  message: "Limit of 200 symbols is exceeded",
                },
              })}
              id='comment'
              placeholder='Start typing here...'
              className='input resize-none h-28'
            />
            {errors.comment && (
              <p className='error'>{errors.comment.message}</p>
            )}
          </div>
          <button
            type='submit'
            className='bg-blue-600 border-none rounded-md text-white p-2 hover:bg-blue-400'
          >
            SUBMIT 
          </button>
        </form>
        {formData.name && (
          <div className='border border-blue-600 rounded-md p-2'>
            <h2 className='font-bold text-xl mb-2'>ADVICE SECTION </h2>
            <p className="mb-2">  {"1.DRINK WATER AND TAKE HEALTHY FOOD."}</p>
            <p className="mb-3"> {"2.FOR MEDICINE YOU CAN GIVE X RAY REPORT OR MEDICAL REPORT."}</p>
            <p className="mb-4">  {"3.TAKE SOME ADVICE WHO FEEL BEFORE."}</p>
 
            <p  className="mb-8" >::  {"this is simple example of demo."}</p>
          </div>
          
        )}
      </div> 

       
     <h1>@Institution Of Science And Technology</h1>

      
    </div>

    
  );
};

export default App;
