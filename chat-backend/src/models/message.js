module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      roomid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      senderid: {
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
    Message.belongsTo(models.User, { foreignKey: "senderId" });
    Message.belongsTo(models.Room, { foreignKey: "roomId" });
  };
  return Message;
};
