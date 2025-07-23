import { useForm } from "react-hook-form";
import ContactService from "../../api/contact";
import { useState } from "react";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await ContactService.create(data);
      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          {...register("name", { required: "Name is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* Other form fields */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>

      {submitSuccess && (
        <p className="text-green-500">Message sent successfully!</p>
      )}
    </form>
  );
};

export default ContactForm;
