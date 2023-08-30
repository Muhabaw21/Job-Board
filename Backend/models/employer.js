module.exports = (sequelize, DataTypes) => {

    const employer = sequelize.define('employer', {
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        industry: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    employer.associate = (models) => {
        employer.belongsTo(models.user, {
            onDelete: "cascade"
        });
        employer.belongsTo(models.post, {
            onDelete: "cascade"
        });
    }
    return employer;
};


