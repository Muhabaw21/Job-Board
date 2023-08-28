module.exports = (sequelize, DataTypes) => {
  const jobSeeker = sequelize.define('jobSeeker', {
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  jobSeeker.associate = (models) => {
    jobSeeker.belongsTo(models.user, {
      onDelete: 'cascade'
    })
  }
  return jobSeeker;
};


