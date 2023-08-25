
module.exports = (sequelize, DataTypes) => {
  const resume = sequelize.define('resume', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  resume.associate = (models) => {
    resume.belongsTo(models.jobSeeker, {
      onDelete: 'CASCADE'
    }); 
  };

  return resume;
};
