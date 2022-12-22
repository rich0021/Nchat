module.exports = (sequelize, DataTypes) => {
  const RoomMember = sequelize.define(
    "RoomMember",
    {
      roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
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
  RoomMember.associate = function (models) {
    RoomMember.belongsTo(models.Room, { foreignKey: "roomId" });
    RoomMember.belongsTo(models.User, { foreignKey: "userId" });
  };
  return RoomMember;
};
