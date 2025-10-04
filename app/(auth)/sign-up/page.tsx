'use client'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form'

const SignUp = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({ defaultValues: { fullName: '', email: '', password: '', country: 'FR', investmentGoals: 'Growth', riskTolerance: 'Medium', preferredIndustry: 'Technology' }, mode: 'onBlur' });

  const onSubmit = async (data: SignInFormData) => {
    try {
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1 className='form-title'>Sign Up & Personalize</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
        {/* Inputs */}
        
        <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
          {isSubmitting ? 'Creating account' : 'Sign Up'}
        </Button>
      </form>
    </>
  )
}

export default SignUp