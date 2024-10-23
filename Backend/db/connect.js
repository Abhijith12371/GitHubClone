import mongoose from 'mongoose';

const connect = async () => {
  try {
    // Ensure MONGO_URI is correctly retrieved from the environment
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);
    
    console.log('MongoDB connected...');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connect;
