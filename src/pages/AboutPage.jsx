// AboutPage.js
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mt-4"
    >                
        <div>
            <h1>About Page</h1>
            <p>Creator: Iovane Chikovani</p>
            <p>Date Created: 01/07/2024</p>
            <p>Contact Info: 1234 Main St, Anytown, USA</p>
            <p>Email: iovane.chikovani.1@btu.edu.ge</p>
            <p>Purpose: Search Your Favorite Pokemons</p>
            <p>Location: Tbilisi, Georgia </p>
        </div>
    
    </motion.div>
    
  );
};

export default AboutPage;
