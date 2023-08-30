
module.exports = (sequelize, DataTypes) => {
    const post = sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        requirement: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        salary: {
            type: DataTypes.JSON,
            allowNull: false,
        },
        location: {
            type: DataTypes.JSON
        },
        date: {
            type: DataTypes.STRING,
        },
    });

    post.associate = (models) => {
        post.belongsTo(models.employer, {
            onDelete: 'CASCADE'
        });
    };

    return post;
};
