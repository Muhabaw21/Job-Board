module.exports = (sequelize, DataTypes) => {

    const jobSeeker = sequelize.define('jobSeeker', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING, 
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      confirmPassword: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      education: {
        type: DataTypes.STRING,
        allowNull: false,  
      },
      experience: { 
        type: DataTypes.JSON,
        allowNull: false,
      },
      address: {
        type: DataTypes.JSON,
        allowNull: false,
        validate: {
          notEmpty: true
        }
    },  
    role: {
      type: DataTypes.ENUM('Seeker', 'Recruiter'),
      allowNull: false
    },  
    }); 
   
      jobSeeker.associate = (models) => {
        jobSeeker.hasMany(models.resume, { 
          onDelete: 'CASCADE'
        });
      };
     
      
    return jobSeeker;
  };
   