"use strict";

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable("RoomMembers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomid: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      userid: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable("RoomMembers"),
};
