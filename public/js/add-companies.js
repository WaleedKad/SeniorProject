const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    percentage: { type: Number, required: true },
    lossorwin: { type: Number, required: true }, // Positive for gain, negative for loss
  });
  
  const Company = mongoose.model('Company', companySchema);

// Function to generate random company data
const generateRandomCompanyData = () => {
    // Determine whether the company has gained (positive) or lost (negative)
    const lossorwin = faker.number.int({ min: 0, max: 100 });
    
    // Calculate the percentage change
    const percentage = Number(faker.datatype.float({ min: -100, max: 100 }).toFixed(2));

    
  
    return {
      name: faker.company.name(),
      percentage: percentage,
      lossorwin: lossorwin,
    };
  };
  
  // Function to add a company
  const addCompany = async (companyData) => {
    try {
      const { name, percentage, lossorwin } = companyData;
  
      if (!name || percentage === undefined || lossorwin === undefined) {
        throw new Error('All fields are required');
      }
  
      const newCompany = new Company({
        name,
        percentage,
        lossorwin,
      });
  
      await newCompany.save();
      console.log('Company added successfully:', name);
    } catch (error) {
      console.error('Error adding company:', error.message);
    }
  };
  
  // Script to add multiple random companies
  const addRandomCompanies = async (numCompanies) => {
    try {
      // Connect to MongoDB
      await mongoose.connect("mongodb+srv://finance:project123@financecluster.jfa2rgf.mongodb.net/");
  
      for (let i = 0; i < numCompanies; i++) {
        const companyData = generateRandomCompanyData();
        await addCompany(companyData);
      }
  
      console.log(`${numCompanies} companies added successfully.`);
    } catch (error) {
      console.error('Error adding companies:', error.message);
    } finally {
      // Disconnect from MongoDB
      mongoose.disconnect();
    }
  };
  
  // Add 10 random companies
  addRandomCompanies(10);