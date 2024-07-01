import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';



const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
});

const ContactPage = () => {
  const { control, handleSubmit,formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = data => {
    console.log(data);
  };

//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e) => {
//     setSubmitted(true);
//   };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mt-4"
    >
        <div className="container mt-4">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
            <label htmlFor="name">Name</label>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="form-control" id="name" />}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="form-group">
            <label htmlFor="email">Email</label>
            <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <input {...field} className="form-control" id="email" />}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>
            <div className="form-group">
            <label htmlFor="message">Message</label>
            <Controller
                name="message"
                control={control}
                defaultValue=""
                render={({ field }) => <textarea {...field} className="form-control" id="message" rows="5" />}
            />
            {errors.message && <p className="text-danger">{errors.message.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        {/* {submitted && <p>Success! Your message has been sent.</p>} */}
        </div>
        
    </motion.div>
  );
};

export default ContactPage;
