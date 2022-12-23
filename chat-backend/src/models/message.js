module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      roomid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
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
  Message.associate = function (models) {
    Message.belongsTo(models.User, { foreignKey: "userId" });
    Message.belongsTo(models.Room, { foreignKey: "roomId" });
  };
  return Message;
};
