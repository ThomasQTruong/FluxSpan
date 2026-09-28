import { useFormContext } from 'react-hook-form';

interface SubmitButtonProps {
  text?: string;
  onClickText?: string;
}

export function SubmitButton({
  text = 'Submit',
  onClickText = 'Submitting...',
}: SubmitButtonProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="w-full rounded-4xl bg-cyan-500/60 p-2 transition-colors duration-300 ease-in-out hover:bg-cyan-500/75"
    >
      {isSubmitting ? onClickText : text}
    </button>
  );
}
