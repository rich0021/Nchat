module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    "Room",
    {
      roomType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      defaultScope: {
        attributes: { exclude: ["updateAt"] },
      },
    }
  );
  Room.associate = function (models) {
    Room.hasMany(models.Message);
    Room.hasMany(models.RoomMember);
    Room.belongsToMany(models.User, { through: models.RoomMember });
  };
  return Room;
};
