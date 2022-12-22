module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
      },
      profilePic: {
        type: DataTypes.STRING,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withSecretColumns: {
          attributes: { include: ["password"] },
        },
      },
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Message, { foreignKey: "id" });
    User.hasMany(models.RoomMember, { foreignKey: "id" });
    User.belongsToMany(models.Room, {
      through: models.RoomMember,
    });
  };
  return User;
};
