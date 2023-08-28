
module.exports = (sequelize, DataTypes) => {
  const resume = sequelize.define('resume', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    contactInfo: {
      type: DataTypes.JSON,
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
      type: DataTypes.JSON,
      allowNull: false,
    },
    experience: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    certification: {
      type: DataTypes.JSON
    },
    award: {
      type: DataTypes.STRING,
    },
    skill: {
      type: DataTypes.JSON,
    }
  });

  resume.associate = (models) => {
    resume.belongsTo(models.jobSeeker, {
      onDelete: 'CASCADE'
    });
  };

  return resume;
};
